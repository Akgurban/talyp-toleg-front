<template>
  <div class="w-[264px] bg-[#F2F4FA] h-full border-r border-[#798AA3] p-10">
    <div class="mt-5 flex items-center flex-col">
      <img src="/logo.png" />
      <div class="font-bold text-[24px] mt-3">Talyp Toleg</div>
    </div>
    <div class="flex-col flex gap-4 mt-10">
      <Button severity="secondary" @click="router.push('/admin/dashboard')" size="large">
        <BaseIcon name="building"></BaseIcon>
        <div
          :class="
            route.fullPath.includes('admin/dashboard') == true
              ? 'text-[#0E2C75] '
              : 'text-[#798AA3]'
          "
          class="font-semibold"
        >
          Fakultetler
        </div>
      </Button>
      <!-- raised -->
      <Button
        severity="secondary"
        @click="router.push('/admin/search')"
        class="flex gap-4 items-start justify-start cursor-pointer font-medium"
      >
        <baseIcon name="education"></baseIcon>
        <div
          class=" font-semibold"
          :class="
            route.fullPath.includes('admin/search') == true
              ? 'text-[#0E2C75]'
              : 'text-[#798AA3]'
          "
        >
          Talyp Gozleg
        </div>
      </Button>
      <Button
        severity="secondary"
        class="flex gap-4 items-start justify-start cursor-pointer font-medium"
        :class="!true ? 'text-[#0E2C75]' : 'text-[#798AA3]'"
        @click="router.push('/admin/statistics')"
      >
        <baseIcon name="statistics" class=""></baseIcon>
        <div class="font-semibold" :class="
        route.fullPath.includes('admin/statistics') == true
          ? 'text-[#0E2C75]'
          : 'text-[#798AA3]'
      ">Statistika</div>
      </Button>

      <Button
        @click="router.push('/login')"
        severity="danger"
        raised
        class="flex gap-4 items-center cursor-pointer hover:text-[#0E2C75] text-[#fff]"
      >
        <baseIcon name="logout"></baseIcon>
        <div class="font-medium">Ulgamdan çyk</div>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import BaseIcon from "../base/base-icon.vue";
import { Button } from "primevue";

defineProps(["width"]);

const router = useRouter();
const route = useRoute();
</script>

<style scoped>
.p-button {
  justify-content: start !important;
}
</style>