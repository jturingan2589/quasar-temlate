import { boot } from 'quasar/wrappers'
import Keycloak, { type KeycloakConfig } from 'keycloak-js'
import { useAuthStore } from 'src/stores/auth'
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8091',
  realm: 'i-connect-pos',
  clientId: 'quasar'
}

const keycloak = new Keycloak(keycloakConfig)

export default boot(async ({ router }: { router: Router }) => {
  const authStore = useAuthStore()

  try {
    console.log('🔑 Initializing Keycloak...')

    const authenticated = await keycloak.init({
      onLoad: 'check-sso', // don’t force login immediately
      checkLoginIframe: false,
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: window.location.origin + '/app/silent-check-sso.html',
      redirectUri: window.location.origin + '/auth/callback',
      enableLogging: true
    })

    if (authenticated) {
      console.log('✅ Logged in with Keycloak')
      authStore.setKeycloak(keycloak)

      keycloak.onTokenExpired = () => {
        void keycloak.updateToken(70).then(refreshed => {
          if (refreshed) {
            authStore.setKeycloak(keycloak)
          }
        }).catch(() => {
          console.error('❌ Token refresh failed')
          void router.push('/login')
        })
      }
    } else {
      console.log('ℹ️ Not logged in yet')
    }

    // 🔒 Navigation guard
    router.beforeEach(async (
      to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (to.path === '/login' || to.path === '/unauthorized') {
        next()
        return
      }

      if (to.path === '/app/auth/callback') {
        // after login, redirect user to dashboard
        if (keycloak.authenticated) {
          next('/dashboard')
        } else {
          next('/login')
        }
        return
      }

      if (to.meta.requiresAuth) {
        if (!keycloak.authenticated) {
          // save intended route
          sessionStorage.setItem('intendedRoute', to.fullPath)
          await keycloak.login({
            redirectUri: window.location.origin + '/auth/callback'
          })
          return
        }

        if (to.meta.roles) {
          const roles = to.meta.roles as string[]
          const hasRole = roles.some((role: string) => keycloak.hasRealmRole(role))
          if (!hasRole) {
            next('/unauthorized')
            return
          }
        }
      }

      next()
    })
  } catch (err) {
    console.error('❌ Keycloak init failed:', err)
  }
})

export { keycloak }
