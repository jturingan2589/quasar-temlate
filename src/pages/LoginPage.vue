<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-gutter-y-md">
      <h5 class="q-my-none">Login Required</h5>
      <p>You need to login to access this application.</p>
      <q-btn color="primary" label="Login with Keycloak" @click="login" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { keycloak } from '../boot/keycloak'

export default defineComponent({
  name: 'LoginPage',
  methods: {
    login() {
      void keycloak.login({
        redirectUri: window.location.origin
      })
    }
  }
})
</script>