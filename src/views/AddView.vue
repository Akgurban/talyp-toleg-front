<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import baseSelect from "@/components/base/base-select.vue";
import baseSidebar from "@/components/sidebar/base-sidebar.vue";
import Header from "@/components/Header.vue";
import BaseUserInput from "@/components/base/base-user-input.vue";
import BaseImgUpload from "@/components/base/base-img-upload.vue";
import BaseIcon from "@/components/base/base-icon.vue";
import { useMyFetch } from "@/composables/useMyFetch";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const router = useRouter();
const month = reactive([
  "Ýanwar",
  "Fewral",
  "Mart",
  "Aprel",
  "Maý",
  "Iýun",
  "Iýul",
  "Awgust",
  "Sentýabr",
  "Oktýabr",
  "Noýabr",
  "Dekabr",
]);
const week = reactive([
  "Penşenbe",
  "Duşenbe",
  "Sişenbe",
  "Çarşenbe",
  "Penşenbe",
  "Anna",
  "Şenbe",
]);

const getFormatted = (e) => {
  const date = new Date(e);
  return `${week[date.getDay()]}, ${
    month[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} `;
};

const studyYearOptions = ref([
  { name: "I" },
  { name: "II" },
  { name: "III" },
  { name: "IV" },
  { name: "V" },
]);
const studyYear = ref("");
const studyYearError = ref("");
const studyYearType = ref(null);
const studyYearTypeError = ref("");
const cashAmount = ref("");
const cashAmountError = ref("");
const imageError = ref("");
const checkImage = ref(null);
const studyYearTypeOptions = ref([
  { name: "I ýarymýyllyk" },
  { name: "II ýarymýyllyk" },
  { name: "I we II ýarymýyllyk" },
]);

const widthSidebar = reactive(260);
const date = new Date();

const addCash = async () => {
  if (
    checkImage.value == null ||
    cashAmount.value == "" ||
    studyYearType.value == ""
  ) {
    checkImage.value == null
      ? (imageError.value = "Suraty saylaň")
      : (imageError.value = "");

    cashAmount.value == ""
      ? (cashAmountError.value = "Doly dolduruň")
      : (cashAmountError.value = "");

    studyYearType.value == null
      ? (studyYearTypeError.value = "Doly dolduruň")
      : (studyYearTypeError.value = "");
  }

  const form = new FormData();
  form.append("check-photo", checkImage.value);
  studyYearTypeOptions.value.forEach((element, index) => {
    if (element == studyYearType.value) {
      form.append("payment-type", JSON.stringify(index + 1));
    }
  });

  form.append("current-balance", cashAmount.value);
  const { data, error } = await useMyFetch("/api/v1/students/add-payment", {
    method: "POST",
    body: form,
  });
  if(data.value.message=='payment successfully added'){
show()
router.push('/')
  }
};

const show = () => {
  toast.add({
    severity: "success",
    summary: "Info",
    detail: "Üstünlikli amala aşyryldy!",
    life: 3000,
  });
};
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between items-center">
      <div
        class="font-medium text-[#0E2C75] text-[24px] cursor-pointer flex"
      >
        <BaseIcon
          name="chevron"
          class="rotate-180"
          @click="router.push('/')"
        ></BaseIcon>
        {{ "  Töleg goşmak" }}
      </div>
      <div class="text-[#516AA9] text-[20px]">
        {{ getFormatted(date) }}
      </div>
    </div>
    <div class="text-center text-[36px] mt-2 text-[#0E2C75] font-medium">
      2024-2025-nji okuw ýyly
    </div>

    <div class="grid grid-cols-2 gap-[200px] w-full mt-10">
      <div class="flex flex-col justify-start gap-4">
       
        <baseSelect
          :options="studyYearTypeOptions"
          v-model="studyYearType"
          placeholder="Okuw yylyny saylan"
          :error="studyYearTypeError"
          label="Töleg Görnüşi(Ýarym Ýyllyk)"
        ></baseSelect>
        <BaseUserInput
          :error="cashAmountError"
          v-model="cashAmount"
          type="number"
          label="Toleg Summa(tmt)"
        ></BaseUserInput>
      </div>
      <div>
        <label class="text-[#0E2C75] mb-2">Çek(*)</label>
        <BaseImgUpload
          :error="imageError"
          v-model="checkImage"
        ></BaseImgUpload>
      </div>
    </div>
    <button
      @click="addCash"
      class="bg-[#0E2C75] hover:bg-[#061641] mt-10 rounded-[6px] py-3 text-center w-full text-white font-bold"
    >
      Tölegi goş
    </button>
  </div>
</template>
<style scoped lang="scss"></style>
