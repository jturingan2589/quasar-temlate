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
        <a
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Collapse"
          id="collapse-header"
          @click="toggleHeader"
          ><i class="ti ti-chevron-up"></i
        ></a>
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
      ></div>
    </div>
    <div class="card-body">
      <BaseTable
        :columns="columns"
        :rows="roles"
        :pagination="{ pageSize: 5 }"
      />
    </div>
  </div>
  <!-- /product list -->
</template>
<script setup lang="ts">
import BaseTable from "src/components/BaseTable.vue";
import { onMounted, ref } from "vue";
import { kcApiService } from "src/services/keycloak";
import { QTableProps } from "quasar";

const loading = ref<boolean>(false);
const roles = ref<Role[]>([]);

interface Role {
  id: string;
  name: string;
  description: string;
}
// --------------------
// Table Columns
// --------------------
const columns = ref<QTableProps["columns"]>([
  {
    name: "name",
    label: "Role",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    sortable: true,
    align: "left",
  },
  {
    name: "action",
    label: "",
    field: "action",
    sortable: false,
    align: "center",
  },
]);

// --------------------
// Methods
// --------------------
const toggleHeader = () => {
  const el = document.getElementById("collapse-header");
  if (el) el.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

const fetchRoles = async (): Promise<void> => {
  loading.value = true;
  try {
    const res = await kcApiService.get<Role[]>(`/roles?`);
    roles.value = res || [];
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchRoles();
});
</script>
