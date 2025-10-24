<template>
  <PageHeader
    title="Master List"
    subtitle="Manage your products"
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
          to="/inventory/master-list/add"
          class="btn btn-primary d-flex align-items-center"
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Product
        </router-link>
      </div>
      <div class="page-btn d-flex">
        <q-btn color="secondary" @click="showModal = true" no-caps>
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
      <div
        class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3"
      >
        <FilterPopup
          title="Product Filters"
          :filters="filters"
          :loading="loading"
          @apply="onApplyFilters"
          @reset="onResetFilters"
        >
          <template #fields>
            <FormField label="Category">
              <BaseSelect :options="categories" v-model="filters.categories" />
            </FormField>
            <FormField label="Brand">
              <BaseSelect :options="brands" v-model="filters.brands" />
            </FormField>
          </template>
        </FilterPopup>
        <SortDropdown
          v-model="sortByField"
          :sort-options="sortOptions"
          @change="applySort"
        />
      </div>
    </div>
    <div class="card-body">
      <BaseTable
        :rows="rows"
        :columns="columns"
        v-model:pagination="pagination"
        :actions="tableActions"
        :loading="loading"
        @action="onTableAction"
      />
    </div>
    <!-- The Modal -->
    <UploadModal
      v-model:show="showModal"
      title="Import Master List"
      download-url="/download"
      upload-url="/upload"
    />
  </div>
  <!-- /product list -->
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import PageHeader from "src/components/PageHeader.vue";
import BaseTable from "src/components/BaseTable.vue";
import FilterPopup from "src/components/FilterPopup.vue";
import BaseSelect from "src/components/BaseSelect.vue";
import UploadModal from "src/components/UploadModal.vue";
import { ApiService } from "src/services/api";
import FormField from "src/components/FormField.vue";
import BaseInput from "src/components/BaseInput.vue";
import SortDropdown from "src/components/SortDropdown.vue";

// -----------------------------
// Router
// -----------------------------
const router = useRouter();
const navigateToDetails = () => router.push("/inventory/master-list/details");
const navigateToEdit = () => router.push("/inventory/master-list/edit");

// -----------------------------
// Reactive State
// -----------------------------
const showModal = ref(false);
const rows = ref<any[]>([]);
const stores = ref<any[]>([]);
const categories = ref<any[]>([]);
const brands = ref<any[]>([]);
const loading = ref(true);

const filters = ref({
  categories: "",
  brands: "",
});

const searchQuery = ref(""); // search input
const searchDebounce = ref<any>(null);

const pagination = ref({
  sortBy: "SKU",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const sortByField = ref(pagination.value.sortBy);
const sortDescending = ref(pagination.value.descending);

const sortOptions = [
  { label: "Recently Added", value: "created_at", descending: true },
  { label: "Ascending", value: "product_name", descending: false },
  { label: "Descending", value: "product_name", descending: true },
  { label: "Last Month", value: "created_at", descending: true },
  { label: "Last 7 Days", value: "created_at", descending: true },
];

// -----------------------------
// Table & Column Configuration
// -----------------------------
const columns = [
  { label: "SKU", field: "sku", name: "sku", sortable: true },
  {
    label: "Product Name",
    field: "description",
    name: "description",
    sortable: true,
  },
  { label: "Category", field: "category", name: "category", sortable: true },
  { label: "Brand", field: "brand", name: "brand", sortable: true },
  { label: "Price", field: "price", name: "price", sortable: true },
  { label: "Unit", field: "unit", name: "unit", sortable: true },
  { label: "Qty", field: "qty", name: "qty", sortable: true },
  {
    label: "Created By",
    field: "createdBy",
    name: "createdBy",
    sortable: true,
  },
];

const tableActions = [
  {
    name: "view",
    icon: "visibility",
    label: "View Details",
    func: navigateToDetails,
  },
  { name: "edit", icon: "edit_note", label: "Edit", func: navigateToEdit },
  {
    name: "delete",
    icon: "delete_outline",
    label: "Delete",
    func: (row: any) => console.log("Delete:", row),
  },
];

// -----------------------------
// Header & Toolbar Actions
// -----------------------------
const toggleHeader = (): void => {
  const headerEl = document.getElementById("collapse-header");
  if (headerEl) headerEl.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

const exportToExcel = (): void => console.log("Export Excel");
const exportToPdf = (): void => console.log("Export PDF");
const reloadData = (): void => console.log("Reload data");
const onTableAction = (action?: any) => console.log("Table action:", action);

// -----------------------------
// Filter Handlers
// -----------------------------
const onApplyFilters = (): void => {
  fetchProducts();
};

const onResetFilters = (): void => {
  filters.value = {
    categories: "",
    brands: "",
  };
  fetchProducts();
};

// -----------------------------
// Search & Sort Handlers
// -----------------------------
const onSearch = (): void => {
  if (searchDebounce.value) clearTimeout(searchDebounce.value);
  searchDebounce.value = setTimeout(() => {
    fetchProducts();
  }, 300); // debounce 300ms
};

const applySort = (option: {
  label: string;
  value: string;
  descending: boolean;
}) => {
  console.log(option.label, "==");
  sortByField.value = option.label;
  sortDescending.value = option.descending;
  fetchProducts();
};

// -----------------------------
// API Calls
// -----------------------------
interface ProductResponse {
  products?: Array<any>;
}

const fetchProducts = async (): Promise<void> => {
  try {
    loading.value = true;
    const params: Record<string, string> = {};

    // Add filters
    Object.entries(filters.value).forEach(([k, v]) => {
      if (v) params[k] = v;
    });

    // Add search
    if (searchQuery.value) params.search = searchQuery.value;

    // Add sort
    if (sortByField.value) {
      params.sortBy = sortByField.value;
      params.descending = sortDescending.value ? "true" : "false";
    }

    const data = await ApiService.get<ProductResponse>(
      `/products.json?ts=${Date.now()}}`,
      params,
    );
    rows.value = data.products || [];
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
};

const fetchStores = async (): Promise<void> => {
  try {
    const data = await ApiService.get<ProductResponse>(
      `/stores.json?ts=${Date.now()}`,
    );
    stores.value = data.products || [];
  } catch (err) {
    console.error("Error fetching stores:", err);
  }
};

const fetchCategories = async (): Promise<void> => {
  try {
    const data = await ApiService.get<{ categories: Array<any> }>(
      `/categories.json?ts=${Date.now()}`,
    );
    categories.value = data.categories || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

const fetchBrands = async (): Promise<void> => {
  try {
    const data = await ApiService.get<{ brands: Array<any> }>(
      `/brands.json?ts=${Date.now()}`,
    );
    brands.value = data.brands || [];
  } catch (err) {
    console.error("Error fetching brands:", err);
  }
};

// -----------------------------
// Lifecycle
// -----------------------------
onMounted(async () => {
  await Promise.all([
    fetchProducts(),
    fetchStores(),
    fetchCategories(),
    fetchBrands(),
  ]);
});

// -----------------------------
// Watch search input for live fetch
// -----------------------------
watch(searchQuery, onSearch);
</script>
