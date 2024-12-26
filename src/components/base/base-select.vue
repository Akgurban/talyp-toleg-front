<script setup>
import { onMounted, ref } from 'vue';
import BaseIcon from './base-icon.vue';

defineProps({
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["update:modelValue"]);
const showDropdown = ref(false);
const dropdownMenu = ref();

onMounted(() => {
  window.addEventListener("click", (e) => {
    if (dropdownMenu.value != null) {
      if (!dropdownMenu.value.contains(e.target) && showDropdown.value) {
        showDropdown.value = false;
      }
    }
  });
});
</script>

<template>
  <div class="relative">
    <label :class="error == '' ? 'text-[#0E2C75]' : 'text-[#FF0004]'">{{
      label
    }}</label>
    <div
      @click.stop="showDropdown = !showDropdown"
      :class="[
        '',
        showDropdown ? 'rounded-t-[6px]' : '',
        error == '' ? 'border-[#0E2C75]' : 'border-[#FF0004]',
      ]"
      class="bg-white border-2 w-full h-[50px] flex items-center justify-between sm:px-6 px-4 mt-1 text-sm shadow-sm cursor-pointer"
    >
      <p v-if="!modelValue?.name" class=" text-[#0E2C75] "  :class="error!==''?'text-[#FF0004]':'text-[#0E2C7599]'">
       {{ !modelValue?.name ? placeholder :modelValue?.name }}
      </p>
      <p v-else class="font-bold text-[#0E2C75] " >
       {{  modelValue?.name }}
      </p>
      <span
        :class="showDropdown ? '-rotate-90' : 'rotate-90'"
        class="transition-all duration-150"
        ><BaseIcon name="chevron"></BaseIcon></span>
    </div>
    <div ref="dropdownMenu">
      <div
        v-if="showDropdown"
        :class="[
          error == '' ? 'border-[#0E2C75]' : 'border-[#FF0004]',
        ]"
        class="absolute right-0 bg-white border-x-2  h-auto duration-250 ease-in-out z-10 shadow-lg w-full"
      >
        <ul v-for="(option, index) in options" :key="index">
          <li
            @click="
              showDropdown = false;
              $emit('update:modelValue', option);
            "
            :class="[
              error == '' ? 'border-b-[#0E2C75]' : 'border-b-[#FF0004]',
            ]"
            class="py-4 px-7 hover:bg-[#0E2C7533] text-[#0E2C75] cursor-pointer border-b-2 "
          >
            {{ option?.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
