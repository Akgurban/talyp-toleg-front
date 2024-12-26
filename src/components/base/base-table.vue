<template>
  <div class="w-full">
    <div class="w-full flex justify-between text-sm mb-2">
      <slot name="header"></slot>
    </div>
    <div class="w-full flex flex-col space-y-2">
      <slot name="body"></slot>
    </div>
  </div>
</template>
