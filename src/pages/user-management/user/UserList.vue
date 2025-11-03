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
      <a
        href="#"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#add-user"
      >
        <i class="ti ti-circle-plus q-mr-xs"></i>
        Add User
      </a>
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
  </div>
  <!-- /product list -->
</template>
<script setup lang="ts">
import BaseTable from "src/components/BaseTable.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { kcApiService } from "src/services/keycloak";
import { userListColumn } from "./config/table-columns";
import type { User } from "./config/types";
import type { TableAction } from "src/types/table";
// -----------------------------
// Reactive State
// -----------------------------
const loading = ref<boolean>(false);
const users = ref<any[]>([]);
const selectedRows = ref<User[]>([]);

const router = useRouter();
const navigateToDetails = () => router.push("/inventory/master-list/details");
const navigateToEdit = () => router.push("/inventory/master-list/edit");

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
    func: (row, value) => console.log("Status changed:", row.username, value),
  },
  {
    name: "edit",
    icon: "edit",
    color: "primary",
    label: "Edit",
    type: "button",
    func: (row) => console.log("Edit:", row),
  },

  {
    name: "delete",
    icon: "delete",
    color: "negative",
    label: "Delete",
    type: "button",
    func: (row) => console.log("Delete:", row),
  },
];

onMounted(() => {
  fetchUsers();
});
</script>
