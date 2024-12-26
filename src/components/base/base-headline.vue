<script setup>
const props = defineProps({
  showMore: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div
    class="w-full py-4 relative bg-primary rounded-tr-md rounded-tl-md overflow-hidden text-white px-8"
  >
    <img
      class="absolute top-0 left-0 w-full h-full z-[1] object-cover"
      src="@/assets/imgs/pattern.png"
      alt=""
    />
    <div
      class="content w-full flex justify-between items-center relative z-[2]"
    >
      <h1 class="text-lg font-bold"><slot name="title" /></h1>
      <a href="#" v-if="showMore">See more >></a>
    </div>
  </div>
</template>
