<template>
  <div class="main-wrapper" :class="posWrapperClass">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// ✅ Compute dynamic class for POS wrapper
const posWrapperClass = computed(() => {
  switch (route.path) {
    case "/pos/pos-1":
      return "pos-five";
    case "/pos/pos-5":
      return "pos-three pos-four";
    case "/pos/pos-3":
      return "pos-two";
    default:
      return "";
  }
});

// ✅ Add/remove class from <body> based on route
const updateBodyClass = (path: string) => {
  if (path === "/pos/pos-2" || path === "/pos/pos-3") {
    document.body.classList.add("pos-page");
  } else {
    document.body.classList.remove("pos-page");
  }
};

// Watch for route changes
watch(
  () => route.path,
  (newPath) => {
    updateBodyClass(newPath);
  },
  { immediate: true },
);

// Cleanup when component is destroyed
onBeforeUnmount(() => {
  document.body.classList.remove("pos-page");
});
</script>
