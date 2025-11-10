<template>
  <PageHeader
    title="Store"
    subtitle="Manage registered stores"
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
    ]"
    @pdf="exportToPdf"
    @excel="exportToExcel"
    @refresh="fetchStores"
  >
    <template #buttons>
      <div class="page-btn d-flex">
        <AccessButton
          page="store"
          action="create"
          color="primary"
          @click="openFormDialog()"
          no-caps
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Store
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
            <i class="ti ti-search fs-14"></i>
          </a>
          <BaseInput
            dense
            type="search"
            placeholder="Search stores..."
            v-model="searchQuery"
          />
        </div>
      </div>
      <SortDropdown
        v-model="sortByField"
        :sort-options="sortOptions"
        @change="applySort"
      />
    </div>

    <div class="card-body">
      <BaseTable
        :rows="rows"
        :columns="storeColumns"
        v-model:pagination="pagination"
        :actions="tableActions"
        :loading="loading"
        @action="onTableAction"
      />
    </div>
  </div>
  <StoreFormDialog
    v-model="isFormOpen"
    :edit-data="selectedStore"
    @saved="fetchStores"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { storeColumns } from "./config/table-columns";
import SortDropdown from "src/components/SortDropdown.vue";
import { ApiService } from "src/services/api";
import { type Store } from "./config/types";
import StoreFormDialog from "./StoreFormDialog.vue";

const isFormOpen = ref(false);
const selectedStore = ref<Store | null>(null);

const router = useRouter();
const navigate = (action: string, id?: string) => {
  let url = `/store-management/store/${action}`;
  if (id) url += `/${id}`;
  router.push(url);
};

// ----------------------------------
// STATE
// ----------------------------------
const rows = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref("");
const sortByField = ref("store_code");
const sortDescending = ref(false);
const pagination = ref({
  sortBy: "store_code",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const sortOptions = [
  { label: "Recently Added", value: "created_at", descending: true },
  { label: "Ascending", value: "store_code", descending: false },
  { label: "Descending", value: "store_code", descending: true },
];

// ----------------------------------
// TABLE ACTIONS
// ----------------------------------
const tableActions = [
  {
    name: "view",
    icon: "visibility",
    label: "View Details",
    func: (row: any) => navigate("view", row.id),
    color: "primary",
    page: "store",
    action: "view",
  },
  {
    name: "edit",
    icon: "edit_note",
    label: "Edit",
    func: (row: any) => openFormDialog(row),
    color: "orange",
    page: "store",
    action: "edit",
  },
  {
    name: "delete",
    icon: "delete",
    label: "Delete",
    func: (row: any) => deleteStore(row),
    color: "negative",
    page: "store",
    action: "delete",
  },
];

// ----------------------------------
// METHODS
// ----------------------------------

const exportToPdf = () => console.log("Export PDF");
const exportToExcel = () => console.log("Export Excel");
const onTableAction = (action?: any) => console.log("Table action:", action);

const openFormDialog = (store?: Store) => {
  console.log(">>>>>", store);
  selectedStore.value = store ? { ...store } : null;
  isFormOpen.value = true;
};

const applySort = (option: any) => {
  sortByField.value = option.value;
  sortDescending.value = option.descending;
  fetchStores();
};

const deleteStore = async (store: any) => {
  console.log("Delete store:", store);
};

// ----------------------------------
// FETCH DATA
// ----------------------------------
const fetchStores = async () => {
  try {
    loading.value = true;
    const res = await ApiService.get("/stores.json?ts=" + Date.now());
    rows.value = res.data || [];
  } catch (err) {
    console.error("Error fetching stores:", err);
  } finally {
    loading.value = false;
  }
};

// ----------------------------------
// LIFECYCLE
// ----------------------------------
onMounted(() => {
  fetchStores();
});

watch(searchQuery, () => fetchStores());
</script>
