<template>
  <div class="page-header">
    <div class="add-item d-flex">
      <div class="page-title">
        <h4 class="fw-bold">Users</h4>
        <h6>Manage your users</h6>
      </div>
    </div>
    <ul class="table-top-head">
      <li>
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"
          ><img src="/app/img/icons/pdf.svg" alt="img"
        /></a>
      </li>
      <li>
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"
          ><img src="/app/img/icons/excel.svg" alt="img"
        /></a>
      </li>
      <li>
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"
          ><i class="ti ti-refresh"></i
        ></a>
      </li>
      <li>
        <a
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Collapse"
          id="collapse-header"
          @click="toggleHeader"
          ><i class="ti ti-chevron-up"></i
        ></a>
      </li>
    </ul>
    <div class="page-btn">
      <q-btn color="primary" no-caps @click="openAddUser">
        <i class="ti ti-circle-plus q-mr-xs"></i>
        Add User
      </q-btn>
    </div>
  </div>

  <!-- /product list -->
  <div class="card">
    <div
      class="card-header d-flex items-center justify-content-between flex-wrap row-gap-3"
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
        class="d-flex table-dropdown my-xl-auto right-content items-center flex-wrap row-gap-3"
      ></div>
    </div>
    <div class="card-body p-0">
      <BaseTable
        :columns="userListColumn"
        :rows="users"
        :rowSelection="onRowSelection"
        :pagination="{ pageSize: 5 }"
        :loading="loading"
        :actions="tableActions"
      />
    </div>

    <UserFormDialog
      v-model:show="showDialog"
      :modelValue="selectedUser"
      @save="saveUser"
    />
  </div>
  <!-- /product list -->
</template>
<script setup lang="ts">
import BaseTable from "src/components/BaseTable.vue";
import UserFormDialog from "./UserFormDialog.vue";
import useNotify from "src/composable/useNotify";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { kcApiService } from "src/services/keycloak";
import { userListColumn } from "./config/table-columns";
import { useConfirmDialog } from "src/composable/useConfirmDialog";
import type { User } from "./config/types";
import type { TableAction } from "src/types/table";
// -----------------------------
// Reactive State
// -----------------------------
const loading = ref<boolean>(false);
const users = ref<any[]>([]);
const selectedRows = ref<User[]>([]);
const selectedUser = ref<User | null>(null);
const showDialog = ref(false);

const { confirmAction } = useConfirmDialog();
const { success, error } = useNotify();

const fetchUsers = async (): Promise<void> => {
  loading.value = true;
  try {
    const res = await kcApiService.get<User[]>(`/users?`);
    users.value = res || [];
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    loading.value = false;
  }
};

const openAddUser = () => {
  selectedUser.value = null;
  showDialog.value = true;
};

const openEditUser = (user: User) => {
  selectedUser.value = { ...user };
  showDialog.value = true;
};

const confirmDelete = async (user: User) => {
  const confirmed = await confirmAction(
    `Delete User`,
    `Delete user '${user.username}'?`,
    {
      okLabel: "Delete",
      okColor: "negative",
    },
  );
  if (!confirmed) return;

  try {
    await kcApiService.delete<User[]>(`/users/${user.id}`);
    users.value = users.value.filter((u) => u.id !== user.id);
    success("User deleted successfully");
  } catch (err) {
    error("Failed to delete user");
  } finally {
    loading.value = false;
  }
};

const toggleUserStatus = async (user: any) => {
  const action = user.enabled ? "Activate" : "Deactivate";
  const confirmed = await confirmAction(
    `${action} User`,
    `${action} user '${user.username}'?`,
    {
      okLabel: action,
    },
  );

  if (!confirmed) {
    user.enabled = !user.enabled;
    return;
  }

  try {
    saveUser({
      ...user,
      enabled: user.enabled,
    });
  } catch (err) {
    error(`Failed to ${action.toLowerCase()} user.`);
  }
};

const saveUser = async (user: User) => {
  loading.value = true;
  await fetchUsers();
};

// -----------------------------
// Row selection
// -----------------------------
const onRowSelection = (rows: User[]) => {
  selectedRows.value = rows;
};

const toggleHeader = () => {
  const header = document.querySelector(".page-header") as HTMLElement;
  if (header) {
    if (header.style.display === "none") {
      header.style.display = "flex";
    } else {
      header.style.display = "none";
    }
  }
};

const tableActions: TableAction[] = [
  {
    name: "status",
    type: "switch",
    field: "enabled",
    func: (row, value) => toggleUserStatus(row),
  },
  {
    name: "edit",
    icon: "edit",
    color: "primary",
    label: "Edit",
    type: "button",
    func: (row: any) => openEditUser(row),
  },

  {
    name: "delete",
    icon: "delete",
    color: "negative",
    label: "Delete",
    type: "button",
    func: (row: any) => confirmDelete(row),
  },
];

onMounted(() => {
  fetchUsers();
});
</script>
