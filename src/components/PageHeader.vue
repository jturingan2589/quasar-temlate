<template>
  <div class="page-header">
    <!-- Title + Subtitle -->
    <div class="add-item d-flex">
      <div class="page-title">
        <h4 class="fw-bold">{{ title }}</h4>
        <h6 v-if="subtitle">{{ subtitle }}</h6>
      </div>
    </div>

    <!-- Action Icons -->
    <ul class="table-top-head">
      <li
        v-show="hasPermission(`${a.page}_${a.action}`)"
        v-for="(a, index) in actions"
        :key="index"
      >
        <a :title="a.tooltip" @click="$emit(a.event)">
          <template v-if="a.iconType === 'img'">
            <img :src="a.icon" :alt="a.tooltip" />
          </template>
          <template v-else>
            <i :class="a.icon"></i>
          </template>
        </a>
      </li>
      <li>
        <a @click="$emit('reload')" title="Refresh"
          ><i class="ti ti-refresh"></i
        ></a>
      </li>
      <li>
        <a title="Collapse" @click="toggleHeader">
          <i class="ti ti-chevron-up"></i>
        </a>
      </li>
    </ul>

    <!-- Default Slot for Buttons -->
    <div class="d-flex">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasPermission } from "src/composable/useAuth";

interface Action {
  icon: string; // e.g. "/app/img/icons/pdf.svg" or "ti ti-refresh"
  iconType?: "img" | "icon"; // default = "icon"
  tooltip: string;
  event: string; // emitted event name
  action: string; // for access permission
  page: string;
}

const props = defineProps<{
  title: string;
  subtitle?: string;
  actions?: Action[];
}>();

const toggleHeader = () => {
  document.getElementById("collapse-header")?.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};
</script>
