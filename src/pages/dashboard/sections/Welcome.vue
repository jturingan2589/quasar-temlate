<template>
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
</template>
