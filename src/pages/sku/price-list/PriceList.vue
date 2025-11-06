<template>
  <PageHeader
    title="Price List"
    subtitle="Manage your price"
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
    @refresh="fetchPriceList"
    @collapse="toggleHeader"
  >
    <template #buttons>
      <div class="page-btn d-flex">
        <router-link
          to="/inventory/price-list/add"
          class="btn btn-primary d-flex align-items-center"
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Price
        </router-link>
      </div>
      <div class="page-btn d-flex">
        <q-btn color="secondary" @click="showModal = true" no-caps>
          <i class="bi bi-download q-mr-sm" />
          Import Price List
        </q-btn>
      </div>
    </template>
  </PageHeader>

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
            <FormField label="Store">
              <BaseSelect :options="stores" v-model="filters.stores" />
            </FormField>
            <FormField label="Category">
              <BaseSelect :options="categories" v-model="filters.categories" />
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
        :columns="priceListColumns"
        v-model:pagination="pagination"
        :actions="tableActions"
        :loading="loading"
        @action="onTableAction"
      />
    </div>
    <!-- The Modal -->
    <UploadModal
      v-model:show="showModal"
      title="Import Price List"
      download-url="/download"
      upload-url="/upload"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import type { CategoryFiler, StoreFilter } from "src/types/filter";
import PageHeader from "src/components/PageHeader.vue";
import BaseTable from "src/components/BaseTable.vue";
import FilterPopup from "src/components/FilterPopup.vue";
import BaseSelect from "src/components/BaseSelect.vue";
import UploadModal from "src/components/UploadModal.vue";
import { ApiService } from "src/services/api";
import FormField from "src/components/FormField.vue";
import BaseInput from "src/components/BaseInput.vue";
import SortDropdown from "src/components/SortDropdown.vue";
import { priceListColumns } from "./config/table-columns";
import { PriceList } from "./config/types";
// -----------------------------
// Router
// -----------------------------
const router = useRouter();
const navigateToDetails = () => router.push("/inventory/price-list/details");
const navigateToEdit = () => router.push("/inventory/price-list/edit");

// -----------------------------
// Reactive State
// -----------------------------
const showModal = ref(false);
const rows = ref<any[]>([]);
const stores = ref<any[]>([]);
const categories = ref<any[]>([]);
const loading = ref(false);
const filters = ref({
  categories: "",
  stores: "",
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

const tableActions = [
  {
    name: "view",
    icon: "visibility",
    label: "View Details",
    color: "primary",
    func: navigateToDetails,
  },
  {
    name: "edit",
    color: "orange",
    icon: "edit_note",
    label: "Edit",
    func: navigateToEdit,
  },
  {
    name: "delete",
    icon: "delete_outline",
    color: "negative",
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
const onTableAction = (action?: any) => console.log("Table action:", action);

// -----------------------------
// Filter Handlers
// -----------------------------
const onApplyFilters = (): void => {
  fetchPriceList();
};

const onResetFilters = (): void => {
  filters.value = {
    categories: "",
    stores: "",
  };
  fetchPriceList();
};

// -----------------------------
// Search & Sort Handlers
// -----------------------------
const onSearch = (): void => {
  if (searchDebounce.value) clearTimeout(searchDebounce.value);
  searchDebounce.value = setTimeout(() => {
    fetchPriceList();
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
  fetchPriceList();
};

// -----------------------------
// API Calls
// -----------------------------

const fetchPriceList = async (): Promise<void> => {
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

    const res = await ApiService.get<PriceList[]>(
      `/pricelist.json?ts=${Date.now()}}`,
      params,
    );
    rows.value = res.data || [];
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
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

// -----------------------------
// Lifecycle
// -----------------------------
onMounted(async () => {
  await Promise.all([fetchPriceList(), fetchStores(), fetchCategories()]);
});

// -----------------------------
// Watch search input for live fetch
// -----------------------------
watch(searchQuery, onSearch);
</script>
