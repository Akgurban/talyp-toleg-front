<template>
  <div class="py-3 border-b border-[#A8B9CA] flex justify-end gap-4 items-center pr-6 mb-[30px]">
    <div
      class="rounded-full border border-[#0E2C75] w-[48px] h-[48px] font-bold text-[36px] text-[#0E2C75] flex items-center justify-center uppercase">
      {{userData?.name[0]}}
    </div>
    <div class="flex flex-col items-end">
      <div class="font-medium text-[#0E2C75]">{{userData?.name}} {{userData?.surname}} </div>
      <div class="text-[#798AA3]"> {{userData?.roleType=='student' ?  'Talyp':"Admin"}}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


const userData=ref()

onMounted(()=>{
  userData.value=JSON.parse(localStorage.getItem('userData'))

})


</script>

<style></style>