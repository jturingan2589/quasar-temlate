<template>
  <ul>
    <li
      class="submenu-open"
      v-for="item in filteredSidebarData"
      :key="item.tittle"
    >
      <h6 class="submenu-hdr">{{ item.tittle }}</h6>
      <ul>
        <template v-for="menu in item.menu" :key="menu.menuValue">
          <!-- Single route -->
          <li
            v-if="!menu.hasSubRoute && checkMenuRole(menu)"
            :class="{ active: isMenuActive(menu) }"
          >
            <router-link v-if="menu.route" :to="menu.route">
              <i :class="menu.icon" class="text-body1 q-mr-sm"></i>
              <span>{{ menu.menuValue }}</span>
            </router-link>
          </li>

          <!-- Submenu -->
          <li
            v-else-if="menu.hasSubRoute && checkMenuRole(menu)"
            class="submenu"
          >
            <a
              href="javascript:void(0);"
              @click="expandSubMenus(menu)"
              :class="{ subdrop: menu.showSubRoute, active: isActive(menu) }"
            >
              <i :class="menu.icon" class="text-body1 q-mr-sm"></i>
              <span>{{ menu.menuValue }}</span>
              <span class="menu-arrow"></span>
            </a>
            <ul :class="menu.showSubRoute ? 'd-block' : 'd-none'">
              <li
                v-for="(subMenu, index) in menu.subMenus"
                :key="index"
                v-if="checkMenuRole(subMenu)"
              >
                <router-link v-if="subMenu.route" :to="subMenu.route">{{
                  subMenu.menuValue
                }}</router-link>
              </li>
            </ul>
          </li>

          <!-- Submenu Two -->
          <li
            v-else-if="menu.hasSubRouteTwo && checkMenuRole(menu)"
            class="submenu"
          >
            <a
              href="javascript:void(0);"
              @click="OpenMenu(menu)"
              :class="{
                subdrop: openMenuItem === menu || isActive(menu),
                active: isActive(menu),
              }"
            >
              <i :class="menu.icon" class="text-body1 q-mr-sm"></i>
              <span>{{ menu.menuValue }}</span>
              <span class="menu-arrow"></span>
            </a>
            <ul
              :class="{
                'd-block': openMenuItem === menu,
                'd-none': openMenuItem !== menu,
              }"
            >
              <li
                v-for="subMenus in menu.subMenus"
                :key="subMenus.menuValue"
                v-if="checkMenuRole(subMenus)"
              >
                <template v-if="!subMenus.customSubmenuTwo">
                  <router-link v-if="subMenus.route" :to="subMenus.route">{{
                    subMenus.menuValue
                  }}</router-link>
                </template>
                <template v-else-if="subMenus.customSubmenuTwo">
                  <li class="submenu submenu-two">
                    <a
                      href="javascript:void(0);"
                      @click="openSubmenuOne(subMenus)"
                      :class="{
                        subdrop:
                          openSubmenuOneItem === subMenus ||
                          isSubActive(subMenus),
                        active: isSubActive(subMenus),
                      }"
                    >
                      {{ subMenus.menuValue
                      }}<span class="menu-arrow inside-submenu"></span>
                    </a>
                    <ul
                      :class="{
                        'd-block': openSubmenuOneItem === subMenus,
                        'd-none': openSubmenuOneItem !== subMenus,
                      }"
                    >
                      <li
                        v-for="subMenuTwo in subMenus.subMenusTwo"
                        :key="subMenuTwo.menuValue"
                        v-if="checkMenuRole(subMenuTwo)"
                      >
                        <router-link
                          v-if="subMenuTwo.route"
                          :to="subMenuTwo.route"
                          >{{ subMenuTwo.menuValue }}</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </template>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import side_bar_data from "./sidebar.json";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { hasPermission } from "src/composable/useAuth"; // Import your role helpers

const route = useRoute();

// Reactive state
const sideBarData = ref(side_bar_data);
const openMenuItem = ref<any>(null);
const openSubmenuOneItem = ref<any>(null);

// ----------------------------
// Role-based filtering
// ----------------------------
function checkMenuRole(menu: any) {
  // If no roles defined, show to all
  if (!menu.roles || menu.roles.length === 0) return true;

  // Check if user has at least one role
  return menu.roles.some((role: string) => hasPermission(role));
}

// Filter top-level items dynamically
const filteredSidebarData = computed(() =>
  filterMenuByRoles(sideBarData.value),
);

function filterMenuByRoles(menuItems: any[]): any[] {
  return menuItems
    .map((item) => {
      // If item has children
      if (item.menu && item.menu.length) {
        const filteredChildren = filterMenuByRoles(item.menu);
        if (filteredChildren.length) {
          return { ...item, menu: filteredChildren };
        } else {
          // No visible children, hide parent
          return null;
        }
      }

      // If item has subMenus (for nested submenuTwo)
      if (item.subMenus && item.subMenus.length) {
        const filteredSubMenus = filterMenuByRoles(item.subMenus);
        if (filteredSubMenus.length) {
          return { ...item, subMenus: filteredSubMenus };
        } else {
          return null;
        }
      }

      // If item has subMenusTwo (deepest nested)
      if (item.subMenusTwo && item.subMenusTwo.length) {
        const filteredSubMenusTwo = filterMenuByRoles(item.subMenusTwo);
        if (filteredSubMenusTwo.length) {
          return { ...item, subMenusTwo: filteredSubMenusTwo };
        } else {
          return null;
        }
      }

      // Leaf node: check role
      return checkMenuRole(item) ? item : null;
    })
    .filter(Boolean);
}

// ----------------------------
// Active menu logic
// ----------------------------
const isMenuActive = computed(() => (menu: any) => {
  return [
    menu.route,
    menu.active_link,
    menu.active_link1,
    menu.active_link2,
    menu.active_link3,
    menu.active_link4,
    menu.active_link5,
  ].includes(route.path);
});

const isActive = computed(() => (menu: any) => {
  const base = route.path.split("/").filter((p) => p)[0];
  return [menu.active_link, menu.active_link1, menu.active_link2].includes(
    base,
  );
});

const isSubActive = computed(() => (menu: any) => {
  const base = route.path.split("/").filter((p) => p)[0];
  return menu.active_link === base;
});

// ----------------------------
// Sidebar methods
// ----------------------------
function expandSubMenus(menu: any) {
  const isMiniSidebar = document.body.classList.contains("mini-sidebar");
  sideBarData.value.forEach((item: any) =>
    item.menu.forEach((m: any) => {
      if (m !== menu) m.showSubRoute = false;
    }),
  );
  menu.showSubRoute = isMiniSidebar ? true : !menu.showSubRoute;
}

function OpenMenu(menu: any) {
  const isMiniSidebar = document.body.classList.contains("mini-sidebar");
  sideBarData.value.forEach((item: any) =>
    item.menu.forEach((m: any) => {
      m.showSubRoute = false;
    }),
  );
  openMenuItem.value = isMiniSidebar
    ? menu
    : openMenuItem.value === menu
      ? null
      : menu;
}

function openSubmenuOne(subMenus: any) {
  const isMiniSidebar = document.body.classList.contains("mini-sidebar");
  openSubmenuOneItem.value = isMiniSidebar
    ? subMenus
    : openSubmenuOneItem.value === subMenus
      ? null
      : subMenus;
}
</script>
