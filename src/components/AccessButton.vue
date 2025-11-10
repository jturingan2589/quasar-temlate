<template>
  <q-btn
    v-if="isAllowed"
    :color="color"
    :icon="icon"
    :label="label"
    :flat="flat ?? false"
    :outline="outline ?? false"
    :dense="dense ?? false"
    @click="$emit('click', $event)"
  >
    <slot />
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { hasPermission } from "src/composable/useAuth";

interface Props {
  page: string;
  action: string;
  color?: string;
  icon?: string;
  label?: string;
  flat?: boolean;
  outline?: boolean;
  dense?: boolean;
}

const props = defineProps<Props>();

// ✅ Compute if the button is allowed
const isAllowed = computed(() =>
  hasPermission(`${props.page}_${props.action}`),
);
</script>
