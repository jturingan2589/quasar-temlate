<template>
  <div class="row q-col-gutter-x-lg">
    <div class="col-12 col-md-6">
      <div class="card flex-fill">
        <div
          class="card-header d-flex justify-between items-center row q-gutter-md wrap"
        >
          <div class="row items-center">
            <span class="title-icon bg-soft-orange fs-16 q-mr-sm"
              ><i class="ti ti-wallet"></i
            ></span>
            <h5 class="card-title q-mb-none">Payment Breakdown</h5>
          </div>
          <div class="dropdown">
            <a
              href="javascript:void(0);"
              class="dropdown-toggle btn btn-sm btn-white d-flex items-center"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="ti ti-calendar me-1"></i>Weekly
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
        <div class="card-body">
          <div class="row q-mb-lg">
            <div class="col-lg-8 col-12">
              <div class="items-center">
                <ApexChart
                  height="400"
                  width="320"
                  type="donut"
                  :options="chartOptions"
                  :series="series_category"
                ></ApexChart>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div
                v-for="(cat, index) in categories"
                :key="index"
                class="category-item"
                :class="cat.class"
              >
                <p class="fs-13 q-mb-xs">{{ cat.name }}</p>
                <h2 class="d-flex items-center">
                  {{ cat.sales }}
                  <span class="fs-13 fw-normal text-default q-ml-xs"
                    >Sales</span
                  >
                </h2>
              </div>

              <!-- No data fallback -->
              <div
                v-if="!categories.length"
                class="text-center q-mt-md text-grey"
              >
                No data found
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="card flex-fill">
        <div
          class="card-header d-flex justify-between items-center row q-gutter-md wrap"
        >
          <div class="row items-center">
            <span class="title-icon bg-soft-orange fs-16 q-mr-sm"
              ><i class="ti ti-trophy"></i
            ></span>
            <h5 class="card-title q-mb-none">Category Sales Breakdown</h5>
          </div>
          <div class="dropdown">
            <a
              href="javascript:void(0);"
              class="dropdown-toggle btn btn-sm btn-white d-flex items-center"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="ti ti-calendar me-1"></i>Weekly
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
        <div class="card-body">
          <div class="items-center">
            <ApexChart
              type="pie"
              height="300"
              :options="{
                labels: ['Electronics', 'Sports', 'Lifestyles'],
                legend: { position: 'right' },
                fill: {
                  // type: 'gradient',
                },
              }"
              :series="[698, 545, 456]"
            ></ApexChart>
          </div>
          <h6 class="q-mb-sm">Category Statistics</h6>
          <div class="border br-8">
            <div
              class="d-flex items-center justify-between border-bottom q-pa-sm"
            >
              <p class="d-inline-flex items-center q-mb-none">
                <i
                  class="ti ti-square-rounded-filled text-indigo fs-8 q-mr-sm"
                ></i
                >Total Number Of Categories
              </p>
              <h5>698</h5>
            </div>
            <div class="d-flex items-center justify-between q-pa-sm">
              <p class="d-inline-flex items-center q-mb-none">
                <i
                  class="ti ti-square-rounded-filled text-orange fs-8 q-mr-sm"
                ></i
                >Total Number Of Products
              </p>
              <h5>7899</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ✅ Category data
const categories = ref([
  { name: "Cash", sales: 698, class: "category-primary" },
  { name: "QR", sales: 545, class: "category-orange" },
  { name: "Card", sales: 456, class: "category-secondary" },
]);

// ✅ Extract data for the chart
const series_category = categories.value.map((c) => c.sales);
const labels_category = categories.value.map((c) => c.name);

// ✅ ApexCharts options
const chartOptions = {
  chart: {
    type: "donut",
  },
  labels_category,
  legend: {
    position: "top",
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val.toFixed(1)}%`,
  },
  colors: ["#3b82f6", "#f97316", "#64748b"], // blue, orange, gray
  fill: {
    //type: "gradient",
  },
  labels: ["Cash", "QR", "Card"],
  plotOptions: {
    pie: {
      donut: {
        size: "60%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total Sales",
            formatter: () =>
              "₱" + series_category.reduce((a, b) => a + b, 0).toLocaleString(),
          },
        },
      },
    },
  },
};
</script>

---

<style scoped>
.category-primary {
  background: #eff6ff;
  border-radius: 8px;
}
.category-orange {
  background: #fff7ed;
  border-radius: 8px;
}
.category-secondary {
  background: #f1f5f9;
  border-radius: 8px;
}
</style>
