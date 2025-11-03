<template>
  <!-- Header -->
  <div class="header">
    <div class="main-header">
      <!-- Logo -->
      <div class="header-left active">
        <router-link to="/main/dashboard/" class="logo logo-normal">
          <img src="/app/img/logo.svg" alt="" />
        </router-link>
        <router-link to="/main/dashboard/" class="logo logo-white">
          <img src="/app/img/logo-white.svg" alt="" />
        </router-link>
        <router-link to="/main/dashboard/" class="logo-small">
          <img src="/app/img/logo-small.png" alt="" />
        </router-link>
      </div>
      <!-- /Logo -->

      <q-btn id="mobile_btn" class="mobile_btn" flat @click="toggleMobileBtn">
        <span class="bar-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </q-btn>

      <!-- Header Menu -->
      <ul class="nav user-menu">
        <!-- Search -->
        <li class="nav-item nav-searchinputs"></li>
        <!-- /Search -->
        <!-- Select Store -->
        <li
          class="nav-item dropdown has-arrow main-drop select-store-dropdown"
        ></li>
        <!-- /Select Store -->
        <li class="nav-item dropdown link-nav"></li>

        <li class="nav-item pos-nav"></li>

        <!-- Flag -->
        <li class="nav-item dropdown has-arrow flag-nav nav-item-box"></li>
        <!-- /Flag -->

        <li class="nav-item nav-item-box">
          <a
            href="javascript:void(0);"
            id="btnFullscreen"
            @click="toggleFullScreen"
          >
            <i class="ti ti-maximize"></i>
          </a>
        </li>
        <li class="nav-item nav-item-box">
          <router-link to="/application/email">
            <i class="ti ti-mail"></i>
            <span class="badge rounded-pill">1</span>
          </router-link>
        </li>
        <!-- Notifications -->
        <li class="nav-item dropdown nav-item-box">
          <a
            href="javascript:void(0);"
            class="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <i class="ti ti-bell"></i>
          </a>
          <div class="dropdown-menu notifications">
            <div class="topnav-dropdown-header">
              <h5 class="notification-title">Notifications</h5>
              <a href="javascript:void(0)" class="clear-noti"
                >Mark all as read</a
              >
            </div>
            <div class="noti-content">
              <ul class="notification-list">
                <li class="notification-message">
                  <router-link to="/activities">
                    <div class="media d-flex">
                      <span class="avatar flex-shrink-0">
                        <img alt="" src="/app/img/profiles/avatar-13.jpg" />
                      </span>
                      <div class="flex-grow-1">
                        <p class="noti-details">
                          <span class="noti-title">James Kirwin</span> confirmed
                          his order. Order No: #78901.Estimated delivery: 2 days
                        </p>
                        <p class="noti-time">4 mins ago</p>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="notification-message">
                  <router-link to="/activities">
                    <div class="media d-flex">
                      <span class="avatar flex-shrink-0">
                        <img alt="" src="/app/img/profiles/avatar-03.jpg" />
                      </span>
                      <div class="flex-grow-1">
                        <p class="noti-details">
                          <span class="noti-title">Leo Kelly</span> cancelled
                          his order scheduled for 17 Jan 2025
                        </p>
                        <p class="noti-time">10 mins ago</p>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="notification-message">
                  <router-link to="/activities" class="recent-msg">
                    <div class="media d-flex">
                      <span class="avatar flex-shrink-0">
                        <img alt="" src="/app/img/profiles/avatar-17.jpg" />
                      </span>
                      <div class="flex-grow-1">
                        <p class="noti-details">
                          Payment of $50 received for Order #67890 from
                          <span class="noti-title">Antonio Engle</span>
                        </p>
                        <p class="noti-time">05 mins ago</p>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="notification-message">
                  <router-link to="/activities" class="recent-msg">
                    <div class="media d-flex">
                      <span class="avatar flex-shrink-0">
                        <img alt="" src="/app/img/profiles/avatar-02.jpg" />
                      </span>
                      <div class="flex-grow-1">
                        <p class="noti-details">
                          <
                          <span class="noti-title">Andrea</span>
                          confirmed his order. Order No: #73401.Estimated
                          delivery: 3 days
                        </p>
                        <p class="noti-time">4 mins ago</p>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="topnav-dropdown-footer d-flex items-center gap-3">
              <a href="#" class="btn btn-secondary btn-md full-width">Cancel</a>
              <router-link
                to="/activities"
                class="btn btn-primary btn-md full-width"
                >View all</router-link
              >
            </div>
          </div>
        </li>
        <!-- /Notifications -->

        <li class="nav-item nav-item-box">
          <router-link to="/settings/general-settings"
            ><i class="ti ti-settings"></i
          ></router-link>
        </li>
        <li class="nav-item dropdown has-arrow main-drop profile-nav">
          <a
            href="javascript:void(0);"
            class="nav-link userset"
            data-bs-toggle="dropdown"
          >
            <span class="user-info q-pa-none-important">
              <span class="user-letter">
                <img
                  src="/app/img/profiles/avator1.jpg"
                  alt=""
                  class="img-fluid"
                />
              </span>
            </span>
          </a>
          <div v-if="authStore.user" class="dropdown-menu menu-drop-user">
            <div class="profileset d-flex items-center">
              <span class="user-img q-mr-sm">
                <img src="/app/img/profiles/avator1.jpg" alt="" />
              </span>
              <div>
                <h6 class="fw-medium">{{ authStore.user?.name }}</h6>
                <p>Admin</p>
              </div>
            </div>
            <router-link class="dropdown-item" to="/main/profile">
              <i class="ti ti-user-circle q-mr-sm"></i>
              My Profile
            </router-link>
            <router-link class="dropdown-item" to="/settings/general-settings">
              <i class="ti ti-settings-2 q-mr-sm"></i>
              Settings
            </router-link>
            <hr class="my-2" />
            <router-link
              class="dropdown-item logout pb-0"
              @click="logout"
              to="/"
            >
              <i class="ti ti-logout q-mr-sm"></i>
              Logout
            </router-link>
          </div>
        </li>
      </ul>
      <!-- /Header Menu -->

      <!-- Mobile Menu -->
      <div class="dropdown mobile-user-menu">
        <a
          href="javascript:void(0);"
          class="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          ><i class="fa fa-ellipsis-v"></i
        ></a>
        <div class="dropdown-menu dropdown-menu-right">
          <router-link class="dropdown-item" to="/main/profile"
            >My Profile</router-link
          >
          <router-link class="dropdown-item" to="/settings/general-settings"
            >Settings</router-link
          >
          <router-link class="dropdown-item" to="/" @click="logout"
            >Logout</router-link
          >
        </div>
      </div>
      <!-- /Mobile Menu -->
    </div>
  </div>
  <!-- /Header -->
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "stores/auth";
import { useQuasar } from "quasar";

