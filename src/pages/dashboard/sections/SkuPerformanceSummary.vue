<template>
  <div class="row q-col-gutter-x-lg q-pb-xs">
    <!-- Top 20% SKUs GMV -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div
            class="d-flex items-center justify-between q-mb-md q-pb-md border-bottom"
          >
            <div>
              <h4 class="q-mb-xs">₱8,458,798</h4>
              <p>Top 20% SKUs (GMV)</p>
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
              to="/reports/sku-performance?tab=top_gmv"
              class="text-decoration-underline fs-13 fw-medium"
              >View All</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /Top 20% SKUs GMV -->

    <!-- Top 20% SKU Count -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div
            class="d-flex items-center justify-between q-mb-md q-pb-md border-bottom"
          >
            <div>
              <h4 class="q-mb-xs">8,988</h4>
              <p>Top 20% SKUs (Count)</p>
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
              to="/reports/sku-performance?tab=top_count"
              class="text-decoration-underline fs-13 fw-medium"
            >
              View All
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- /Top 20% SKU Count -->

    <!-- Bottom 20% SKU GMV -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div
            class="d-flex items-center justify-between q-mb-md q-pb-md border-bottom"
          >
            <div>
              <h4 class="q-mb-xs">₱8,980,097</h4>
              <p>Bottom 20% SKUs (GMV)</p>
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
              to="/reports/sku-performance?tab=bottom_gmv"
              class="text-decoration-underline fs-13 fw-medium"
            >
              View All
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- /Bottom 20% SKU GMV -->

    <!-- Bottom 20% SKUs (Count) -->
    <div class="col-lg-3 col-sm-6 col-12 d-flex">
      <div class="card revenue-widget flex-fill">
        <div class="card-body">
          <div
            class="d-flex items-center justify-between q-mb-md q-pb-md border-bottom"
          >
            <div>
              <h4 class="q-mb-xs">25,000</h4>
              <p>Bottom 20% SKUs (Count)</p>
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
              to="/reports/sku-performance?tab=bottom_count"
              class="text-decoration-underline fs-13 fw-medium"
            >
              View All
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- /Bottom 20% SKUs (Count) -->
  </div>
</template>
