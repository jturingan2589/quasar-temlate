<template>
  <div class="card flex-fill">
    <div
      class="card-header d-flex justify-between items-center row q-gutter-md wrap"
    >
      <div class="row items-center">
        <span class="title-icon bg-soft-orange fs-16 q-mr-sm"
          ><i class="ti ti-activity"></i
        ></span>
        <h5 class="card-title q-mb-none">Hourly Transaction Trend</h5>
      </div>
    </div>
    <div class="card-body">
      <div class="items-center row q-mb-lg">
        <div class="col-12">
          <apexchart
            type="bar"
            :options="chartOptions"
            :series="chartSeries"
            height="350"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const transactionsPerHour = [
  { hour: "12 AM", count: 5 },
  { hour: "1 AM", count: 2 },
  { hour: "2 AM", count: 1 },
  { hour: "3 AM", count: 0 },
  { hour: "4 AM", count: 0 },
  { hour: "5 AM", count: 3 },
  { hour: "6 AM", count: 10 },
  { hour: "7 AM", count: 20 },
  { hour: "8 AM", count: 35 },
  { hour: "9 AM", count: 50 },
  { hour: "10 AM", count: 65 },
  { hour: "11 AM", count: 70 },
  { hour: "12 PM", count: 80 },
  { hour: "1 PM", count: 75 },
  { hour: "2 PM", count: 60 },
  { hour: "3 PM", count: 55 },
  { hour: "4 PM", count: 40 },
  { hour: "5 PM", count: 30 },
  { hour: "6 PM", count: 25 },
  { hour: "7 PM", count: 20 },
  { hour: "8 PM", count: 15 },
  { hour: "9 PM", count: 10 },
  { hour: "10 PM", count: 8 },
  { hour: "11 PM", count: 5 },
];
// Map for chart
const labels = transactionsPerHour.map((item) => item.hour);
const data = transactionsPerHour.map((item) => item.count);

// Series for ApexCharts
const chartSeries = ref([
  {
    name: "Transactions",
    data: data,
  },
]);

const chartOptions = ref({
  chart: {
    type: "bar",
    toolbar: { show: true },
  },
  plotOptions: {
    bar: { horizontal: false, columnWidth: "50%" },
  },
  fill: {
    type: "gradient",
  },
  dataLabels: { enabled: false },
  xaxis: { categories: labels, title: { text: "Hour of Day" } },
  yaxis: { title: { text: "Transaction Count" } },
  colors: ["#f97316"],
});
</script>
