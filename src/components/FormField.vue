<template>
  <div class="col-12 col-md-6">
    <label v-if="label" class="form-label">
      {{ label }}
      <span v-if="required" class="text-negative q-ml-xs">*</span>
    </label>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  required?: boolean;
}
defineProps<Props>();
</script>

<style scoped>
.text-caption {
  font-size: 0.9rem;
  color: #333;
}
</style>
