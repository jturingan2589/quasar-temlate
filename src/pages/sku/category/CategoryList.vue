<template>
  <PageHeader
    title="Category"
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
          Add Category
        </router-link>
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
          <a href="javascript:void(0);" class="btn-searchset">
            <i class="ti ti-search fs-14 feather-search"></i>
          </a>
          <BaseInput
            dense
            type="search"
            placeholder="Search products..."
            v-model="searchQuery"
          />
        </div>
      </div>

      <!-- Filters -->
      <div
        class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3"
      ></div>
    </div>

    <!-- Table -->
    <div class="card-body">
      <BaseTable
        :rows="data"
        :columns="categoryListColumns"
        v-model:pagination="pagination"
        :actions="[
          {
            name: 'edit',
            icon: 'edit_note',
            label: 'Edit',
            color: 'orange',
            func: (ow: any) => onTableAction({ type: 'edit', row }),
          },
          {
            name: 'delete',
            icon: 'delete',
            label: 'Delete',
            color: 'negative',
            func: (ow: any) => onTableAction({ type: 'delete', row }),
          },
        ]"
        @action="onTableAction"
      />
    </div>
  </div>
  <!-- /product list -->
</template>

<script setup lang="ts">
import BaseInput from "src/components/BaseInput.vue";
import BaseTable from "src/components/BaseTable.vue";
import PageHeader from "src/components/PageHeader.vue";
import { ref } from "vue";
import { categoryListColumns } from "./config/table-columns";

const exportToExcel = (): void => {};
const exportToPdf = (): void => {};
const reloadData = (): void => {};
const onTableAction = (value: { type: string; row: any }): void => {};

const searchQuery = ref("");
const pagination = ref({
  // default column
  descending: false,
  page: 1,
  rowsPerPage: 10, // default rows per page
});

// Data
const data = ref([
  {
    category: "Laptop",
    code: "laptop",
    created_on: "25 May 2024",
    status: "Active",
  },
  {
    category: "Electronics",
    code: "electronics",
    created_on: "24 Jun 2024",
    status: "Active",
  },
  {
    category: "Shoe",
    code: "shoe",
    created_on: "23 Jul 2024",
    status: "Active",
  },
  {
    category: "Speaker",
    code: "speaker",
    created_on: "22 Aug 2024",
    status: "Active",
  },
  {
    category: "Furniture",
    code: "furniture",
    created_on: "21 Sep 2024",
    status: "Active",
  },
  {
    category: "Bags",
    code: "bags",
    created_on: "20 Sep 2024",
    status: "Active",
  },
  {
    category: "Phone",
    code: "phone",
    created_on: "20 Sep 2024",
    status: "Active",
  },
  {
    category: "Chairs",
    code: "chairs",
    created_on: "20 Sep 2024",
    status: "Active",
  },
]);

// Filters

// Methods
const toggleHeader = () => {
  document.getElementById("collapse-header")?.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

const showConfirmation = () => console.log("Delete confirmation modal");
</script>
