<template>
  <Suspense>
    <template #default>
      <Welcome />
    </template>
    <template #fallback>
      <q-skeleton type="rect" height="200px" />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <AlertStock />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <SalesSummary />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <SkuPerformanceSummary />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <DailySales />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <MonthlySales />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <Category />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <TransactionCountPerHour />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent, Suspense } from "vue";
const Welcome = defineAsyncComponent(() => import("./sections/welcome.vue"));
const AlertStock = defineAsyncComponent(
  () => import("./sections/alert-stock.vue"),
);
const SalesSummary = defineAsyncComponent(
  () => import("./sections/sales-summary.vue"),
);
const SkuPerformanceSummary = defineAsyncComponent(
  () => import("./sections/sku-performance-summary.vue"),
);
const DailySales = defineAsyncComponent(
  () => import("./sections/daily-sales.vue"),
);
const MonthlySales = defineAsyncComponent(
  () => import("./sections/monthly-sales.vue"),
);
const Category = defineAsyncComponent(() => import("./sections/category.vue"));
const TransactionCountPerHour = defineAsyncComponent(
  () => import("./sections/transaction-count.vue"),
);
</script>
