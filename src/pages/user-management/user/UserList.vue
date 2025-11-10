<template>
  <PageHeader title="Users" subtitle="Manage your users" @reload="fetchUsers">
    <template #buttons>
      <div class="page-btn">
        <AccessButton
          page="users"
          action="create"
          color="primary"
          @click="openAddUser"
          no-caps
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add User
        </AccessButton>
      </div>
    </template>
  </PageHeader>

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
    page: "user",
    action: "toggle",
    func: (row, value) => toggleUserStatus(row),
  },
  {
    name: "edit",
    icon: "edit",
    color: "primary",
    label: "Edit",
    type: "button",
    action: "edit",
    page: "users",
    func: (row: any) => openEditUser(row),
  },

  {
    name: "delete",
    icon: "delete",
    color: "negative",
    label: "Delete",
    type: "button",
    action: "delete",
    page: "users",
    func: (row: any) => confirmDelete(row),
  },
];

onMounted(() => {
  fetchUsers();
});
</script>
