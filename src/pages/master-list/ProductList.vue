<template>
  <PageHeader 
    title="Master List" 
    subtitle="Manage your products"
    :actions="[
      { icon: '/app/img/icons/pdf.svg', iconType: 'img', tooltip: 'Pdf', event: 'pdf' },
      { icon: '/app/img/icons/excel.svg', iconType: 'img', tooltip: 'Excel', event: 'excel' },
      { icon: 'ti ti-refresh', iconType: 'icon', tooltip: 'Refresh', event: 'refresh' },
      { icon: 'ti ti-chevron-up', iconType: 'icon', tooltip: 'Collapse', event: 'collapse' }
    ]"
    @pdf="exportToPdf"
    @excel="exportToExcel"
    @refresh="reloadData"
    @collapse="toggleHeader"
  >
    <template #buttons>
      <div class="page-btn d-flex">
        <router-link to="/inventory/master-list/add" class="btn btn-primary d-flex align-items-center">
          <i class="bi bi-plus-circle q-mr-sm" />
          Add Product</router-link>
      </div>	
      <div class="page-btn d-flex">
        <q-btn color="secondary"  no-caps>
          <i class="bi bi-download q-mr-sm" />
          Import Master List
        </q-btn>
      </div>
    </template>
  </PageHeader>
  <!-- /product list -->
  <div class="card table-list-card">
    <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
      <div class="search-set">
        <div class="search-input">
          <a href="javascript:void(0);" class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></a>
          <input type="search" class="form-control form-control-sm" placeholder="Search">
        </div>
      </div>
      <div class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
        <div class="dropdown q-mr-sm">
          <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
            Category
          </a>
          <ul class="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Computers</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Electronics</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Shoe</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Electronics</a>
            </li>
          </ul>
        </div>
        <div class="dropdown q-mr-sm">
          <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
            Brand
          </a>
          <ul class="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Lenovo</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Beats</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Nike</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Apple</a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
            Sort By : Last 7 Days
          </a>
          <ul class="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Recently Added</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Ascending</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Desending</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Last Month</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1">Last 7 Days</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-body">
      <BaseTable
        :rows="rows"
        :columns="columns"
        v-model:pagination="pagination"
        :actions="[
          { name: 'view', icon: 'visibility', label: 'View Details', func: viewProductDetails },
          { name: 'edit', icon: 'edit_note', label: 'Edit', func: addEditProduct },
          { name: 'delete', icon: 'delete_outline',  label: 'Delete', func: deleteProduct}
        ]"
        @action="onTableAction"
      />
    </div>
  </div>
  <!-- /product list -->
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router'
  import PageHeader from 'src/components/PageHeader.vue';
  import BaseTable from 'src/components/BaseTable.vue';
  import { ApiService } from 'src/services/api';
  const router = useRouter()
  const viewProductDetails = () =>{
    router.push('/inventory/master-list/details')
  }

  const addEditProduct = () =>{
    router.push('/inventory/master-list/edit')
  }

  const deleteProduct = () =>{

  }

  const pagination = ref({
    sortBy: 'SKU',        // default column
    descending: false,
    page: 1,
    rowsPerPage: 10       // default rows per page
  })

  const toggleHeader = (): void => {
    const headerEl = document.getElementById("collapse-header");
    if (headerEl) {
      headerEl.classList.toggle("active");
    }
    document.body.classList.toggle("header-collapse");
  };

  const exportToExcel = (): void =>{}
  const exportToPdf = (): void =>{}
  const reloadData = (): void =>{}
  const onTableAction = (): void =>{}

  const rows = ref<any[]>([])
  const loading = ref(true)
  const columns = [
    {
      label: "SKU",
      field: "sku",
      name: "sku",
      sortable: true,
    },
    {
      label: "Product Name",
      field: "description",
      name: "description",
      sortable: true,
    },
    {
      label: "Category",
      field: "category",
      name: "category",
      sortable: true,
    },
    {
      label: "Brand",
      field: "brand",
      name: "brand",
      sortable: true,
    },
    {
      label: "Price",
      field: "price",
      name: "price",
      sortable: true,
    },
    {
      label: "Unit",
      field: "unit",
      name: "unit",
      sortable: true,
    },
    {
      label: "Qty",
      field: "qty",
      name: "qty",
      sortable: true,
    },
    {
      label: "Created By",
      field: "createdBy",
      name: "createdBy",
      sortable: true,
    },

  ];

  interface ProductResponse {
    products?: Array<any>;
  }

  onMounted(async () => {
    try {
      const data = await ApiService.get<ProductResponse>(`/products.json?ts=${Date.now()}`)
      rows.value = data.products || []
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      loading.value = false
    }
  })


</script>
