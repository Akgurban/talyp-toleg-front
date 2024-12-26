<template>
  <div class="h-screen overflow-auto">
    <div class="flex h-full">
      <AdminSidebar></adminSidebar>

      <div :class="`w-[calc(100vw-264px)]`" class="flex flex-col ml-13">
        <Header></Header>
        <div class="h-[calc(100vh-146px)] pr-8 pl-2 overflow-scroll">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import AdminSidebar from "@/components/sidebar/admin-sidebar.vue";
import BaseSidebar from "@/components/sidebar/base-sidebar.vue";
</script>

<style lang="scss" scoped>
</style>