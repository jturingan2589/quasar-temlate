<template>
  <div :class="['sidebar', sidebarClass]" id="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo active">
      <router-link to="/main/dashboard/" class="logo logo-normal">
        <img src="/app/img/logo.svg" alt="Img" />
      </router-link>
      <router-link to="/main/dashboard/" class="logo logo-white">
        <img src="/app/img/logo-white.svg" alt="Img" />
      </router-link>
      <router-link to="/main/dashboard/" class="logo-small">
        <img src="/app/img/logo-small.svg" alt="Img" />
      </router-link>
      <a id="toggle_btn" href="javascript:void(0);" @click="toggleSidebar">
        <i :class="iconClass"></i>
      </a>
    </div>

    <!-- Sidebar Inner -->
    <simplebar id="scrollbar" class="h-100">
      <div class="sidebar-inner slimscroll flex-fill">
        <div id="sidebar-menu" class="sidebar-menu">
          <SidebarMenu />
        </div>
      </div>
    </simplebar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute } from "vue-router";
import simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import SidebarMenu from "./SidebarMenu.vue";

const sidebarClass = ref("");
const route = useRoute();
const isCollapsed = ref(false); // ✅ track sidebar state

// ✅ computed icon class based on collapsed state
const iconClass = computed(() =>
  isCollapsed.value ? "ti ti-chevrons-right" : "ti ti-chevrons-left",
);

// ✅ Toggle sidebar
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  document.body.classList.toggle("mini-sidebar", isCollapsed.value);
};

// ✅ Should hide sidebar?
const shouldHide = (path: string): boolean => {
  return [
    "/pos/pos-1",
    "/pos/pos-2",
    "/pos/pos-3",
    "/pos/pos-4",
    "/pos/pos-5",
  ].some((p) => path.startsWith(p));
};

// ✅ Watch route changes
watch(
  () => route.path,
  (newPath) => {
    sidebarClass.value = shouldHide(newPath) ? "d-none" : "";
  },
  { immediate: true },
);

// ✅ Helpers
const isElementVisible = (el: HTMLElement | null) =>
  !!el && (el.offsetWidth > 0 || el.offsetHeight > 0);

const slideDownSubmenu = () => {
  document.querySelectorAll<HTMLElement>(".subdrop").forEach((el) => {
    const submenu = el.nextElementSibling as HTMLElement | null;
    if (submenu?.tagName.toLowerCase() === "ul") {
      submenu.style.display = "block";
      submenu.classList.remove("d-none");
      submenu.classList.add("d-block");
    }
  });
};

const slideUpSubmenu = () => {
  document.querySelectorAll<HTMLElement>(".subdrop").forEach((el) => {
    const submenu = el.nextElementSibling as HTMLElement | null;
    if (submenu?.tagName.toLowerCase() === "ul") {
      submenu.style.display = "none";
      submenu.classList.remove("d-block");
      submenu.classList.add("d-none");
    }
  });
};

// ✅ Mouseover logic
const handleMouseover = (e: MouseEvent) => {
  const body = document.body;
  const toggleBtn = document.getElementById("toggle_btn");

  if (body.classList.contains("mini-sidebar") && isElementVisible(toggleBtn)) {
    const target = (e.target as HTMLElement).closest(".sidebar, .header-left");
    if (target) {
      body.classList.add("expand-menu");
      slideDownSubmenu();
    } else {
      body.classList.remove("expand-menu");
      slideUpSubmenu();
    }
    e.preventDefault();
  }
};

onMounted(() => {
  document.addEventListener("mouseover", handleMouseover);
});

onBeforeUnmount(() => {
  document.removeEventListener("mouseover", handleMouseover);
});
</script>
