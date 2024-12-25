<script setup lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <!-- Navbar -->
  <Navbar />

  <!-- Main Content Area -->
  <div class="main-content">
    <router-view />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
