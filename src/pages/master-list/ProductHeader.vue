<template>
  <div class="page-header">
    <div class="add-item d-flex">
      <div class="page-title">
        <h4 class="fw-bold">Master List</h4>
        <h6>Manage your products</h6>
      </div>
    </div>
    <ul class="table-top-head">
      <li>
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img src="/app/img/icons/pdf.svg" alt="img"></a>
      </li>
      <li>
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img src="/app/img/icons/excel.svg" alt="img"></a>
      </li>
      <li>
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i class="ti ti-refresh"></i></a>
      </li>
      <li>
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header" @click="toggleHeader"><i class="ti ti-chevron-up"></i></a>
      </li>
    </ul>
    <div class="page-btn d-flex">
      <router-link to="/inventory/add-product" class="btn btn-primary d-flex align-items-center">
        <i class="bi bi-plus-circle me-2" />
        Add Product</router-link>
    </div>	
    <div class="page-btn import d-flex">
      <a href="#" class="btn btn-secondary color d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#view-notes">
        <i class="bi bi-download me-2" />Import Master List</a>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from "vue";

  // ✅ Toggle function for header
  const toggleHeader = (): void => {
    const headerEl = document.getElementById("collapse-header");
    if (headerEl) {
      headerEl.classList.toggle("active");
    }
    document.body.classList.toggle("header-collapse");
  };

  // Example: attach a listener if needed
  onMounted(() => {
    // You could set initial state here if required
  });
</script>
