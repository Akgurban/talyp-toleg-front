<script setup>
import icons from "/public/icons.ts";
import { computed } from "vue";

const props = defineProps({
  name: { type: String, default: "" },
});

const path = computed(() => {
  return icons[props.name];
});
</script>

<template>
  <span class="icon" v-html="path" v-bind="$attrs"></span>
</template>

<style lang="scss" scoped>
.icon {
  display: flex;
}
</style>
