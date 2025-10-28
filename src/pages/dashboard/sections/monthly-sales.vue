<template>
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
          <ApexChart
            type="bar"
            height="300"
            :options="monthlyChartData.sline"
            :series="monthlyChartData.series"
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
            <span class="title-icon bg-soft-danger fs-16 q-mr-sm"
              ><i class="ti ti-alert-triangle"></i
            ></span>
            <h5 class="card-title q-mb-none">Low Stock Products</h5>
          </div>
          <router-link
            to="/inventory/low-stocks"
            class="fs-13 fw-medium text-decoration-underline"
            >View All</router-link
          >
        </div>
        <div class="card-body">
          <div class="d-flex items-center justify-between q-mb-md">
            <div class="d-flex items-center">
              <a href="javascript:void(0);" class="avatar avatar-lg">
                <img src="/app/img/products/product-06.jpg" alt="img" />
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs">
                  <a href="javascript:void(0);">Dell XPS 13</a>
                </h6>
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
                <img src="/app/img/products/product-07.jpg" alt="img" />
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs">
                  <a href="javascript:void(0);">Vacuum Cleaner Robot</a>
                </h6>
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
                <img src="/app/img/products/product-08.jpg" alt="img" />
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs">
                  <a href="javascript:void(0);">KitchenAid Stand Mixer</a>
                </h6>
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
                <img src="/app/img/products/product-09.jpg" alt="img" />
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs">
                  <a href="javascript:void(0);">Levi's Trucker Jacket</a>
                </h6>
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
                <img src="/app/img/products/product-10.jpg" alt="img" />
              </a>
              <div class="q-ml-sm">
                <h6 class="fw-bold q-mb-xs">
                  <a href="javascript:void(0);">Lay's Classic</a>
                </h6>
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
const monthlyChartData = {
  series: [
    {
      name: "Sales Breakdown",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 0, 0],
    },
    {
      name: "Transaction Count",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 0, 0],
    },
  ],

  sline: {
    chart: {
      height: 350,
      type: "line",
    },
    colors: ["#FE9F43", "#ADD8E6"],
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
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
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
