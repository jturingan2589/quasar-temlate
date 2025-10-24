<template>
  <div class="relative-inline q-mr-sm" ref="panelWrapper">
    <!-- Filter Icon with Badge -->
    <q-btn
      round
      dense
      flat
      :icon="icon"
      :loading="loading"
      @click.stop="togglePanel"
      :color="appliedFiltersCount > 0 ? 'primary' : 'grey-7'"
    >
      <q-badge v-if="appliedFiltersCount > 0" color="red" floating align="top">
        {{ appliedFiltersCount }}
      </q-badge>
    </q-btn>

    <!-- Mini Slide Panel -->
    <transition name="slide-fade">
      <q-card
        v-if="isPanelOpen"
        class="mini-panel q-pa-md"
        style="
          position: absolute;
          right: 0;
          top: 40px;
          width: 300px;
          z-index: 1000;
        "
      >
        <q-toolbar class="q-pa-none q-mb-sm">
          <q-toolbar-title class="text-h6">{{ title }}</q-toolbar-title>
          <q-btn flat round icon="close" dense @click="closePanel" />
        </q-toolbar>

        <q-separator />

        <!-- Slot for custom filter fields -->
        <div class="q-pa-sm">
          <slot name="fields" />
        </div>

        <q-separator class="q-my-sm" />

        <div class="row justify-end">
          <q-btn
            flat
            :disable="loading"
            label="Reset"
            color="negative"
            @click="onReset"
          />
          <q-btn
            flat
            :disable="loading"
            label="Apply"
            color="primary"
            class="q-ml-sm"
            @click="onApply"
          />
        </div>
      </q-card>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";

// Props
const { filters, title, icon } = defineProps({
  filters: { type: Object, required: true },
  title: { type: String, default: "Filters" },
  icon: { type: String, default: "filter_list" },
  loading: { type: Boolean, default: false },
});

// Emits
const emit = defineEmits(["apply", "reset"]);

// Local state
const isPanelOpen = ref(false);
const panelWrapper = ref<HTMLElement | null>(null);
const ignoreOutsideClick = ref(false);

// 🟢 Snapshot of filters when Apply is clicked
const appliedFilters = ref<Record<string, any>>({});

// Count only applied filters
const appliedFiltersCount = computed(() => {
  if (!appliedFilters.value) return 0;
  return Object.values(appliedFilters.value).filter(
    (val) => val !== null && val !== "",
  ).length;
});

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value;
}

function closePanel() {
  isPanelOpen.value = false;
}

function onReset() {
  emit("reset");
  appliedFilters.value = {}; // reset badge too
}

function onApply() {
  emit("apply");

  // 🟢 Save snapshot of current filters for the badge
  appliedFilters.value = { ...filters };

  ignoreOutsideClick.value = true;
  //isPanelOpen.value = false;

  nextTick(() => {
    ignoreOutsideClick.value = false;
  });
}

function handleClickOutside(event: MouseEvent) {
  if (!isPanelOpen.value || ignoreOutsideClick.value) return;
  const target = event.target as HTMLElement;
  if (
    panelWrapper.value &&
    !panelWrapper.value.contains(target) &&
    !target.closest(".q-menu")
  ) {
    isPanelOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.relative-inline {
  display: inline-block;
}

.mini-panel {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Smooth slide + fade animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
