<template>
  <PageHeader
    :title="pageTitle"
    subtitle="Manage your role and permissions"
    :actions="[
      {
        icon: 'ti ti-chevron-up',
        iconType: 'icon',
        tooltip: 'Collapse',
        event: 'collapse',
      },
    ]"
    @collapse="toggleHeader"
  />

  <div class="card">
    <div class="card-body">
      <!-- 🔹 Role Details -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <FormField label="Role Name" />
          <q-input
            v-model="role.name"
            outlined
            dense
            :disable="mode === 'view'"
            :rules="[(val) => !!val || 'Role name is required']"
          />
        </div>

        <div class="col-12 col-md-6">
          <FormField label="Description" />
          <q-input
            v-model="role.description"
            type="textarea"
            outlined
            dense
            autogrow
            :disable="mode === 'view'"
            placeholder="Describe the role purpose or access scope"
          />
        </div>
      </div>

      <!-- 🔹 Permissions Table -->
      <q-table
        title="Page Permissions"
        :rows="pages"
        :columns="columns"
        row-key="page"
        flat
        hide-bottom
        :pagination="{ rowsPerPage: 100 }"
        bordered
      >
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <!-- Page name -->
            <div v-if="props.col.name === 'page'" class="text-weight-bold">
              {{ props.row.page }}
            </div>

            <!-- Checkboxes -->
            <div
              v-else-if="props.col.name !== 'checkAll'"
              class="flex items-center justify-center"
            >
              <q-checkbox
                v-model="props.row.actions[props.col.name]"
                color="primary"
                dense
                :disable="mode === 'view'"
                @update:model-value="
                  updatePermission(props.row, props.col.name)
                "
              />
            </div>

            <!-- Check All -->
            <div v-else class="flex items-center justify-center">
              <q-checkbox
                v-model="props.row.checkAll"
                color="secondary"
                dense
                :disable="mode === 'view'"
                @update:model-value="toggleRowCheckAll(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>

      <!-- 🔹 Buttons -->
      <div class="row q-mt-md justify-end q-gutter-x-sm">
        <q-btn color="secondary" no-caps @click="goBack">Cancel</q-btn>
        <q-btn
          v-if="mode !== 'view'"
          color="primary"
          no-caps
          :disable="!role.name"
          @click="savePermissions"
        >
          {{ mode === "edit" ? "Update Role" : "Save Role" }}
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import sidebardata from "src/layouts/sidebar/sidebar.json";
import PageHeader from "src/components/PageHeader.vue";
import FormField from "src/components/FormField.vue";
import { kcApiService } from "src/services/keycloak";
import useNotify from "src/composable/useNotify";

const { success, error } = useNotify();
const router = useRouter();
const route = useRoute();
const client_uuid = import.meta.env.VITE_KEYCLOAK_CLIENT_UUID;

// 🧱 Detect mode (create / edit / view)
const mode = ref(route.params.action || "create"); // "create" | "edit" | "view"
const roleName = ref(route.params.id || null);
const pageTitle = computed(() =>
  mode.value === "view"
    ? "View Role"
    : mode.value === "edit"
      ? "Edit Role"
      : "Create Role",
);

// 🧱 Role model
const role = ref({ name: "", description: "" });
const pages = ref([]);

// 📄 Sidebar-based pages
const pageList = sidebardata.flatMap((section) =>
  section.menu.map((item) => item.menuValue),
);

// 🧱 Columns for QTable
const columns = [
  { name: "page", label: "Page", align: "left", field: "page", sortable: true },
  { name: "view", label: "View", align: "center" },
  { name: "create", label: "Create", align: "center" },
  { name: "edit", label: "Edit", align: "center" },
  { name: "delete", label: "Delete", align: "center" },
  { name: "upload", label: "Upload", align: "center" },
  { name: "download", label: "Download", align: "center" },
  { name: "checkAll", label: "Check All", align: "center" },
];

