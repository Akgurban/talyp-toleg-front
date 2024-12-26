<script setup>
defineProps(["src", "fallback"]);
import { BASE_URL } from "@/composables/constants";

</script>

<template>
  <picture>
    <img
      class="w-full h-full object-contain"
      v-bind="$attrs"
      loading="lazy"
      :src="`${BASE_URL()}/uploads/${src}`"
    />
  </picture>
</template>
