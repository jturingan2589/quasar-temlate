<template>

      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Roles & Permission</h4>
            <h6>Manage your roles</h6>
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
            class="btn btn-primary btn-md d-inline-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add-units"
            ><i class="ti ti-circle-plus me-1"></i>Add Role</a
          >
        </div>
      </div>
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
          >
            <div class="dropdown me-2">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
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
        <div class="card-body">
          <BaseTable
            :columns="columns"
            :data="data"
            :pagination="{ pageSize: 5 }" 
            />
        </div>
      </div>
      <!-- /product list -->
</template>
<script setup lang="ts">
import BaseTable from 'src/components/BaseTable.vue';
import { ref } from 'vue';
import { QTableProps } from 'quasar';

// --------------------
// Table Columns
// --------------------
interface Role {
  key: string;
  RoleName: string;
  CreatedOn: string;
  Status?: string;
}

const columns = ref<QTableProps['columns']>([
  {
    name: 'role',
    label: 'Role',
    field: 'RoleName',
    sortable: true,
    align: 'left',
  },
  {
    name: 'createdOn',
    label: 'Created Date',
    field: 'CreatedOn',
    sortable: true,
    align: 'left',
  },
  {
    name: 'status',
    label: 'Status',
    field: 'Status',
    sortable: true,
    align: 'left',
  },
  {
    name: 'action',
    label: '',
    field: 'action',
    sortable: false,
    align: 'center',
  },
]);

// --------------------
// Table Data
// --------------------
const data = ref<Role[]>([
  { key: '1', RoleName: 'Admin', CreatedOn: '12 Sep 2024', Status: 'Active' },
  { key: '2', RoleName: 'Manager', CreatedOn: '24 Oct 2024', Status: 'Active' },
  { key: '3', RoleName: 'Salesman', CreatedOn: '18 Feb 2024', Status: 'Inactive' },
  { key: '4', RoleName: 'Supervisor', CreatedOn: '17 Oct 2024', Status: 'Active' },
  { key: '5', RoleName: 'Store Keeper', CreatedOn: '20 Jul 2024', Status: 'Active' },
  { key: '6', RoleName: 'Inventory Manager', CreatedOn: '10 Apr 2024', Status: 'Inactive' },
  { key: '7', RoleName: 'Delivery Biker', CreatedOn: '29 Aug 2024', Status: 'Active' },
  { key: '8', RoleName: 'Employee', CreatedOn: '22 Feb 2024', Status: 'Active' },
  { key: '9', RoleName: 'Cashier', CreatedOn: '03 Nov 2024', Status: 'Inactive' },
  { key: '10', RoleName: 'Quality Analyst', CreatedOn: '17 Dec 2024', Status: 'Active' },
]);

// --------------------
// Methods
// --------------------
const toggleHeader = () => {
  const el = document.getElementById('collapse-header');
  if (el) el.classList.toggle('active');
  document.body.classList.toggle('header-collapse');
};
</script>