<template>
  <PageHeader
    title="Entity"
    subtitle="Manage your business entities"
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
    @refresh="fetchEntities"
  >
    <template #buttons>
      <div class="page-btn d-flex">
        <AccessButton
          page="entity"
          action="create"
          color="primary"
          @click="openForm()"
          no-caps
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Entity
        </AccessButton>
      </div>
      <div class="page-btn d-flex">
        <AccessButton
          page="entity"
          action="upload"
          color="secondary"
          @click="showUploadModal = true"
          no-caps
        >
          <i class="bi bi-download q-mr-sm" />
          Import
        </AccessButton>
      </div>
    </template>
  </PageHeader>

  <!-- Entity Table -->
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
            placeholder="Search entities..."
            v-model="searchQuery"
          />
        </div>
      </div>

      <!-- Sort & Filter -->
      <div
        class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3"
      >
        <FilterPopup
          title="Entity Filters"
          :filters="filters"
          :loading="loading"
          @apply="onApplyFilters"
          @reset="onResetFilters"
        >
          <template #fields>
            <FormField label="Status">
              <BaseSelect
                :options="statusOptions"
                v-model="filters.status"
                option-label="label"
                option-value="value"
              />
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
        :columns="entityListColumn"
        v-model:pagination="pagination"
        :actions="tableActions"
        :loading="loading"
      />
    </div>

    <!-- Upload Modal -->
    <UploadModal
      v-model:show="showUploadModal"
      title="Import"
      download-url="/download/entities"
      upload-url="/upload/entities"
    />

    <!-- Add/Edit Entity Form Dialog -->
    <EntityFormDialog
      v-model="showFormModal"
      :editData="selectedEntity"
      @saved="onSavedEntity"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import FilterPopup from "src/components/FilterPopup.vue";
import UploadModal from "src/components/UploadModal.vue";
import FormField from "src/components/FormField.vue";
import SortDropdown from "src/components/SortDropdown.vue";
import { ApiService } from "src/services/api";
import { entityListColumn } from "./config/table-columns";
import EntityFormDialog from "./EntityFormDialog.vue";

const router = useRouter();

// -----------------------------
// State
// -----------------------------
const rows = ref<any[]>([]);
const loading = ref(true);
const filters = ref({ status: "" });
const searchQuery = ref("");
const searchDebounce = ref<any>(null);

const pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});
const sortByField = ref(pagination.value.sortBy);
const sortDescending = ref(pagination.value.descending);

const sortOptions = [
  { label: "Recently Added", value: "created_at", descending: true },
  { label: "Name A–Z", value: "name", descending: false },
  { label: "Name Z–A", value: "name", descending: true },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// -----------------------------
// Table Actions
// -----------------------------
const showFormModal = ref(false);
const selectedEntity = ref<any>(null);
const showUploadModal = ref(false);

const tableActions = [
  {
    name: "view",
    icon: "visibility",
    label: "View Details",
    func: (row: any) => navigate("view", row.id),
    color: "primary",
    page: "entity",
    action: "view",
  },
  {
    name: "edit",
    icon: "edit_note",
    label: "Edit",
    func: (row: any) => openForm(row),
    color: "orange",
    page: "entity",
    action: "edit",
  },
  {
    name: "delete",
    icon: "delete",
    label: "Delete",
    func: (row: any) => deleteEntity(row),
    color: "negative",
    page: "entity",
    action: "delete",
  },
];

// -----------------------------
// Methods
// -----------------------------
const navigate = (action: string, id?: string) => {
  let url = `/entity/${action}`;
  if (id) url += `/${id}`;
  router.push(url);
};

const openForm = (entity?: any) => {
  selectedEntity.value = entity ?? null;
  showFormModal.value = true;
};

const onSavedEntity = () => {
  fetchEntities();
  showFormModal.value = false;
};

const onApplyFilters = () => fetchEntities();
const onResetFilters = () => {
  filters.value = { status: "" };
  fetchEntities();
};

const onSearch = () => {
  if (searchDebounce.value) clearTimeout(searchDebounce.value);
  searchDebounce.value = setTimeout(() => {
    fetchEntities();
  }, 300);
};

const applySort = (option: {
  label: string;
  value: string;
  descending: boolean;
}) => {
  sortByField.value = option.value;
  sortDescending.value = option.descending;
  fetchEntities();
};

// -----------------------------
// API Calls
// -----------------------------
const fetchEntities = async () => {
  try {
    loading.value = true;
    const params: Record<string, string> = {};

    if (filters.value.status) params.status = filters.value.status;
    if (searchQuery.value) params.search = searchQuery.value;

    if (sortByField.value) {
      params.sortBy = sortByField.value;
      params.descending = sortDescending.value ? "true" : "false";
    }

    const res = await ApiService.get(`/entities.json?ts=${Date.now()}`, params);
    rows.value = res.data ?? [];
  } catch (err) {
    console.error("Error fetching entities:", err);
  } finally {
    loading.value = false;
  }
};

const deleteEntity = async (entity: any) => {
  console.log("Delete entity:", entity);
};

// -----------------------------
// Lifecycle
// -----------------------------
onMounted(fetchEntities);
watch(searchQuery, onSearch);
</script>
