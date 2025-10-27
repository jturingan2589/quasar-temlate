<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-gutter-y-md">
      <h5 class="q-my-none">Login Required</h5>
      <p>You need to login to access this application.</p>
      <q-btn color="primary" label="Login with Keycloak" @click="login" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { keycloak } from "src/boot/keycloak";
import { useRouter } from "vue-router";
import { Loading } from "quasar";

const router = useRouter();

async function login() {
  try {
    Loading.show({
      message: "Redirecting to Keycloak...",
      spinnerColor: "primary",
    });

    if (!keycloak) {
      console.error("⚠️ Keycloak instance not initialized.");
      return;
    }

    // Redirect to Keycloak login
    await keycloak.login({
      redirectUri: `${window.location.origin}/app/`,
    });
  } catch (err) {
    console.error("❌ Login failed:", err);
  } finally {
    Loading.hide();
  }
}
</script>
