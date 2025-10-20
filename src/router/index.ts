import { defineRouter } from '#q-app/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import routes from './routes'
import { Loading } from 'quasar'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history'
        ? createWebHistory
        : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // 🌀 Optional: Customize the loading spinner
  Loading.setDefaults({
    spinnerColor: 'primary',
    spinnerSize: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    message: 'Loading page...',
    messageColor: 'white'
  })

  // ✅ Show loading on route start
  Router.beforeEach((to, from, next) => {
    Loading.show()
    next()
  })

  // ✅ Hide loading on route end
  Router.afterEach(() => {
    Loading.hide()
  })

  // ✅ Handle route errors
  Router.onError(() => {
    Loading.hide()
  })

  return Router
})
