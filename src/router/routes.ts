import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        redirect: '/main/dashboard'
      },
      // Product Routes
      {
        path: "inventory/master-list", 
        component: () => import('pages/master-list/ProductList.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: "inventory/master-list/:action/:id?", // Add or Edit
        component: () => import('pages/master-list/ProductForm.vue'),
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: "inventory/master-list/details", 
        component: () => import('pages/master-list/ProductDetails.vue'),
        meta: { requiresAuth: true },
        props: true
      },
      // End Product Routes
      {
        path: "inventory/category-list", 
        component: () => import('pages/category/CategoryList.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'main/dashboard', 
        component: () => import('pages/DashboardPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'main/profile', 
        component: () => import('pages/ProfilePage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'reports/sales-report', 
        component: () => import('pages/sales-report/SalesReport.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'user-management/users', 
        component: () => import('pages/user-management/UserList.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'user-management/roles-permissions', 
        component: () => import('pages/user-management/RolePermissions.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'unauthorized',
        name: 'unauthorized',
        component: () => import('pages/UnauthorizedPage.vue'),
        meta: { requiresAuth: false }
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
