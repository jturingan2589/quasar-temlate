<template>
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
          <ApexChart
            type="bar"
            height="300"
            :options="dailyChartData.sline"
            :series="dailyChartData.series"
          ></ApexChart>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-sm-12 col-12 d-flex">
      <div class="card flex-fill">
        <div
          class="card-header d-flex justify-between items-center row wrap q-gutter-md"
        >
          <div class="row items-center">
            <span class="title-icon bg-soft-pink fs-16 q-mr-sm"
              ><i class="ti ti-box"></i
            ></span>
            <h5 class="card-title q-mb-none">Top Selling Products</h5>
          </div>
          <div class="dropdown">
            <a
              href="javascript:void(0);"
              class="dropdown-toggle btn btn-sm btn-white"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="ti ti-calendar q-mr-xs"></i>Today
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
          <div
            v-if="productList.length > 0"
            v-for="(product, index) in productList"
            :key="index"
            class="d-flex items-center justify-between"
            :class="{ 'border-bottom': index < productList.length - 1 }"
          >
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img :src="product.image" :alt="product.name" />
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs">
                  <a href="javascript:void(0);">{{ product.name }}</a>
                </h6>
                <div class="d-flex items-center item-list">
                  <p>₱{{ product.price }}</p>
                  <p>{{ product.sales }}+ Sales</p>
                </div>
              </div>
            </div>

            <span
              class="badge badge-xs row items-center"
              :class="
                product.trend === 'up'
                  ? 'bg-outline-success'
                  : 'bg-outline-danger'
              "
            >
              <i
                class="q-mr-xs"
                :class="
                  product.trend === 'up'
                    ? 'ti ti-arrow-up-left'
                    : 'ti ti-arrow-down-left'
                "
              ></i>
              {{ product.changePercent }}%
            </span>
          </div>

          <!-- 🚫 No Data Found -->
          <div v-else class="text-center q-pa-lg text-grey">
            <i class="ti ti-info-circle q-mr-sm text-body1"></i>
            No data found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const productList = [
  {
    name: "Charger Cable - Lighting",
    price: 187,
    sales: 247,
    changePercent: 25,
    trend: "up",
    image: "/app/img/products/product-01.jpg",
  },
  {
    name: "Yves Saint Eau De Parfum",
    price: 145,
    sales: 289,
    changePercent: 25,
    trend: "up",
    image: "/app/img/products/product-16.jpg",
  },
  {
    name: "Apple Airpods 2",
    price: 458,
    sales: 300,
    changePercent: 25,
    trend: "up",
    image: "/app/img/products/product-03.jpg",
  },
  {
    name: "Vacuum Cleaner",
    price: 139,
    sales: 225,
    changePercent: 21,
    trend: "down",
    image: "/app/img/products/product-04.jpg",
  },
  {
    name: "Samsung Galaxy S21 Fe 5g",
    price: 898,
    sales: 365,
    changePercent: 25,
    trend: "up",
    image: "/app/img/products/product-05.jpg",
  },
];
const dailyChartData = {
  series: [
    {
      name: "Sales Breakdown",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    },
    {
      name: "Transaction Count",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
  ],
  sline: {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    fill: {
      type: "gradient",
    },
    labels: [
      "01 Oct 2025",
      "02 Oct 2025",
      "03 Oct 2025",
      "04 Oct 2025",
      "05 Oct 2025",
      "06 Oct 2025",
      "07 Oct 2025",
      "08 Oct 2025",
      "09 Oct 2025",
      "10 Oct 2025",
      "11 Oct 2025",
      "12 Oct 2025",
    ],
    yaxis: [
      {
        title: {
          text: "",
        },
      },
      {
        opposite: true,
        title: {
          text: "",
        },
      },
    ],
  },
};
</script>
