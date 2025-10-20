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
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header" @click="toggleHeader"><i class="ti ti-chevron-up"></i></a>
          </li>
        </ul>
        <div class="page-btn">
          <a
            href="#"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#add-user"
            ><i class="ti ti-circle-plus me-1"></i>Add User</a
          >
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
          >
            <div class="dropdown">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle btn btn-white btn-md d-inline-flex items-center"
                data-bs-toggle="dropdown"
              >
                Status
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1">Active</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item rounded-1"
                    >Inactive</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body p-0">
            <BaseTable
              :columns="columns"
              :data="data"
              :rowSelection="onRowSelection"
              :pagination="{ pageSize: 5 }" 
              />
        </div>
      </div>
      <!-- /product list -->

</template>
<script setup lang="ts">
import BaseTable from 'src/components/BaseTable.vue';
import { ref } from 'vue';

// -----------------------------
// Types
// -----------------------------
interface User {
  key: string;
  UserName: string;
  Phone: string;
  Email: string;
  Role: string;
  Image: string;
  Status?: string;
}

// -----------------------------
// Columns
// -----------------------------
const columns = [
  {
    name: 'userName',
    label: 'User Name',
    field: 'UserName',
    sortable: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    field: 'Phone',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'Phone',
    sortable: true,
  },
  {
    name: 'role',
    label: 'Role',
    field: 'Role',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    field: 'Status',
    sortable: true,
  },
  {
    name: 'action',
    label: 'Action',
    field: 'action',
  },
];

// -----------------------------
// Data
// -----------------------------
const data = ref<User[]>([
  { key: "1", UserName: "Henry Bryant", Phone: "+12498345785", Email: "henry@example.com", Role: "Admin", Image: "user-47.png" },
  { key: "2", UserName: "Jenny Ellis", Phone: "+13178964582", Email: "jenny@example.com", Role: "Manager", Image: "user-02.jpg" },
  { key: "3", UserName: "Leon Baxter", Phone: "+12796183487", Email: "leon@example.com", Role: "Salesman", Image: "user-43.png" },
  { key: "4", UserName: "Karen Flores", Phone: "+17538647943", Email: "karen@example.com", Role: "Supervisor", Image: "user-35.jpg" },
  { key: "5", UserName: "Michael Dawson", Phone: "+13798132475", Email: "michael@example.com", Role: "Store Keeper", Image: "user-44.png" },
]);

// -----------------------------
// Row selection
// -----------------------------
const selectedRows = ref<User[]>([]);
const onRowSelection = (rows: User[]) => {
  selectedRows.value = rows;
};

// -----------------------------
// Helper: Get image URL
// -----------------------------
const getImageUrl = (imageName: string) => {
  return new URL(`/app/img/users/${imageName}`, import.meta.url).href;
};

const toggleHeader = () => {
  const header = document.querySelector('.page-header') as HTMLElement;
  if (header) {
    if (header.style.display === 'none') {
      header.style.display = 'flex';
    } else {
      header.style.display = 'none';
    }
  }
};
</script>