const authStore = useAuthStore();
const $q = useQuasar();
const loading = ref(false);

const logout = async () => {
  try {
    loading.value = true;
    await authStore.logout();
    $q.notify({
      type: "positive",
      message: "Successfully logged out",
      position: "top",
    });
  } catch {
    $q.notify({
      type: "negative",
      message: "Failed to logout",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};
// ROUTE
const route = useRoute();

// REMOVE SIDEBAR CLASSES
const removeSidebarClasses = (): void => {
  document.querySelector(".main-wrapper")?.classList.remove("slide-nav");
  document.querySelector(".sidebar-overlay")?.classList.remove("opened");
  document.querySelector("html")?.classList.remove("menu-opened");
};

// WATCH ROUTE CHANGES
watch(
  () => route.path,
  () => removeSidebarClasses(),
);

// INITIAL REMOVE ON MOUNT
onMounted(() => removeSidebarClasses());

// TOGGLE MOBILE SIDEBAR
const toggleMobileBtn = (): void => {
  document?.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
  document?.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
  document?.querySelector("html")?.classList?.toggle("menu-opened");
};

// TOGGLE FULLSCREEN
const toggleFullScreen = (): void => {
  document.body.classList.toggle("fullscreen-enable");

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
};

// HELPER: check if element is visible
const isElementVisible = (element: HTMLElement | null | undefined): boolean => {
  return !!element && (element.offsetWidth > 0 || element.offsetHeight > 0);
};

// MINI-SIDEBAR MOUSEOVER
const handleMouseover = (e: MouseEvent): void => {
  e.stopPropagation();

  const body = document.body;
  const toggleBtn = document.getElementById("toggle_btn");

  if (body.classList.contains("mini-sidebar") && isElementVisible(toggleBtn)) {
    const target = (e.target as HTMLElement)?.closest(".sidebar, .header-left");

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

// SUBMENU HANDLERS
const slideDownSubmenu = (): void => {
  const subdrops = document.getElementsByClassName("subdrop");
  for (let i = 0; i < subdrops.length; i++) {
    const element = subdrops[i];
    if (!element) continue;
    const submenu = element.nextElementSibling as HTMLElement | null;
    if (submenu && submenu.tagName.toLowerCase() === "ul") {
      submenu.style.display = "block";
    }
  }
};

const slideUpSubmenu = (): void => {
  const subdrops = document.getElementsByClassName("subdrop");
  for (let i = 0; i < subdrops.length; i++) {
    const element = subdrops[i];
    if (!element) continue;
    const submenu = element.nextElementSibling as HTMLElement | null;
    if (submenu && submenu.tagName.toLowerCase() === "ul") {
      submenu.style.display = "none";
    }
  }
};

// INIT MOUSEOVER LISTENER
onMounted(() => {
  document.addEventListener("mouseover", handleMouseover as EventListener);
});

// CLEANUP
onBeforeUnmount(() => {
  document.removeEventListener("mouseover", handleMouseover as EventListener);
});
</script>
<style>
.q-pa-none-important {
  padding: 0 !important;
}
</style>
