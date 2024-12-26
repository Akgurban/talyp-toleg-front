<template>
  <div class="bg-img w-full relative rounded-2xl">
    <!-- <img src="" class="w-full shadow-xl" alt="" /> -->

    <div
      class="w-full py-3 bg-[#0E5F75] rounded-t-2xl flex justify-between items-center px-7"
    >
      <div class="text-white flex items-center gap-2">
        <div class="text-[24px]">{{ props.info.paymentAmount}} TMT</div>
        <div
        class="font-medium"
        :class="
          props.info.paymentStatus == 'Accepted'
            ? 'text-[#28CA71]'
            : props.info.paymentStatus == 'Rejected'
            ? 'text-[#f49f9f]'
            : 'text-[#e3982e]'
        "
      >
        &#8226;
        {{
          props.info.paymentStatus == "Accepted"
            ? "Tassyklanyldy"
            : props.info.paymentStatus == "Rejected"
            ? "Kabul edilmedi"
            : "Garaşylýar"
        }}
      </div>
      </div>
      <div>
        <baseIcon
          name="edit"
          @click="router.push(props.editPath)"
          class="scale-125 cursor-pointer text-white hover:text-gray-200"
          src="/edit.svg"
          alt=""
        />
      </div>
    </div>
    <div class="mx-auto flex items-center justify-center mt-2">
      <div class="px-12 w-full pb-[10px]">
        <!-- <Image src="/cardimg.png" class="w-full  object-cover aspect-[13/4] " alt=""  preview>
          <template #previewicon>
            <i class="pi pi-search"></i>
          </template>
          
        </Image> -->
        <Image alt="Image" preview class="w-full ">
          <template #previewicon>
            <baseIcon name="search" class="text-white pi-search"></baseIcon>
          </template>
          {{props.info}}
          <template #image>
            <BaseImg
              :src="props.info.checkPhotoURL"
              class="w-full aspect-[26/9] object-cover"
              alt="image"
              width="250"
            />
          </template>
          <template #preview="slotProps">
            <BaseImg
              :src="props.info.checkPhotoURL"
              alt="preview"
              class="max-w-[80vw] max-h-[80vh]"
              :style="slotProps.style"
              @click="slotProps.onClick"
            />
          </template>
        </Image>
      </div>
    </div>

    <div class="flex justify-between px-8 pt-10 pb-10">
      <div class="flex gap-2">
        <img src="/cash.svg" alt="" />
        <h1>{{props.info.paymentType =='1'? 'I semester  ': props.info.paymentType =='2' ?" II semester":'I, II semester'}}</h1>
      </div>
      
      <div class="flex gap-2">
        <img src="/course.svg" alt="" />
        <h1 class="text-nowrap">{{props.info.courseYear}}nji yyl</h1>
      </div>
      <div class="flex gap-2">
        <img src="/date.svg" alt="" />
        <h1>{{ normalizedDate(props.info.updatedAt)}}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Image from 'primevue/image';
import { useRouter } from 'vue-router';
import baseIcon from './base-icon.vue';
import { normalizedDate } from '@/composables/functions';
import BaseImg from './base-img.vue';
const router= useRouter()
const props =defineProps({
  editPath:{
    type: String,
    default:'',
  },
  info: {
    type: Object,
    default: null,
  }
})
const visibleRef = ref(false);
const indexRef = ref(0);

const imgs = [
  "https://via.placeholder.com/450.png/",
  "https://via.placeholder.com/300.png/",
  "https://via.placeholder.com/150.png/",
  { src: "https://via.placeholder.com/450.png/", title: "this is title" },
];

const showImg = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("/card_layer.png");
  background-repeat: no-repeat;
  background-size: 101%;
}
</style>