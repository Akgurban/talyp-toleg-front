<script setup>
import baseIcon from './base-icon.vue';
const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  icon: {
    type: String,
  },
});
</script>
<template>
  <button
    class="p-3 transition-all duration-150 rounded-[6px]"
    :class="{
      'bg-secondary rounded-[0.1857rem] hover:bg-[#f5db17]':
        props.type === 'secondary',
      'bg-[#0E2C75] text-white hover:bg-[#081b4c]': props.type === 'primary',
      'bg-danger text-white': props.type === 'danger',
      'bg-[#f4f4f4] text-c-black hover:bg-[#c0bebe] hover:text-white':
        props.type === 'gray',
    }"
    v-bind="$attrs"
  >
    <div class="flex gap-2 w-full justify-between items-center">
      <baseIcon v-if="props.icon" :name="props.icon"></baseIcon>
      <div class="font-medium">
 
        <slot />
      </div>
    </div>
  </button>
</template>

<style>
/* .test {
  color: #f8c646;
} */
</style>