// 🧩 Load permission table
function loadPermissions() {
  pages.value = pageList.map((page) => ({
    page,
    checkAll: false,
    actions: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      upload: false,
      download: false,
    },
  }));
}

// 🧩 Checkbox logic
function updatePermission(row) {
  const a = row.actions;
  if (Object.values(a).some((v, i) => i > 0 && v)) a.view = true;
  row.checkAll = Object.values(a).every((v) => v);
}
function toggleRowCheckAll(row) {
  Object.keys(row.actions).forEach((k) => (row.actions[k] = row.checkAll));
  if (row.checkAll) row.actions.view = true;
}

// 🧠 Error extractor
function getErrorMessage(err) {
  try {
    return (
      err.response?.data?.errorMessage ||
      err.response?.data?.error ||
      err.message ||
      "Unknown error"
    );
  } catch {
    return String(err);
  }
}

// 💾 Save role
async function savePermissions() {
  const payload = {
    role: role.value,
    permissions: pages.value.flatMap((p) =>
      Object.entries(p.actions)
        .filter(([_, v]) => v)
        .map(([a]) => `${p.page.toLowerCase().replace(/\s/g, "_")}_${a}`),
    ),
  };

  try {
    // 1️⃣ Create or update realm role
    if (mode.value === "edit") {
      await kcApiService.put(`/roles/${role.value.name}`, role.value);
    } else {
      await kcApiService.post("/roles", role.value);
    }

    // 2️⃣ Get client roles once
    const existingRoles = await kcApiService.get(
      `/clients/${client_uuid}/roles`,
    );
    const existingRoleNames = existingRoles.map((r) => r.name);

    // 3️⃣ Create missing client roles
    const newRoles = [];
    for (const perm of payload.permissions) {
      if (existingRoleNames.includes(perm)) continue;
      try {
        const created = await kcApiService.post(
          `/clients/${client_uuid}/roles`,
          {
            name: perm,
            description: `Permission: ${perm}`,
          },
        );
        newRoles.push(created);
      } catch (err) {
        console.warn(`⚠️ Skipped ${perm}: ${getErrorMessage(err)}`);
      }
    }

    // 4️⃣ Combine existing + newly created
    const selectedRoles = existingRoles
      .filter((r) => payload.permissions.includes(r.name))
      .concat(newRoles);

    // 5️⃣ Assign composites
    if (selectedRoles.length) {
      await kcApiService.post(
        `/roles/${payload.role.name}/composites`,
        selectedRoles,
      );
    }

    success(
      mode.value === "edit"
        ? `Role "${payload.role.name}" updated successfully!`
        : `Role "${payload.role.name}" created successfully!`,
    );
    goBack();
  } catch (err) {
    error(getErrorMessage(err));
  }
}

// 📥 Load existing role (edit/view)
async function loadRoleDetails() {
  if (!roleName.value) return;
  try {
    // 1️⃣ Realm role info
    const realmRole = await kcApiService.get(`/roles/${roleName.value}`);
    role.value = {
      name: realmRole.name,
      description: realmRole.description,
    };

    // 2️⃣ Composites (permissions)
    const composites = await kcApiService.get(
      `/roles/${roleName.value}/composites`,
    );
    const assigned = composites.map((r) => r.name);

    // 3️⃣ Mark checkboxes
    pages.value.forEach((page) => {
      for (const key in page.actions) {
        const perm = `${page.page.toLowerCase().replace(/\s/g, "_")}_${key}`;
        page.actions[key] = assigned.includes(perm);
      }
      page.checkAll = Object.values(page.actions).every((v) => v);
    });
  } catch (err) {
    error(`Failed to load role details: ${getErrorMessage(err)}`);
  }
}

function goBack() {
  router.go(-1);
}

onMounted(async () => {
  loadPermissions();
  if (roleName.value) await loadRoleDetails();
});
</script>
