<template>
  <ul>
    <li class="submenu-open" v-for="item in side_bar_data" :key="item.tittle">
      <h6 class="submenu-hdr">{{ item.tittle }}</h6>
      <!-- Correct typo if needed -->
      <ul>
        <template v-for="menu in item.menu" :key="menu.menuValue">
          <li v-if="!menu.hasSubRoute" :class="{ active: isMenuActive(menu) }">
            <router-link v-if="menu.route" :to="menu.route">
              <i :class="menu.icon" class="text-body1 q-mr-sm"></i>
              <span>{{ menu.menuValue }}</span>
            </router-link>
          </li>
          <li v-else class="submenu">
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
              <li v-for="(subMenu, index) in menu.subMenus" :key="index">
                <!-- Add v-if to check subMenu.route -->
                <router-link v-if="subMenu.route" :to="subMenu.route">{{
                  subMenu.menuValue
                }}</router-link>
              </li>
            </ul>
          </li>
          <li v-if="menu.hasSubRouteTwo" class="submenu">
            <a
              href="javascript:void(0);"
              @click="OpenMenu(menu)"
              :class="{
                subdrop: openMenuItem === menu || isActive(menu),
                active: isActive(menu),
              }"
            >
              <i :class="menu.icon" class="text-body1 q-mr-sm"></i
              ><span>{{ menu.menuValue }}</span>
              <span class="menu-arrow"></span>
            </a>
            <ul
              :class="{
                'd-block': openMenuItem === menu,
                'd-none': openMenuItem !== menu,
              }"
            >
              <li v-for="subMenus in menu.subMenus" :key="subMenus.menuValue">
                <template v-if="!subMenus.customSubmenuTwo">
                  <!-- Add v-if for subMenus.route -->
                  <router-link
                    v-if="subMenus.route"
                    :to="subMenus.route"
                    router-link-active="active"
                    >{{ subMenus.menuValue }}</router-link
                  >
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
                      >
                        <!-- Add v-if for subMenuTwo.route -->
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

const route = useRoute();

// reactive state
const sideBarData = ref(side_bar_data);
const openMenuItem = ref<any>(null);
const openSubmenuOneItem = ref<any>(null);

// computed
const isMenuActive = computed(() => {
  return (menu: any) => {
    return (
      route.path === menu.route ||
      route.path === menu.active_link ||
      route.path === menu.active_link1 ||
      route.path === menu.active_link2 ||
      route.path === menu.active_link3 ||
      route.path === menu.active_link4 ||
      route.path === menu.active_link5
    );
  };
});

const isActive = computed(() => {
  return (menu: any) => {
    const result = route.path.split("/").filter((part) => part);
    const base = result[0];
    return (
      base === menu.active_link ||
      base === menu.active_link1 ||
      base === menu.active_link2
    );
  };
});

const isSubActive = computed(() => {
  return (menu: any) => {
    const result = route.path.split("/").filter((part) => part);
    const base = result[0];
    return base === menu.active_link;
  };
});

// methods
function expandSubMenus(menu: any) {
  const isMiniSidebar = document.body.classList.contains("mini-sidebar");

  sideBarData.value.forEach((item: any) => {
    item.menu.forEach((subMenu: any) => {
      if (subMenu !== menu) {
        subMenu.showSubRoute = false;
      }
    });
  });

  if (isMiniSidebar) {
    menu.showSubRoute = true;
  } else {
    menu.showSubRoute = !menu.showSubRoute;
  }
}

function OpenMenu(menu: any) {
  const isMiniSidebar = document.body.classList.contains("mini-sidebar");

  sideBarData.value.forEach((item: any) => {
    item.menu.forEach((subMenu: any) => {
      subMenu.showSubRoute = false;
    });
  });

  if (isMiniSidebar) {
    openMenuItem.value = menu;
  } else {
    openMenuItem.value = openMenuItem.value === menu ? null : menu;
  }
}

function openSubmenuOne(subMenus: any) {
  const isMiniSidebar = document.body.classList.contains("mini-sidebar");

  if (isMiniSidebar) {
    openSubmenuOneItem.value = subMenus;
  } else {
    openSubmenuOneItem.value =
      openSubmenuOneItem.value === subMenus ? null : subMenus;
  }
}
</script>
