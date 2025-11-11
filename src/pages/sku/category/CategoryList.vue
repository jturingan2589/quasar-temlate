<template>
  <PageHeader
    title="Category"
    subtitle="Manage your categories"
    :actions="headerActions"
    @pdf="exportToPdf"
    @excel="exportToExcel"
    @reload="fetchCategories"
  >
    <template #buttons>
      <div class="page-btn d-flex">
        <AccessButton
          page="category"
          action="create"
          color="primary"
          @click="openDialog()"
          no-caps
        >
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Category
        </AccessButton>
      </div>
    </template>
  </PageHeader>

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
            placeholder="Search categories..."
            v-model="searchQuery"
          />
        </div>
      </div>
      <!-- Filters placeholder -->
      <div
        class="d-flex table-dropdown my-xl-auto right-content flex-wrap row-gap-3"
      ></div>
    </div>

    <!-- Table -->
    <div class="card-body">
      <BaseTable
        :rows="categories"
        :columns="categoryListColumns"
        v-model:pagination="pagination"
        :actions="tableActions"
        :loading="loading"
      />
    </div>
  </div>

  <!-- Category Form Dialog -->
  <CategoryFormDialog
    v-model="showDialog"
    :data="editCategory"
    @saved="onCategorySaved"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { categoryListColumns } from "./config/table-columns";
import { ApiService } from "src/services/api";
import { useConfirmDialog } from "src/composable/useConfirmDialog";
import useNotify from "src/composable/useNotify";
import CategoryFormDialog from "./CategoryFormDialog.vue";

// -----------------------------
// Reactive State
// -----------------------------
const categories = ref<any[]>([]);
const loading = ref(false);
const showDialog = ref(false);
const editCategory = ref<any>(null);
const searchQuery = ref("");

const { confirmAction } = useConfirmDialog();
const { success, error } = useNotify();

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  descending: false,
  sortBy: "category",
});

// -----------------------------
// Header Actions
// -----------------------------
const headerActions = [
  {
    icon: "/app/img/icons/pdf.svg",
    iconType: "img",
    tooltip: "Pdf",
    event: "pdf",
    action: "download",
    page: "category",
  },
  {
    icon: "/app/img/icons/excel.svg",
    iconType: "img",
    tooltip: "Excel",
    event: "excel",
    action: "download",
    page: "category",
  },
];

// -----------------------------
// Table Actions
// -----------------------------
const tableActions = [
  {
    name: "edit",
    icon: "edit_note",
    label: "Edit",
    color: "orange",
    action: "edit",
    page: "category",
    func: (row: any) => openDialog(row),
  },
  {
    name: "delete",
    icon: "delete",
    label: "Delete",
    color: "negative",
    action: "delete",
    page: "category",
    func: (row: any) => confirmDelete(row),
  },
];

// -----------------------------
// Methods
// -----------------------------
const openDialog = (category?: any) => {
  editCategory.value = category || null;
  showDialog.value = true;
};

const onCategorySaved = (category: any) => {
  // Update or insert new category
  const index = categories.value.findIndex((c) => c.id === category.id);
  if (index >= 0) categories.value[index] = category;
  else categories.value.unshift(category);
};

const confirmDelete = async (category: any) => {
  const confirmed = await confirmAction(
    `Delete Category`,
    `Delete category '${category.category_name}'?`,
    {
      okLabel: "Delete",
      okColor: "negative",
    },
  );
  if (!confirmed) return;

  loading.value = true;
  try {
    await ApiService.delete(`/category/${category.id}`);
    categories.value = categories.value.filter(
      (c: any) => c.id !== category.id,
    );
    success("Category deleted successfully");
  } catch (err) {
    error("Failed to delete category");
  } finally {
    loading.value = false;
  }
};

const exportToPdf = () => console.log("Export PDF");
const exportToExcel = () => console.log("Export Excel");

const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await ApiService.get("/categories.json", {
      search: searchQuery.value,
      page: pagination.value.page,
      limit: pagination.value.rowsPerPage,
    });
    categories.value = res.data || [];
  } catch (err) {
    console.error("Fetch categories failed:", err);
  } finally {
    loading.value = false;
  }
};

// -----------------------------
// Watchers
// -----------------------------
watch(searchQuery, fetchCategories);

// Initial fetch
fetchCategories();
</script>
