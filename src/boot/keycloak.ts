import { boot } from 'quasar/wrappers'
import Keycloak, { type KeycloakConfig } from 'keycloak-js'
import { useAuthStore } from 'src/stores/auth'
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { Loading } from 'quasar'

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:9090',
  realm: 'i-connect-messaging',
  clientId: 'quasar'
}

const keycloak = new Keycloak(keycloakConfig)

export default boot(async ({ router }: { router: Router }) => {
  const authStore = useAuthStore()

  try {
    // 🌀 Show loading while Keycloak initializes
    Loading.show({
      message: 'Checking authentication...',
      spinnerColor: 'primary',
      backgroundColor: 'rgba(0, 0, 0, 0.94)',
    })

    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      checkLoginIframe: false,
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: window.location.origin + '/app/silent-check-sso.html',
      redirectUri: window.location.origin + '/app/',
      enableLogging: true
    })

    if (authenticated) {
      console.log('✅ Logged in with Keycloak')
      authStore.setKeycloak(keycloak)

      // Refresh token before expiry
      keycloak.onTokenExpired = async () => {
        console.log('🔄 Token expired, refreshing...')
        Loading.show({ message: 'Refreshing session...', spinnerColor: 'primary' })
        try {
          const refreshed = await keycloak.updateToken(70)
          if (refreshed) {
            authStore.setKeycloak(keycloak)
          }
        } catch (err) {
          console.error('❌ Token refresh failed')
          await router.push('/login')
        } finally {
          Loading.hide()
        }
      }
    } else {
      console.log('ℹ️ Not logged in yet')
    }

    // 🔒 Navigation guard
    router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
      Loading.show({ message: 'Loading page...', spinnerColor: 'primary' })

      if (to.path === '/login' || to.path === '/unauthorized') {
        Loading.hide()
        next()
        return
      }

      if (to.path === '/app/auth/callback') {
        if (keycloak.authenticated) next('/main/dashboard')
        else next('/login')
        Loading.hide()
        return
      }

      if (to.meta.requiresAuth) {
        if (!keycloak.authenticated) {
          sessionStorage.setItem('intendedRoute', to.fullPath)
          await keycloak.login({ redirectUri: window.location.origin + '/app/' })
          return
        }

        if (to.meta.roles) {
          const roles = to.meta.roles as string[]
          const hasRole = roles.some((role: string) => keycloak.hasRealmRole(role))
          if (!hasRole) {
            next('/unauthorized')
            Loading.hide()
            return
          }
        }
      }

      Loading.hide()
      next()
    })
  } catch (err) {
    console.error('❌ Keycloak init failed:', err)
    Loading.hide()
  }
})

export { keycloak }
