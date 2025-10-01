<template>
  <div :class="['sidebar', sidebarClass]" id="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo active">
      <router-link to="/dashboard/" class="logo logo-normal">
        <img src="/app/img/logo.svg" alt="Img" />
      </router-link>
      <router-link to="/dashboard/" class="logo logo-white">
        <img src="/app/img/logo-white.svg" alt="Img" />
      </router-link>
      <router-link to="/dashboard/" class="logo-small">
        <img src="/app/img/logo-small.png" alt="Img" />
      </router-link>
      <a id="toggle_btn" href="javascript:void(0);" @click="toggleSidebar">
        <i class="ti ti-chevrons-left"></i>
      </a>
    </div>

    <!-- Profile -->
    <div class="modern-profile p-3 pb-0">
      <div class="text-center rounded bg-light p-3 mb-4 user-profile">
        <div class="avatar avatar-lg online mb-3">
          <img
            src="/app/img/customer/customer15.jpg"
            alt="Img"
            class="img-fluid rounded-circle"
          />
        </div>
        <h6 class="fs-14 fw-bold mb-1">Adrian Herman</h6>
        <p class="fs-12 mb-0">System Admin</p>
      </div>
      <div class="sidebar-nav mb-3">
        <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified bg-transparent">
          <li class="nav-item">
            <a class="nav-link active border-0" href="#">Menu</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link border-0" to="/application/chat">Chats</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link border-0" to="/application/email">Inbox</router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sidebar Header -->
    <div class="sidebar-header p-3 pb-0 pt-2">
      <div class="text-center rounded bg-light p-2 mb-4 sidebar-profile d-flex align-items-center">
        <div class="avatar avatar-md online">
          <img
            src="/app/img/customer/customer15.jpg"
            alt="Img"
            class="img-fluid rounded-circle"
          />
        </div>
        <div class="text-start sidebar-profile-info ms-2">
          <h6 class="fs-14 fw-bold mb-1">Adrian Herman</h6>
          <p class="fs-12">System Admin</p>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between menu-item mb-3">
        <router-link to="/dashboard/admin-dashboard" class="btn btn-sm btn-icon bg-light">
          <i class="ti ti-layout-grid-remove"></i>
        </router-link>
        <router-link to="/application/chat" class="btn btn-sm btn-icon bg-light">
          <i class="ti ti-brand-hipchat"></i>
        </router-link>
        <router-link to="/application/email" class="btn btn-sm btn-icon bg-light">
          <i class="ti ti-message"></i>
        </router-link>
        <div class="notification-item">
          <router-link to="/activities" class="btn btn-sm btn-icon bg-light position-relative">
            <i class="ti ti-bell"></i>
            <span class="notification-status-dot"></span>
          </router-link>
        </div>
        <router-link to="/settings/general-settings" class="btn btn-sm btn-icon bg-light me-0">
          <i class="ti ti-settings"></i>
        </router-link>
      </div>
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
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import { useRoute } from "vue-router"
import simplebar from "simplebar-vue"
import "simplebar-vue/dist/simplebar.min.css"
import SidebarMenu from "./SidebarMenu.vue"

const sidebarClass = ref("")
const route = useRoute()

// ✅ Should hide sidebar?
const shouldHide = (path: string): boolean => {
  return ["/pos/pos-1", "/pos/pos-2", "/pos/pos-3", "/pos/pos-4", "/pos/pos-5"].some((p) =>
    path.startsWith(p)
  )
}

// ✅ Watch route changes
watch(
  () => route.path,
  (newPath) => {
    sidebarClass.value = shouldHide(newPath) ? "d-none" : ""
  },
  { immediate: true }
)

// ✅ Sidebar toggle
const toggleSidebar = () => {
  document.body.classList.toggle("mini-sidebar")
}

// ✅ Helpers
const isElementVisible = (el: HTMLElement | null) =>
  !!el && (el.offsetWidth > 0 || el.offsetHeight > 0)

const slideDownSubmenu = () => {
  document.querySelectorAll<HTMLElement>(".subdrop").forEach((el) => {
    const submenu = el.nextElementSibling as HTMLElement | null
    if (submenu?.tagName.toLowerCase() === "ul") {
      submenu.style.display = "block"
      submenu.classList.remove("d-none")
      submenu.classList.add("d-block")
    }
  })
}

const slideUpSubmenu = () => {
  document.querySelectorAll<HTMLElement>(".subdrop").forEach((el) => {
    const submenu = el.nextElementSibling as HTMLElement | null
    if (submenu?.tagName.toLowerCase() === "ul") {
      submenu.style.display = "none"
      submenu.classList.remove("d-block")
      submenu.classList.add("d-none")
    }
  })
}

// ✅ Mouseover logic
const handleMouseover = (e: MouseEvent) => {
  const body = document.body
  const toggleBtn = document.getElementById("toggle_btn")

  if (body.classList.contains("mini-sidebar") && isElementVisible(toggleBtn)) {
    const target = (e.target as HTMLElement).closest(".sidebar, .header-left")
    if (target) {
      body.classList.add("expand-menu")
      slideDownSubmenu()
    } else {
      body.classList.remove("expand-menu")
      slideUpSubmenu()
    }
    e.preventDefault()
  }
}

onMounted(() => {
  document.addEventListener("mouseover", handleMouseover)
})

onBeforeUnmount(() => {
  document.removeEventListener("mouseover", handleMouseover)
})
</script>
