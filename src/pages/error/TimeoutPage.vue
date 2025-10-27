<template>
  <div class="fullscreen flex flex-center column q-pa-xl">
    <q-icon name="warning" size="80px" color="negative" />
    <h4 class="text-negative q-mt-md">Authentication Error</h4>
    <p class="text-grey q-mt-sm">
      Unable to reach the authentication server. Please try again later.
    </p>
    <q-btn color="primary" label="Retry" class="q-mt-md" @click="retry" />
  </div>
</template>

<script setup lang="ts">
import { initKeycloak } from "boot/keycloak";
import { Loading } from "quasar";
import useNotify from "src/composable/useNotify";
import { useRouter } from "vue-router";

const router = useRouter();
const { error, success } = useNotify();

/**
 * Retry Keycloak connection and re-init
 */
async function retry() {
  const url = `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 3000);

  Loading.show({
    message: "Reconnecting to authentication server...",
    spinnerColor: "primary",
  });

  try {
    // 🧩 Check if server is reachable
    const res = await fetch(url, { method: "HEAD", signal: controller.signal });
    clearTimeout(id);

    if (!res.ok) {
      error("Authentication server responded with an error.");
      return;
    }

    // 🌀 Try to re-initialize Keycloak
    const authenticated = await initKeycloak(router);

    if (authenticated) {
      success("Reconnected successfully!");
      router.push("/main/dashboard");
    } else {
      error("Failed to authenticate. Please try logging in again.");
      router.push("/login");
    }
  } catch (err) {
    error("Server is unreachable. Please try again later.");
    clearTimeout(id);
  } finally {
    Loading.hide();
  }
}
</script>
