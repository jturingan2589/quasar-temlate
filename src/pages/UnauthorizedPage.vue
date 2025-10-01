<template>
  <q-page class="row items-center justify-center">
    <div class="column items-center">
      <h1 class="text-negative text-h3 q-mb-md">Unauthorized Access</h1>
      <p class="text-body1">You don't have permission to access this page.</p>
      <q-btn
        color="primary"
        label="Go to Home"
        @click="$router.push('/')"
        class="q-mt-md"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UnauthorizedPage'
})
</script>