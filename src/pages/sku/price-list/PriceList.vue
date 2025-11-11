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
        action: 'download',
        page: 'price_list',
      },
      {
        icon: '/app/img/icons/excel.svg',
        iconType: 'img',
        tooltip: 'Excel',
        event: 'excel',
        action: 'download',
        page: 'price_list',
      },
    ]"
    @pdf="exportToPdf"
    @excel="exportToExcel"
    @reload="fetchPriceList"
  >
    <template #buttons>
      <!--div class="page-btn d-flex">
        <AccessButton
          page="price_list"
          action="create"
          color="primary"
          @click="navigate('add')"
          no-caps
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Price
        </AccessButton>
      </div-->
      <div class="page-btn d-flex">
        <AccessButton
          page="price_list"
          action="upload"
          color="secondary"
          @click="showModal = true"
          no-caps
        >
          <i class="bi bi-download q-mr-sm" />
          Import Price List
        </AccessButton>
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
import FilterPopup from "src/components/FilterPopup.vue";
import UploadModal from "src/components/UploadModal.vue";
import { ApiService } from "src/services/api";
import FormField from "src/components/FormField.vue";
import SortDropdown from "src/components/SortDropdown.vue";
import { priceListColumns } from "./config/table-columns";
import { PriceList } from "./config/types";
// -----------------------------
// Router
// -----------------------------
const router = useRouter();
const navigate = (action: string, id?: string) => {
  let url = `/sku/master-list/${action}`;
  if (id) url += `/${id}`;
  router.push(url);
};

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
    action: "view",
    page: "price_list",
    func: (row: any) => navigate("view", row.id),
  },
  {
    name: "edit",
    color: "orange",
    icon: "edit_note",
    label: "Edit",
    action: "edit",
    page: "price_list",
    func: (row: any) => navigate("edit", row.id),
  },
  {
    name: "delete",
    icon: "delete_outline",
    color: "negative",
    label: "Delete",
    action: "delete",
    page: "price_list",
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
