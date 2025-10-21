<template>
  <PageHeader
    title="Category List"
    subtitle="Manage your categories"
    :actions="[
      {
        icon: '/app/img/icons/pdf.svg',
        iconType: 'img',
        tooltip: 'Pdf',
        event: 'pdf',
      },
      {
        icon: '/app/img/icons/excel.svg',
        iconType: 'img',
        tooltip: 'Excel',
        event: 'excel',
      },
      {
        icon: 'ti ti-refresh',
        iconType: 'icon',
        tooltip: 'Refresh',
        event: 'refresh',
      },
      {
        icon: 'ti ti-chevron-up',
        iconType: 'icon',
        tooltip: 'Collapse',
        event: 'collapse',
      },
    ]"
    @pdf="exportToPdf"
    @excel="exportToExcel"
    @refresh="reloadData"
    @collapse="toggleHeader"
  >
    <template #buttons>
      <div class="page-btn d-flex">
        <router-link
          to="/inventory/add-product"
          class="btn btn-primary d-flex align-items-center"
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Product</router-link
        >
      </div>
      <div class="page-btn d-flex">
        <q-btn color="secondary" no-caps>
          <i class="bi bi-download q-mr-sm" />
          Import Master List
        </q-btn>
      </div>
    </template>
  </PageHeader>

  <!-- /product list -->
  <div class="card table-list-card">
    <div
      class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3"
    >
      <!-- Search -->
      <div class="search-set">
        <div class="search-input">
          <a href="#" class="btn-searchset"
            ><i data-feather="search" class="feather-search"></i
          ></a>
          <input
            type="search"
            class="form-control form-control-sm"
            placeholder="Search"
          />
        </div>
      </div>

      <!-- Filters -->
      <div
        class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3"
      >
        <div class="dropdown q-mr-sm">
          <a
            href="javascript:void(0);"
            class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            category
          </a>
          <ul class="dropdown-menu dropdown-menu-end p-3">
            <li v-for="(cat, i) in categorySelect" :key="i">
              <a href="javascript:void(0);" class="dropdown-item rounded-1">
                {{ cat }}
              </a>
            </li>
          </ul>
        </div>

        <div class="dropdown q-mr-sm">
          <a
            href="javascript:void(0);"
            class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Status
          </a>
          <ul class="dropdown-menu dropdown-menu-end p-3">
            <li v-for="(status, i) in categoryStatus" :key="i">
              <a href="javascript:void(0);" class="dropdown-item rounded-1">
                {{ status }}
              </a>
            </li>
          </ul>
        </div>

        <div class="dropdown">
          <a
            href="javascript:void(0);"
            class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Sort By : Last 7 Days
          </a>
          <ul class="dropdown-menu dropdown-menu-end p-3">
            <li v-for="(sort, i) in categoryListSort" :key="i">
              <a href="javascript:void(0);" class="dropdown-item rounded-1">
                {{ sort }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card-body">
      <BaseTable
        :rows="data"
        :columns="columns"
        v-model:pagination="pagination"
        :actions="[
          {
            name: 'view',
            icon: 'visibility',
            label: 'View Details',
            func: (row) => onTableAction({ type: 'view', row }),
          },
          {
            name: 'edit',
            icon: 'edit_note',
            label: 'Edit',
            func: (row) => onTableAction({ type: 'edit', row }),
          },
          {
            name: 'delete',
            icon: 'delete_outline',
            label: 'Delete',
            func: (row) => onTableAction({ type: 'delete', row }),
          },
        ]"
        @action="onTableAction"
      />
    </div>
  </div>
  <!-- /product list -->
</template>

<script setup lang="ts">
import BaseTable from "src/components/BaseTable.vue";
import PageHeader from "src/components/PageHeader.vue";
import { ref } from "vue";

const exportToExcel = (): void => {};
const exportToPdf = (): void => {};
const reloadData = (): void => {};
const onTableAction = (value: { type: string; row: any }): void => {};

const pagination = ref({
  // default column
  descending: false,
  page: 1,
  rowsPerPage: 10, // default rows per page
});

// Columns
const columns = [
  { name: "category", field: "category", label: "Category", sortable: true },
  {
    name: "code",
    field: "code",
    label: "Category Code",
    sortable: true,
  },
  {
    name: "Created On",
    field: "CreatedOn",
    label: "Created On",
    sortable: true,
  },
  {
    name: "Status",
    field: "Status",
    label: "Status",
    sortable: true,
  },
  { name: "Actions", field: "action", label: "Actions", sortable: false },
];

// Data
const data = ref([
  {
    category: "Laptop",
    code: "laptop",
    CreatedOn: "25 May 2024",
    Status: "Active",
  },
  {
    category: "Electronics",
    code: "electronics",
    CreatedOn: "24 Jun 2024",
    Status: "Active",
  },
  {
    category: "Shoe",
    code: "shoe",
    CreatedOn: "23 Jul 2024",
    Status: "Active",
  },
  {
    category: "Speaker",
    code: "speaker",
    CreatedOn: "22 Aug 2024",
    Status: "Active",
  },
  {
    category: "Furniture",
    code: "furniture",
    CreatedOn: "21 Sep 2024",
    Status: "Active",
  },
  {
    category: "Bags",
    code: "bags",
    CreatedOn: "20 Sep 2024",
    Status: "Active",
  },
  {
    category: "Phone",
    code: "phone",
    CreatedOn: "20 Sep 2024",
    Status: "Active",
  },
  {
    category: "Chairs",
    code: "chairs",
    CreatedOn: "20 Sep 2024",
    Status: "Active",
  },
]);

// Filters
const filter = ref(false);
const startdate = ref(new Date());
const dateFormat = ref("dd-MM-yyyy");

const categoryListSort = ref(["Sort by Date", "Newest", "Oldest"]);
const categorySelect = ref([
  "Choose category",
  "Laptop",
  "Electronics",
  "Shoe",
]);
const categoryStatus = ref(["Choose Status", "Active", "Inactive"]);

// Methods
const toggleHeader = () => {
  document.getElementById("collapse-header")?.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

const showConfirmation = () => console.log("Delete confirmation modal");
</script>
