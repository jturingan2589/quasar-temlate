import type { RouteRecordRaw } from "vue-router";
import sidebarDataRaw from "src/layouts/sidebar/sidebar.json"; // JSON file

// Make sure TypeScript recognizes the array
const sidebarData = sidebarDataRaw as any[];
const dynamicChildren: RouteRecordRaw[] = [];

// Iterate over sidebar JSON
sidebarData.forEach((group) => {
  group.menu.forEach((menu: any) => {
    if (!menu.route) return;

    dynamicChildren.push({
      path: menu.route.replace(/^\//, ""), // remove leading slash for child routes
      component: () => import(/* @vite-ignore */ `../${menu.component}`),
      meta: { requiresAuth: true, roles: menu.roles || [] },
    });
  });
});

// Final router array
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/main/dashboard",
      },
      ...dynamicChildren, // dynamically added routes
      {
        path: "sku/master-list/:action/:id?", // Add or Edit
        component: () => import("pages/sku/master-list/ProductForm.vue"),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: "sku/master-list/details",
        component: () => import("pages/sku/master-list/ProductDetails.vue"),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: "user-management/roles-permissions/:action/:id?",
        component: () => import("pages/user-management/role/RoleForm.vue"),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: "main/profile",
        component: () => import("pages/ProfilePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "login",
        component: () => import("pages/LoginPage.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "unauthorized",
        name: "unauthorized",
        component: () => import("src/pages/error/UnauthorizedPage.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "timeout",
        name: "timeout",
        component: () => import("src/pages/error/TimeoutPage.vue"),
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/error/NotFoundPage.vue"),
  },
];

export default routes;
