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
import BaseTable from "src/components/BaseTable.vue";
const Welcome = defineAsyncComponent(() => import("./sections/Welcome.vue"));
const AlertStock = defineAsyncComponent(
  () => import("./sections/AlertStock.vue"),
);
const SalesSummary = defineAsyncComponent(
  () => import("./sections/SalesSummary.vue"),
);
const SkuPerformanceSummary = defineAsyncComponent(
  () => import("./sections/SkuPerformanceSummary.vue"),
);
const DailySales = defineAsyncComponent(
  () => import("./sections/DailySales.vue"),
);
const MonthlySales = defineAsyncComponent(
  () => import("./sections/MonthlySales.vue"),
);
const Category = defineAsyncComponent(() => import("./sections/Category.vue"));
const TransactionCountPerHour = defineAsyncComponent(
  () => import("./sections/TransactionCountPerHour.vue"),
);
const columns = [
  {
    name: "id",
    label: "#",
    align: "left" as const,
    field: "id",
    sortable: true,
  },
  {
    name: "product",
    label: "Product Name",
    align: "left" as const,
    field: "product",
    sortable: true,
  },
  {
    name: "price",
    label: "Price",
    align: "left" as const,
    field: "price",
    sortable: true,
  },
];
const rows = [
  {
    id: 1,
    product: { name: "Lenovo IdeaPad 3", img: "/app/img/products/laptop.png" },
    price: "₱12500",
  },
  {
    id: 2,
    product: {
      name: "Apple MacBook Pro",
      img: "/app/img/products/stock-img-06.png",
    },
    price: "₱45000",
  },
  {
    id: 3,
    product: {
      name: "Samsung Galaxy Book",
      img: "/app/img/products/stock-img-01.png",
    },
    price: "₱32000",
  },
  {
    id: 4,
    product: {
      name: "HP Pavilion 15",
      img: "/app/img/products/stock-img-03.png",
    },
    price: "₱28000",
  },
  {
    id: 5,
    product: {
      name: "Asus Vivobook",
      img: "/app/img/products/stock-img-04.png",
    },
    price: "₱22000",
  },
];
</script>
