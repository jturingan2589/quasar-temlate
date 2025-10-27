import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/main/dashboard",
      },
      // Product Routes
      {
        path: "inventory/master-list",
        component: () => import("pages/sku/master-list/ProductList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "inventory/master-list/:action/:id?", // Add or Edit
        component: () => import("pages/sku/master-list/ProductForm.vue"),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: "inventory/master-list/details",
        component: () => import("pages/sku/master-list/ProductDetails.vue"),
        meta: { requiresAuth: true },
        props: true,
      },
      // End Product Routes
      {
        path: "inventory/category-list",
        component: () => import("pages/sku/category/CategoryList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "main/dashboard",
        component: () => import("pages/dashboard/DashboardPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "main/profile",
        component: () => import("pages/ProfilePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "reports/sales-report",
        component: () => import("pages/reports/sales-report/SalesReport.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "reports/sku-performance",
        component: () =>
          import("pages/reports/sku-performance/SKUPerformance.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "user-management/users",
        component: () => import("pages/user-management/UserList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "user-management/roles-permissions",
        component: () => import("pages/user-management/RolePermissions.vue"),
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/error/NotFoundPage.vue"),
  },
];

export default routes;
