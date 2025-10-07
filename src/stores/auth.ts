import { defineStore } from 'pinia'
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    keycloak: null as KeycloakInstance | null,
    token: null as string | null,
    user: null as KeycloakTokenParsed | null,
    authenticated: false
  }),

  actions: {
    setKeycloak(instance: KeycloakInstance) {
      this.keycloak = instance
      this.token = instance?.token || null
      this.user = instance?.tokenParsed || null
      this.authenticated = instance?.authenticated || false
    },

    async logout() {
      if (this.keycloak) {
        await this.keycloak.logout({ redirectUri: window.location.origin + '/app/' })
      }
    }
  }
})
