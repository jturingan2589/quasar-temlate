<template>
  <!-- Row 1 Welcome-->  
  <div class="row items-center justify-between wrap q-gutter-md q-mb-sm">
    <div class="q-mb-md">
      <h1 class="q-mb-xs">Welcome, Admin</h1>
      <p class="fw-medium">
        You have <span class="text-primary fw-bold">200+</span> Orders, Today
      </p>
    </div>
    <div class="input-icon-start relative-position q-mb-md">
      <span class="input-icon-addon fs-16 text-gray-9">
        <i class="ti ti-calendar"></i>
      </span>
      <input
        type="text"
        class="form-control date-range bookingrange"
        ref="dateRangeInput"
        placeholder="Search Product"
      />
    </div>
  </div>
  <!-- End Row 1 Welcome-->
  <!-- Alert Low Stock -->
  <div class="alert bg-orange-transparent alert-dismissible fade show q-pb-xs">
    <div>
      <span><i class="ti ti-info-circle fs-14 text-orange q-mr-sm"></i>Your Product </span> <span class="text-orange fw-semibold"> Apple Iphone 15 is running Low, </span> already below 5 Pcs., <a href="javascript:void(0);" class="link-orange text-decoration-underline fw-semibold" data-bs-toggle="modal" data-bs-target="#add-stock">Add Stock</a>
    </div>
    <span class="btn-close text-gray-4 text-body2" data-bs-dismiss="alert" aria-label="Close"><i class="ti ti-x"></i></span>
  </div>
  <!-- End Alert Low Stock -->
  <!-- Row 2 Sales Widgets-->
  <div class="row q-col-gutter-x-lg q-pb-xs">
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card bg-primary sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-white text-primary">
            <i class="ti ti-file-text fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-white q-mb-xs">Total Sales</p>
            <div class="row items-center flex-wrap q-gutter-sm">
              <h4 class="text-white">₱48,988,078</h4>
              <span class="badge badge-soft-primary"
                ><i class="ti ti-arrow-up me-1"></i>+22%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card bg-secondary sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-white text-secondary">
            <i class="ti ti-repeat fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-white q-mb-xs">Total Sales Return</p>
            <div class="row items-center flex-wrap q-gutter-sm">
              <h4 class="text-white">₱16,478,145</h4>
              <span class="badge badge-soft-danger"
                ><i class="ti ti-arrow-down me-1"></i>-22%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card bg-teal sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-white text-teal">
            <i class="ti ti-gift fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-white q-mb-xs">Total Purchase</p>
            <div class="row items-center flex-wrap q-gutter-sm">
              <h4 class="text-white">₱24,145,789</h4>
              <span class="badge badge-soft-success"
                ><i class="ti ti-arrow-up me-1"></i>+22%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card bg-info sale-widget flex-fill">
        <div class="card-body d-flex items-center">
          <span class="sale-icon bg-white text-info">
            <i class="ti ti-brand-pocket fs-24"></i>
          </span>
          <div class="q-ml-sm">
            <p class="text-white q-mb-xs">Total Purchase Return</p>
            <div class="row items-center flex-wrap q-gutter-sm">
              <h4 class="text-white">₱18,458,747</h4>
              <span class="badge badge-soft-success"
                ><i class="ti ti-arrow-up me-1"></i>+22%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Row 2 Sales Widgets-->
  <!-- Row 3 Summary Widget--> 
  <div class="row q-col-gutter-x-lg q-pb-xs">
    <!-- Profit -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div
            class="d-flex items-center justify-between q-mb-md q-pb-md border-bottom"
          >
            <div>
              <h4 class="q-mb-xs">₱8,458,798</h4>
              <p>Profit</p>
            </div>
            <span class="revenue-icon bg-cyan-transparent text-cyan">
              <i class="fa-solid fa-layer-group fs-16"></i>
            </span>
          </div>
          <div class="d-flex items-center justify-between">
            <p class="q-mb-none">
              <span class="fs-13 fw-bold text-success">+35%</span> vs Last Month
            </p>
            <router-link
              to="/reports/profit-and-loss"
              class="text-decoration-underline fs-13 fw-medium"
              >View All</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /Profit -->

    <!-- Invoice -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div
            class="d-flex items-center justify-between q-mb-md q-pb-md border-bottom"
          >
            <div>
              <h4 class="q-mb-xs">₱48,988,78</h4>
              <p>Invoice Due</p>
            </div>
            <span class="revenue-icon bg-teal-transparent text-teal">
              <i class="ti ti-chart-pie fs-16"></i>
            </span>
          </div>
          <div class="d-flex items-center justify-between">
            <p class="q-mb-none">
              <span class="fs-13 fw-bold text-success">+35%</span> vs Last Month
            </p>
            <router-link
              to="/reports/invoice-report"
              class="text-decoration-underline fs-13 fw-medium"
              >View All</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /Invoice -->

    <!-- Expenses -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div
            class="d-flex items-center justify-between q-mb-md q-pb-md border-bottom"
          >
            <div>
              <h4 class="q-mb-xs">₱8,980,097</h4>
              <p>Total Expenses</p>
            </div>
            <span class="revenue-icon bg-orange-transparent text-orange">
              <i class="ti ti-lifebuoy fs-16"></i>
            </span>
          </div>
          <div class="d-flex items-center justify-between">
            <p class="q-mb-none">
              <span class="fs-13 fw-bold text-success">+41%</span> vs Last Month
            </p>
            <router-link
              to="/expenses/expenses-list"
              class="text-decoration-underline fs-13 fw-medium"
              >View All</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /Expenses -->

    <!-- Returns -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div
            class="d-flex items-center justify-between q-mb-md q-pb-md border-bottom"
          >
            <div>
              <h4 class="q-mb-xs">₱78,458,798</h4>
              <p>Total Payment Returns</p>
            </div>
            <span class="revenue-icon bg-indigo-transparent text-indigo">
              <i class="ti ti-hash fs-16"></i>
            </span>
          </div>
          <div class="d-flex items-center justify-between">
            <p class="q-mb-none">
              <span class="fs-13 fw-bold text-danger">-20%</span> vs Last Month
            </p>
            <router-link
              to="/sales-report/sales-report"
              class="text-decoration-underline fs-13 fw-medium"
              >View All</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /Returns -->
  </div>
  <!-- Row 3 Daily Sales-->
  <div class="row q-col-gutter-x-lg">
    <div class="col-lg-8 col-sm-12 col-12 d-flex">
      <div class="card flex-fill">
        <div class="card-header d-flex justify-between items-center">
          <h5 class="card-title q-mb-none">Daily Sales</h5>
          <div class="graph-sets">

            <div class="dropdown dropdown-wraper">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                2024
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">2024</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">2023</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">2022</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div id="sales_charts"></div>
            <VueApexCharts
              type="bar"
              height="300"
              :options="dailyChartData.sline"
              :series="dailyChartData.series"
            ></VueApexCharts>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-sm-12 col-12 d-flex">
      <div class="card flex-fill">
        <div class="card-header d-flex justify-between items-center row wrap q-gutter-md">
          <div class="row items-center">
            <span class="title-icon bg-soft-pink fs-16 q-mr-sm"><i class="ti ti-box"></i></span>
            <h5 class="card-title q-mb-none">Top Selling Products</h5>
          </div>
          <div class="dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-sm btn-white" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="ti ti-calendar me-1"></i>Today
            </a>
            <ul class="dropdown-menu p-3">
              <li>
                <a href="javascript:void(0);" class="dropdown-item">Today</a>
              </li>
              <li>
                <a href="javascript:void(0);" class="dropdown-item">Weekly</a>
              </li>
              <li>
                <a href="javascript:void(0);" class="dropdown-item">Monthly</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-body sell-product">
          <div class="d-flex items-center justify-between border-bottom">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-01.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Charger Cable - Lighting</a></h6>
                <div class="d-flex items-center item-list">			
                  <p>₱187</p>
                  <p>247+ Sales</p>
                </div>
              </div>
            </div>
            <span class="badge bg-outline-success badge-xs row items-center"><i class="ti ti-arrow-up-left me-1"></i>25%</span>
          </div>
          <div class="d-flex items-center justify-between border-bottom">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-16.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Yves Saint Eau De Parfum</a></h6>
                <div class="d-flex items-center item-list">			
                  <p>₱145</p>
                  <p>289+ Sales</p>
                </div>
              </div>
            </div>
            <span class="badge bg-outline-success badge-xs row items-center"><i class="ti ti-arrow-up-left me-1"></i>25%</span>
          </div>
          <div class="d-flex items-center justify-between border-bottom">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-03.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Apple Airpods 2</a></h6>
                <div class="d-flex items-center item-list">			
                  <p>₱458</p>
                  <p>300+ Sales</p>
                </div>
              </div>
            </div>
            <span class="badge bg-outline-success badge-xs row items-center"><i class="ti ti-arrow-up-left me-1"></i>25%</span>
          </div>
          <div class="d-flex items-center justify-between border-bottom">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-04.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Vacuum Cleaner</a></h6>
                <div class="d-flex items-center item-list">			
                  <p>₱139</p>
                  <p>225+ Sales</p>
                </div>
              </div>
            </div>
            <span class="badge bg-outline-danger badge-xs row items-center"><i class="ti ti-arrow-down-left me-1"></i>21%</span>
          </div>
          <div class="d-flex items-center justify-between">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-05.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Samsung Galaxy S21 Fe 5g</a></h6>
                <div class="d-flex items-center item-list">			
                  <p>₱898</p>
                  <p>365+ Sales</p>
                </div>
              </div>
            </div>
            <span class="badge bg-outline-success badge-xs row items-center"><i class="ti ti-arrow-up-left me-1"></i>25%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Row 2 Daily Sales-->
  <!-- Row 3 Monthly Sales-->
  <div class="row q-col-gutter-x-lg">
    <div class="col-lg-8 col-sm-12 col-12 d-flex">
      <div class="card flex-fill">
        <div class="card-header d-flex justify-between items-center">
          <h5 class="card-title q-mb-none">Monthly Sales</h5>
          <div class="graph-sets">

            <div class="dropdown dropdown-wraper">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                2025
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">2025</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">2024</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">2023</a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">2022</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div id="sales_charts"></div>
            <VueApexCharts
              type="bar"
              height="300"
              :options="monthlyChartData.sline"
              :series="monthlyChartData.series"
            ></VueApexCharts>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-sm-12 col-12 d-flex">
      <div class="card flex-fill">
        <div class="card-header d-flex justify-between items-center row wrap q-gutter-md">
          <div class="row items-center">
            <span class="title-icon bg-soft-danger fs-16 q-mr-sm"><i class="ti ti-alert-triangle"></i></span>
            <h5 class="card-title q-mb-none">Low Stock Products</h5>
          </div>								
          <router-link to="/inventory/low-stocks" class="fs-13 fw-medium text-decoration-underline">View All</router-link>
        </div>
        <div class="card-body">
          <div class="d-flex items-center justify-between q-mb-md">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-06.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Dell XPS 13</a></h6>
                <p class="fs-13">ID : #665814</p>
              </div>
            </div>
            <div class="text-right">
              <p class="fs-13 q-mb-xs">Instock</p>
              <h6 class="text-orange fw-medium">08</h6>
            </div>
          </div>
          <div class="d-flex items-center justify-between q-mb-md">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-07.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Vacuum Cleaner Robot</a></h6>
                <p class="fs-13">ID : #940004</p>
              </div>
            </div>
            <div class="text-right">
              <p class="fs-13 q-mb-xs">Instock</p>
              <h6 class="text-orange fw-medium">14</h6>
            </div>
          </div>
          <div class="d-flex items-center justify-between q-mb-md">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-08.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">KitchenAid Stand Mixer</a></h6>
                <p class="fs-13">ID : #325569</p>
              </div>
            </div>
            <div class="text-right">
              <p class="fs-13 q-mb-xs">Instock</p>
              <h6 class="text-orange fw-medium">21</h6>
            </div>
          </div>
          <div class="d-flex items-center justify-between q-mb-md">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-09.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Levi's Trucker Jacket</a></h6>
                <p class="fs-13">ID : #124588</p>
              </div>
            </div>
            <div class="text-right">
              <p class="fs-13 q-mb-xs">Instock</p>
              <h6 class="text-orange fw-medium">12</h6>
            </div>
          </div>
          <div class="d-flex items-center justify-between q-mb-none">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-10.jpg" alt="img">
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs"><a href="javascript:void(0);">Lay's Classic</a></h6>
                <p class="fs-13">ID : #365586</p>
              </div>
            </div>
            <div class="text-right">
              <p class="fs-13 q-mb-xs">Instock</p>
              <h6 class="text-orange fw-medium">10</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--End Row 3 Monthly Sales-->
  </div>
