<template>
  <q-page class="row justify-center q-pa-md">
    <div class="col-12 col-md-8">
      <q-card class="dashboard-card">
        <q-card-section>
          <div class="text-h4 q-mb-md">Dashboard</div>
          <div v-if="authStore.user" class="q-gutter-y-md">
            <div class="text-h5">
              Welcome, 
              <span class="text-primary">{{ authStore.user.preferred_username }}</span>
            </div>
            <q-separator />
            
            <div class="user-roles q-mt-md">
              <div class="text-subtitle1 q-mb-sm">Your Roles:</div>
              <div class="q-gutter-sm">
                <q-chip
                  v-for="role in roles"
                  :key="role"
                  color="primary"
                  text-color="white"
                  icon="security"
                >
                  {{ role }}
                </q-chip>
              </div>
            </div>

            <q-separator />

            <div class="q-mt-md">
              <q-list bordered separator>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="person" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Username</q-item-label>
                    <q-item-label caption>{{ authStore.user.preferred_username }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="email" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Email</q-item-label>
                    <q-item-label caption>{{ authStore.user.email || 'Not provided' }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="verified_user" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Authentication Status</q-item-label>
                    <q-item-label caption>
                      <q-chip 
                        :color="authStore.authenticated ? 'positive' : 'negative'"
                        text-color="white"
                        :icon="authStore.authenticated ? 'check_circle' : 'error'"
                        size="sm"
                      >
                        {{ authStore.authenticated ? 'Authenticated' : 'Not Authenticated' }}
                      </q-chip>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="q-mt-lg">
              <q-btn 
                color="negative" 
                icon="logout" 
                label="Logout" 
                @click="logout"
                :loading="loading"
              />
            </div>
          </div>

          <div v-else class="text-center q-pa-md">
            <q-spinner-dots color="primary" size="40" />
            <div class="text-subtitle1 q-mt-md">Loading user information...</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'DashboardPage',
  
  setup() {
    const authStore = useAuthStore()
    const $q = useQuasar()
    const loading = ref(false)

    const roles = computed(() => {
      return authStore.user?.realm_access?.roles || []
    })

    const logout = async () => {
      try {
        loading.value = true
        await authStore.logout()
        $q.notify({
          type: 'positive',
          message: 'Successfully logged out',
          position: 'top'
        })
      } catch  {
        $q.notify({
          type: 'negative',
          message: 'Failed to logout',
          position: 'top'
        })
      } finally {
        loading.value = false
      }
    }

    return {
      authStore,
      roles,
      logout,
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
.dashboard-card {
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.user-roles {
  .q-chip {
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-2px);
    }
  }
}
</style>