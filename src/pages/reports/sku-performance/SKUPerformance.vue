<template>
  <PageHeader title="SKU Performance" subtitle="Manage your SKU Performance" />
  <div class="row q-col-gutter-x-lg q-pb-xs">
    <!-- Top 20% SKUs GMV -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div class="d-flex items-center justify-between">
            <div>
              <h4 class="q-mb-xs">8,458,798</h4>
              <p>Top 20% SKUs (GMV)</p>
            </div>
            <span class="revenue-icon bg-cyan-transparent text-cyan">
              <i class="fa fa-money-bill-1-wave fs-16"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div class="d-flex items-center justify-between">
            <div>
              <h4 class="q-mb-xs">8,458,798</h4>
              <p>Top 20% SKUs (Qty)</p>
            </div>
            <span class="revenue-icon bg-cyan-transparent text-cyan">
              <i class="ti ti-chart-pie fs-16"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div class="d-flex items-center justify-between">
            <div>
              <h4 class="q-mb-xs">₱8,980,097</h4>
              <p>Bottom 20% SKUs (GMV)</p>
            </div>
            <span class="revenue-icon bg-orange-transparent text-orange">
              <i class="ti ti-lifebuoy fs-16"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div class="d-flex items-center justify-between">
            <div>
              <h4 class="q-mb-xs">25,000</h4>
              <p>Bottom 20% SKUs (Qty)</p>
            </div>
            <span class="revenue-icon bg-indigo-transparent text-indigo">
              <i class="ti ti-hash fs-16"></i>
            </span>
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
      <div></div>
      <ul class="table-top-head">
        <li class="me-2">
          <ActionButton
            page="sku_performance"
            action="download"
            icon="/app/img/icons/pdf.svg"
            iconType="img"
            tooltip="Download PDF"
            @click="exportToPdf"
          />
        </li>
        <li class="me-2">
          <ActionButton
            page="sku_performance"
            action="download"
            icon="/app/img/icons/excel.svg"
            iconType="img"
            tooltip="Download Excel"
            @click="exportToExcel"
          />
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Print">
            <i class="ti ti-printer"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <q-tabs
        v-model="tab"
        dense
        class="bg-white text-grey-8"
        active-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="topGmv" label="Top 20% by GMV" />
        <q-tab name="topQty" label="Top 20% by Quantity" />
        <q-tab name="bottomGmv" label="Bottom 20% by GMV" />
        <q-tab name="bottomQty" label="Bottom 20% by Quantity" />
      </q-tabs>

      <q-separator class="q-my-md" />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="topQty" class="q-pa-md">
          <BaseTable
            :rows="topQtyRows"
            :columns="quantityColumns"
            v-model:pagination="pagination"
          />
        </q-tab-panel>

        <q-tab-panel name="topGmv" class="q-pa-md">
          <BaseTable
            :rows="topGmvRows"
            :columns="gmvColumns"
            v-model:pagination="pagination"
          />
        </q-tab-panel>

        <q-tab-panel name="bottomQty" class="q-pa-md">
          <BaseTable
            :rows="bottomQtyRows"
            :columns="quantityColumns"
            v-model:pagination="pagination"
          />
        </q-tab-panel>

        <q-tab-panel name="bottomGmv" class="q-pa-md">
          <BaseTable
            :rows="bottomGmvRows"
            :columns="gmvColumns"
            v-model:pagination="pagination"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { gmvColumns, quantityColumns } from "./config/table-columns";
import {
  bottomGmvRows,
  bottomQtyRows,
  topGmvRows,
  topQtyRows,
} from "./sampledata";
const exportToExcel = (): void => {};
const exportToPdf = (): void => {};
const reloadData = (): void => {};

const tab = ref("topGmv");

const pagination = ref({
  sortBy: "SKU", // default column
  descending: false,
  page: 1,
  rowsPerPage: 10, // default rows per page
});
</script>
