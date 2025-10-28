<template>
  <PageHeader
    title="Sales Report"
    subtitle="Manage your Sales report"
    :actions="[
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
  />
  <div class="row q-col-gutter-x-lg">
    <div class="col-lg-3 col-sm-6 col-12">
      <div class="card border border-success sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-success text-white">
            <i class="ti ti-align-box-bottom-left-filled fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-weight-medium q-mb-xs">Total Amount</p>
            <div>
              <h3>₱4,56,000</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12">
      <div class="card border border-info sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-info text-white">
            <i class="ti ti-align-box-bottom-left-filled fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-weight-medium q-mb-xs">Total Paid</p>
            <div>
              <h3>₱2,56,42</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12">
      <div class="card border border-orange sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-orange text-white">
            <i class="ti ti-moneybag fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-weight-medium q-mb-xs">Total Unpaid</p>
            <div>
              <h3>₱1,52,45</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12">
      <div class="card border border-danger sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-danger text-white">
            <i class="ti ti-alert-circle-filled fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-weight-medium q-mb-xs">Overdue</p>
            <div>
              <h3>₱2,56,12</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- /product list -->
  <div class="card table-list-card no-search">
    <div
      class="card-header d-flex items-center justify-content-between flex-wrap row-gap-3"
    >
      <div></div>
      <ul class="table-top-head">
        <li class="me-2">
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"
            ><img src="/app/img/icons/pdf.svg" alt="img"
          /></a>
        </li>
        <li class="me-2">
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"
            ><img src="/app/img/icons/excel.svg" alt="img"
          /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Print"
            ><i class="ti ti-printer"></i
          ></a>
        </li>
        <li>
          <FilterPopup
            :filters="filters"
            :loading="loading"
            @apply="onApplyFilters"
            @reset="onResetFilters"
          />
        </li>
      </ul>
    </div>
    <div class="card-body">
      <BaseTable
        :rows="sales"
        :columns="salesReportColumns"
        v-model:pagination="pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseTable from "src/components/BaseTable.vue";
import FilterPopup from "src/components/FilterPopup.vue";
import PageHeader from "src/components/PageHeader.vue";
import { ApiService } from "src/services/api";
import type { BrandFilter, CategoryFiler, StoreFilter } from "src/types/filter";
import { onMounted, ref } from "vue";
import { SalesReport } from "./config/types";
import { salesReportColumns } from "./config/table-columns";

const exportToExcel = (): void => {};
const exportToPdf = (): void => {};
const reloadData = (): void => {};

const toggleHeader = (): void => {
  const header = document.querySelector(".page-header") as HTMLElement;
  if (header) {
    header.classList.toggle("collapsed");
  }
};

// -----------------------------
// Reactive State
// -----------------------------
const loading = ref(false);
const stores = ref<any[]>([]);
const categories = ref<any[]>([]);
const brands = ref<any[]>([]);
const sales = ref<SalesReport[]>([]);
const filters = ref({
  categories: "",
  brands: "",
});
const pagination = ref({
  sortBy: "SKU", // default column
  descending: false,
  page: 1,
  rowsPerPage: 10, // default rows per page
});

// -----------------------------
// Filter Handlers
// -----------------------------
const onApplyFilters = (): void => {
  fetchSalesReport();
};

const onResetFilters = (): void => {
  filters.value = {
    categories: "",
    brands: "",
  };
  fetchSalesReport();
};

const fetchSalesReport = async (): Promise<void> => {
  try {
    const res = await ApiService.get<SalesReport[]>(
      `/sales-report.json?ts=${Date.now()}`,
    );
    sales.value = res.data || [];
  } catch (err) {
    console.error("Error fetching stores:", err);
  }
};

const fetchStores = async (): Promise<void> => {
  try {
    const res = await ApiService.get<StoreFilter[]>(
      `/stores.json?ts=${Date.now()}`,
    );
    stores.value = res.data || [];
  } catch (err) {
    console.error("Error fetching stores:", err);
  }
};

const fetchCategories = async (): Promise<void> => {
  try {
    const res = await ApiService.get<CategoryFiler[]>(
      `/categories.json?ts=${Date.now()}`,
    );
    categories.value = res.data || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

const fetchBrands = async (): Promise<void> => {
  try {
    const res = await ApiService.get<BrandFilter[]>(
      `/brands.json?ts=${Date.now()}`,
    );
    brands.value = res.data || [];
  } catch (err) {
    console.error("Error fetching brands:", err);
  }
};

onMounted(async () => {
  fetchBrands();
  fetchCategories();
  fetchSalesReport();
  fetchSalesReport();
});
</script>
