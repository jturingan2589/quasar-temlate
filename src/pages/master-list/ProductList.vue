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
        :rows="data"
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import PageHeader from 'src/components/PageHeader.vue';
  import BaseTable from 'src/components/BaseTable.vue';
  const router = useRouter()
  const viewProductDetails = () =>{
    console.log("=== VIEW DETAILS ====")
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

  const columns = [
    {
      label: "SKU",
      field: "SKU",
      name: "SKU",
      sortable: true
    },
    {
      label: "Product Name",
      field: "Product",
      name: "Product",
      sortable: true
    },
    {
      label: "Category",
      field: "Category",
      name: "Category",
      sortable: true
    },
    {
      label: "Brand",
      field: "Brand",
      name: "Brand",
      sortable: true
    },
    {
      label: "Price",
      field: "Price",
      name: "Price",
      sortable: true
    },
    {
      label: "Unit",
      name: "Unit",
      field: "Unit",
      sortable: true
    },
    {
      label: "Qty",
      field: "Qty",
      name: "Qty",
      sortable: true
    },
    {
      label: "Created by",
      field: "CreatedBy",
      name: "CreatedBy",
      sortable: true
    },
    {
      label: "",
      name: "action",
    },
  ];
  const data = [
    {
      Product: "Lenovo 3rd Generation",
      SKU: "PT001",
      Category: "Computers",
      Brand: "Lenovo",
      Price: "$600",
      Unit: "Pc",
      Qty: "100",
      Image: "stock-img-01.png",
      UserImage: "user-30.jpg",
      CreatedBy: "James Kirwin",
    },
    {
      Product: "Bold V3.2",
      SKU: "PT002",
      Category: "Electronics",
      Brand: "Bolt",
      Price: "$160",
      Unit: "Pc",
      Qty: "140",
      Image: "stock-img-06.png",
      UserImage: "user-13.jpg",
      CreatedBy: "Francis Chang",
    },
    {
      Product: "Nike Jordan",
      SKU: "PT003",
      Category: "Shoe",
      Brand: "Nike",
      Price: "$110",
      Unit: "Pc",
      Qty: "780",
      Image: "stock-img-02.png",
      UserImage: "user-11.jpg",
      CreatedBy: "Antonio Engle",
    },
    {
      Product: "Apple Series 5 Watch",
      SKU: "PT004",
      Category: "Electronics",
      Brand: "Apple",
      Price: "$120",
      Unit: "Pc",
      Qty: "450",
      Image: "stock-img-03.png",
      UserImage: "user-03.jpg",
      CreatedBy: "Leo Kelly",
    },
    {
      Product: "Amazon Echo Dot",
      SKU: "PT005",
      Category: "Electronics",
      Brand: "Amazon",
      Price: "$80",
      Unit: "Pc",
      Qty: "477",
      Image: "stock-img-04.png",
      UserImage: "user-02.jpg",
      CreatedBy: "Annette Walker",
    },
    {
      Product: "Lobar Handy",
      SKU: "PT006",
      Category: "Furnitures",
      Brand: "Woodmart",
      Price: "$320",
      Unit: "Kg",
      Qty: "145",
      Image: "stock-img-05.png",
      UserImage: "user-05.jpg",
      CreatedBy: "John Weaver",
    },
    {
      Product: "Red Premium Handy",
      SKU: "PT007",
      Category: "Bags",
      Brand: "Versace",
      Price: "$60",
      Unit: "Pc",
      Qty: "747",
      Image: "stock-img-01.png",
      UserImage: "user-08.jpg",
      CreatedBy: "Gary Hennessy",
    },
    {
      Product: "Iphone 14 Pro",
      SKU: "PT008",
      Category: "Phone",
      Brand: "Apple",
      Price: "$540",
      Unit: "Pc",
      Qty: "897",
      Image: "stock-img-02.png",
      UserImage: "user-04.jpg",
      CreatedBy: "Eleanor Panek",
    },
    {
      Product: "Gaming Chair",
      SKU: "PT009",
      Category: "Furniture",
      Brand: "Arlime",
      Price: "$200",
      Unit: "Pc",
      Qty: "741",
      Image: "expire-product-03.png",
      UserImage: "user-01.jpg",
      CreatedBy: "William Levy",
    },
    {
      Product: "Borealis Backpack",
      SKU: "PT010",
      Category: "Bags",
      Brand: "The North Face",
      Price: "$45",
      Unit: "Pc",
      Qty: "148",
      Image: "expire-product-04.png",
      UserImage: "user-10.jpg",
      CreatedBy: "Charlotte Klotz",
    },
    {
      Product: "Borealis Backpack",
      SKU: "PT010",
      Category: "Bags",
      Brand: "The North Face",
      Price: "$45",
      Unit: "Pc",
      Qty: "550",
      Image: "expire-product-04.png",
      UserImage: "user-10.jpg",
      CreatedBy: "Charlotte Klotz",
    },
  ];

</script>
