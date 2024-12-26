<script setup lang="ts">
import { Toast } from "primevue";
</script>

<template>
  <div>
    <Toast />
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
  </div>
</template>