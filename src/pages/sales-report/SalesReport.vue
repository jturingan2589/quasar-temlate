<template>

  <div class="page-header">
    <div class="add-item d-flex">
      <div class="page-title">
        <h4>Sales Report</h4>
        <h6>Manage your Sales report</h6>
      </div>
    </div>
    <ul class="table-top-head">
      <li class="me-2">
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"
          ><i class="ti ti-refresh"></i
        ></a>
      </li>
      <li class="me-2">
        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header" @click="toggleHeader"><i class="ti ti-chevron-up"></i></a>
      </li>
    </ul>
  </div>
  <div class="row q-col-gutter-x-lg">
    <div class="col-lg-3 col-sm-6 col-12">
      <div class="card border border-success sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-success text-white">
            <i class="ti ti-align-box-bottom-left-filled fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-weight-medium q-mb-xs">Total Amount</p>
            <div>
              <h3>$4,56,000</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12">
      <div class="card border border-info sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-info text-white">
            <i class="ti ti-align-box-bottom-left-filled fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-weight-medium q-mb-xs">Total Paid</p>
            <div>
              <h3>$2,56,42</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12">
      <div class="card border border-orange sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-orange text-white">
            <i class="ti ti-moneybag fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-weight-medium q-mb-xs">Total Unpaid</p>
            <div>
              <h3>$1,52,45</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12">
      <div class="card border border-danger sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-danger text-white">
            <i class="ti ti-alert-circle-filled fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-weight-medium q-mb-xs">Overdue</p>
            <div>
              <h3>$2,56,12</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card border-0">
    <div class="card-body pb-1">
      <div class="row q-gutter-x-sm">
        <div class="col-md-3 col-12">
          <div class="q-mb-sm">
            <label class="form-label">Choose Date </label>
            <div class="input-icon-start relative-position">
              <input
                type="text"
                class="form-control date-range bookingrange"
                placeholder="dd/mm/yyyy - dd/mm/yyyy"
                ref="dateRangeInput"
              />
              <span class="input-icon-left">
                <i class="ti ti-calendar"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12">
          <div class="q-mb-sm">
            <label class="form-label">Store</label>
            <q-select outlined v-model="model" :options="options" dense :options-dense="denseOpts" />
          </div>
        </div>
        <div class="col-md-3 col-12">
          <div class="q-mb-sm">
            <label class="form-label">Products</label>
            <q-select outlined v-model="model" :options="options" dense :options-dense="denseOpts" />
          </div>
        </div>
        <div class="col-md-2 col-12 column items-center ">
          <div class="q-mb-sm ">
           
  
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /product list -->
  <div class="card table-list-card no-search">
    <div
      class="card-header d-flex items-center justify-content-between flex-wrap row-gap-3"
    >
      <div>
        <h4>Sales Report</h4>
      </div>
      <ul class="table-top-head">
        <li class="me-2">
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"
            ><img src="/app/img/icons/pdf.svg" alt="img"
          /></a>
        </li>
        <li class="me-2">
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"
            ><img src="/app/img/icons/excel.svg" alt="img"
          /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Print"
            ><i class="ti ti-printer"></i
          ></a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <BaseTable
        :rows="rows"
        :columns="columns"
        v-model:pagination="pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTable from 'src/components/BaseTable.vue';

  const exportToExcel = (): void =>{}
  const exportToPdf = (): void =>{}
  const reloadData = (): void =>{}
  

  interface ProductRow {
    sku: string;
    product: { name: string; img: string };
    brand: string;
    category: string;
    soldQty: number;
    soldAmount: string;
    instockQty: number;
  }

  // Columns definition
  const columns = [
    { name: 'sku', label: 'SKU', align: 'left', field: (row: ProductRow) => row.sku, sortable: true },
    { name: 'product', label: 'Product Name', align: 'left', field: (row: ProductRow) => row.product, sortable: true },
    { name: 'brand', label: 'Brand', align: 'left', field: (row: ProductRow) => row.brand, sortable: true },
    { name: 'category', label: 'Category', align: 'left', field: (row: ProductRow) => row.category, sortable: true },
    { name: 'soldQty', label: 'Sold Qty', align: 'right', field: (row: ProductRow) => row.soldQty, sortable: true },
    { name: 'soldAmount', label: 'Sold Amount', align: 'right', field: (row: ProductRow) => row.soldAmount, sortable: true },
    { name: 'instockQty', label: 'Instock Qty', align: 'right', field: (row: ProductRow) => row.instockQty, sortable: true }
  ];

// Rows/data
  const rows = [
    {
      sku: 'PT001',
      product: { name: 'Lenovo IdeaPad 3', img: '/app/img/products/laptop.png' },
      brand: 'Lenovo',
      category: 'Computers',
      soldQty: 5,
      soldAmount: '$3000',
      instockQty: 100
    },
    {
      sku: 'PT002',
      product: { name: 'Beats Pro', img: '/app/img/products/stock-img-06.png' },
      brand: 'Beats',
      category: 'Electronics',
      soldQty: 10,
      soldAmount: '$1600',
      instockQty: 140
    },
    {
      sku: 'PT003',
      product: { name: 'Nike Jordan', img: '/app/img/products/stock-img-02.png' },
      brand: 'Nike',
      category: 'Shoe',
      soldQty: 8,
      soldAmount: '$880',
      instockQty: 300
    },
    {
      sku: 'PT004',
      product: { name: 'Apple Series 5 Watch', img: '/app/img/products/stock-img-03.png' },
      brand: 'Apple',
      category: 'Electronics',
      soldQty: 10,
      soldAmount: '$1200',
      instockQty: 450
    },
    {
      sku: 'PT005',
      product: { name: 'Amazon Echo Dot', img: '/app/img/products/stock-img-04.png' },
      brand: 'Amazon',
      category: 'Electronics',
      soldQty: 5,
      soldAmount: '$400',
      instockQty: 320
    },
    {
      sku: 'PT006',
      product: { name: 'Sanford Chair Sofa', img: '/app/img/products/stock-img-05.png' },
      brand: 'Modern Wave',
      category: 'Furniture',
      soldQty: 7,
      soldAmount: '$2240',
      instockQty: 650
    },
    {
      sku: 'PT007',
      product: { name: 'Red Premium Satchel', img: '/app/img/products/expire-product-01.png' },
      brand: 'Dior',
      category: 'Bags',
      soldQty: 15,
      soldAmount: '$900',
      instockQty: 700
    },
    {
      sku: 'PT008',
      product: { name: 'Iphone 14 Prol', img: '/app/img/products/expire-product-02.png' },
      brand: 'Apple',
      category: 'Phone',
      soldQty: 12,
      soldAmount: '$6480',
      instockQty: 630
    },
    {
      sku: 'PT009',
      product: { name: 'Gaming Chair', img: '/app/img/products/expire-product-03.png' },
      brand: 'Arlime',
      category: 'Furniture',
      soldQty: 10,
      soldAmount: '$2000',
      instockQty: 410
    },
    {
      sku: 'PT010',
      product: { name: 'Borealis Backpack', img: '/app/img/products/expire-product-04.png' },
      brand: 'The North Face',
      category: 'Bags',
      soldQty: 20,
      soldAmount: '$900',
      instockQty: 550
    }
  ];
</script>
