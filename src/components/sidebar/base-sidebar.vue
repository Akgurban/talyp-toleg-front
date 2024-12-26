<template>
  <div class="w-[264px] bg-[#F2F4FA] h-full border-r border-[#798AA3] p-10">
    <div class="mt-5 flex items-center flex-col">
      <img src="/logo.png" />
      <div class="font-bold text-[24px] mt-3">Talyp Toleg</div>
    </div>
    <div class="flex-col flex gap-4 mt-10">
      <Button severity="secondary"  class="">
        <baseIcon name="cash"></baseIcon>
        <div class="text-[18px] font-medium">Toleglerim</div>
      </Button>
      
      <Button class="" severity="danger" 
      @click="router.push('/login')"
        >
        <baseIcon name="logout"></baseIcon>
        <div class="">
          Ulgamdan çyk
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { Button } from 'primevue';
import baseIcon from '../base/base-icon.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps(["width"]);
</script>

<style></style>