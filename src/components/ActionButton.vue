<template>
  <a
    v-if="isAllowed"
    :title="tooltip"
    @click="$emit('click', $event)"
    class="cursor-pointer"
  >
    <template v-if="iconType === 'img'">
      <img :src="icon || ''" :alt="tooltip" />
    </template>
    <template v-else>
      <i :class="['ti', icon || '']"></i>
    </template>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { hasPermission } from "src/composable/useAuth";

interface Props {
  page: string;
  action: string;
  icon?: string;
  iconType?: "img" | "icon";
  tooltip: string;
}

const props = defineProps<Props>();

// Only render if user has permission
const isAllowed = computed(() =>
  hasPermission(`${props.page}_${props.action}`),
);

const { icon, iconType, tooltip } = props;
</script>
