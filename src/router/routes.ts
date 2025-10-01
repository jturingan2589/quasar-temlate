import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        redirect: '/inventory/master-list'
      },
      {
        path: "inventory/master-list", 
        component: () => import('pages/master-list/ProductList.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'dashboard', 
        component: () => import('pages/DashboardPage.vue'),
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
