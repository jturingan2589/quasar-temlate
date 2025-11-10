<template>
  <PageHeader
    title="Roles & Permissions"
    subtitle="Manage your roles and permissions"
    @reload="fetchRoles"
  >
    <template #buttons>
      <div class="page-btn">
        <AccessButton
          page="users"
          action="create"
          color="primary"
          @click="$router.push('/user-management/roles-permissions/add')"
          no-caps
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Role
        </AccessButton>
      </div>
    </template>
  </PageHeader>
  <!-- /product list -->
  <div class="card table-list-card">
    <div
      class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3"
    >
      <div class="search-set">
        <div class="search-input">
          <a href="javascript:void(0);" class="btn-searchset"
            ><i class="ti ti-search fs-14 feather-search"></i
          ></a>
          <input
            type="search"
            class="form-control form-control-sm"
            placeholder="Search"
          />
        </div>
      </div>
      <div
        class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3"
      ></div>
    </div>
    <div class="card-body">
      <BaseTable
        :columns="rolePermissionsColumn"
        :rows="roleStore.realm_roles"
        :loading="loading"
        :actions="tableActions"
      />
    </div>
  </div>
  <!-- /product list -->
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoleStore } from "src/stores/roles";
import { kcApiService } from "src/services/keycloak";
import { rolePermissionsColumn } from "./config/table-columns";
import { useRouter } from "vue-router";
import { useConfirmDialog } from "src/composable/useConfirmDialog";
import useNotify from "src/composable/useNotify";
import type { RealmRole } from "./config/types";

const { confirmAction } = useConfirmDialog();
const { success, error } = useNotify();
const roleStore = useRoleStore();
const loading = ref<boolean>(false);

const router = useRouter();
const navigate = (role: RealmRole, action: string) =>
  router.push(`/user-management/roles-permissions/${action}/${role.name}`);

const tableActions = [
  {
    name: "view",
    icon: "visibility",
    label: "View Details",
    page: "roles_&_permissions",
    action: "view",
    func: (row: any) => navigate(row, "view"),
    color: "primary",
  },
  {
    name: "edit",
    icon: "edit_note",
    label: "Edit",
    page: "roles_&_permissions",
    action: "edit",
    func: (row: any) => navigate(row, "edit"),
    color: "orange",
  },
  {
    name: "delete",
    icon: "delete",
    page: "roles_&_permissions",
    action: "delete",
    label: "Delete",
    func: (row: any) => deleteRole(row),
    color: "negative",
  },
];

// --------------------
// Methods
// --------------------

const toggleHeader = () => {
  const el = document.getElementById("collapse-header");
  if (el) el.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

const fetchRoles = async (): Promise<void> => {
  loading.value = true;
  try {
    const res = await kcApiService.get<RealmRole[]>(`/roles?`);
    roleStore.setRealmRoles(res || []);
  } catch (err) {
    console.error("Error fetching roles:", err);
  } finally {
    loading.value = false;
  }
};

const deleteRole = async (role: RealmRole) => {
  const confirmed = await confirmAction(
    `Delete Role`,
    `Delete role '${role.name}'?`,
    {
      okLabel: "Delete",
      okColor: "negative",
    },
  );
  if (!confirmed) return;

  try {
    await kcApiService.delete<RealmRole[]>(`/roles/${role.name}`);
    roleStore.realm_roles = roleStore.realm_roles.filter(
      (u) => u.id !== role.id,
    );
    success("User deleted successfully");
  } catch (err) {
    error("Failed to delete user");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRoles();
});
</script>
