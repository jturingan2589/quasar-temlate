<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <Sidebar />
    <q-page-container class="page-wrapper">
      <div class="content">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import Sidebar from "./sidebar/Sidebar.vue";
import Header from "./Header.vue";
</script>