</template>

<script setup lang="ts">
  import BaseTable from 'src/components/BaseTable.vue';
  import VueApexCharts from 'vue3-apexcharts';

  const columns = [
    { name: 'id', label: '#', align: 'left' as const, field: 'id', sortable: true },
    { name: 'product', label: 'Product Name', align: 'left' as const, field: 'product', sortable: true },
    { name: 'price', label: 'Price', align: 'left' as const, field: 'price', sortable: true },
  
  ];
  const rows = [
    {
        id: 1,
        product: { name: 'Lenovo IdeaPad 3', img: '/app/img/products/laptop.png' },
        price: "₱12500"
    },
    {
        id: 2,
        product: { name: 'Apple MacBook Pro', img: '/app/img/products/stock-img-06.png' },
        price: "₱45000"
    },
    {
        id: 3,
        product: { name: 'Samsung Galaxy Book', img: '/app/img/products/stock-img-01.png' },
        price: "₱32000"
    },
    {
        id: 4,
        product: { name: 'HP Pavilion 15', img: '/app/img/products/stock-img-03.png' },
        price: "₱28000"
    },
    {
        id: 5,
        product: { name: 'Asus Vivobook', img: '/app/img/products/stock-img-04.png' },
        price: "₱22000"
    }
  ]
  const dailyChartData = {
    series: [{
      name: 'Sales Breakdown',
      type: 'column',
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }, {
      name: 'Transaction Count',
      type: 'line',
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }],
    sline: {
        chart: {
            height: 350,
            type: 'line',
        },
        stroke: {
            width: [0, 4]
        },
        title: {
            text: '',
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        labels: ['01 Oct 2025', '02 Oct 2025', '03 Oct 2025', '04 Oct 2025', '05 Oct 2025', '06 Oct 2025', '07 Oct 2025', '08 Oct 2025', '09 Oct 2025', '10 Oct 2025', '11 Oct 2025', '12 Oct 2025'],
        yaxis: [{
            title: {
                text: '',
            },
            }, {
            opposite: true,
            title: {
                text: ''
            }
        }]
    }
  }
  const monthlyChartData = {
    series: [{
        name: 'Sales Breakdown',
        type: 'column',
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 0, 0]
    }, {
        name: 'Transaction Count',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 0, 0]
    }],

    sline: {
        chart: {
            height: 350,
            type: 'line',
        },
        colors: ['#FE9F43', '#ADD8E6'],
        stroke: {
            width: [0, 4]
        },
        title: {
            text: '',
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        yaxis: [{
            title: {
                text: '',
            },
            }, {
            opposite: true,
            title: {
                text: ''
            }
      }]
    }
  }            
</script>
