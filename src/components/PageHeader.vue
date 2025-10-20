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
    <ul class="table-top-head" v-if="actions && actions.length">
      <li v-for="(action, index) in actions" :key="index">
        <a 
          :title="action.tooltip" 
          @click="$emit(action.event)"
        >
          <template v-if="action.iconType === 'img'">
            <img :src="action.icon" :alt="action.tooltip" />
          </template>
          <template v-else>
            <i :class="action.icon"></i>
          </template>
        </a>
      </li>
    </ul>

    <!-- Default Slot for Buttons -->
    <div class=" d-flex">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">

  interface Action {
    icon: string;       // e.g. "/app/img/icons/pdf.svg" or "ti ti-refresh"
    iconType?: "img" | "icon"; // default = "icon"
    tooltip: string;
    event: string;      // emitted event name
  }

  const props = defineProps<{
    title: string;
    subtitle?: string;
    actions?: Action[];
  }>();
  
</script>
