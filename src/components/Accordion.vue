<template>
  <div class="accordions-items-seperate">
    <div class="accordion-item q-mb-md">
      <q-expansion-item expand-separator v-model="isExpanded">
        <!-- 👇 Custom Header -->
        <template #header>
          <div class="flex items-center justify-between full-width">
            <div class="accordion-header" id="headingSpacingFour">
              <h5 class="d-flex items-center">
                <i v-if="icon" :class="[icon, 'text-primary', 'q-mr-sm']"></i>
                <span>{{ title }}</span>
              </h5>
            </div>

            <!-- Optional badge or right slot -->
            <q-badge v-if="badge" color="secondary" align="top">
              {{ badge }}
            </q-badge>
          </div>
        </template>

        <!-- 👇 Expansion content -->
        <div class="accordion-body border-top">
          <slot />
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: string | number;
  expanded?: boolean;
}

const props = defineProps<Props>();
const isExpanded = ref(props.expanded ?? false);
</script>

<style scoped></style>
