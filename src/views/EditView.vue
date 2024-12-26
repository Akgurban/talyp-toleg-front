<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import baseSelect from '@/components/base/base-select.vue';
import baseSidebar from '@/components/sidebar/base-sidebar.vue';
import Header from '@/components/Header.vue';
import BaseUserInput from '@/components/base/base-user-input.vue';
import BaseImgUpload from '@/components/base/base-img-upload.vue';
import BaseIcon from '@/components/base/base-icon.vue';
import { useMyFetch } from '@/composables/useMyFetch';
import { Button } from 'primevue';
import { useToast } from "primevue/usetoast";
const router =useRouter()
const route =useRoute()
const payment=ref(null)
const toast = useToast();

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

onMounted(async()=>{
 await getPayment()
})
async function getPayment() {
 
  try {
    // simple data validation

    const { data, error } = await useMyFetch(`/api/v1/students/get-payment?payment-id=${route.params.id}`, {
      method: "GET",
    });

    payment.value=data.value.response
    studyYearType.value=studyYearTypeOptions.value[+payment.value.paymentType-1]
    cashAmount.value=payment.value.paymentAmount
  } catch (error) {
    throw error;
  }
}

const addCash = async() => {
  if (
   
    cashAmount.value == "" ||
    studyYear.value == "" ||
    studyYearType.value == ""
  ){

  cashAmount.value == ""
    ? (cashAmountError.value = "Doly dolduruň")
    : (cashAmountError.value = "");

  studyYear.value == ""
    ? (studyYearError.value = "Doly dolduruň")
    : (studyYearError.value = "");
  studyYearType.value == null
    ? (studyYearTypeError.value = "Doly dolduruň")
    : (studyYearTypeError.value = "");

    // return;
  }

  const form = new FormData();
    form.append("current-paid-sum", cashAmount.value);
    form.append("payment-type", studyYearType.value?.name=='I ýarymýyllyk'?'1': studyYearType.value?.name=='II ýarymýyllyk' ? '2':"3" );
   if(checkImage.value){
     form.append("check-photo", checkImage.value);
    }

    const { data, error } = await useMyFetch(`/api/v1/students/update-payment/${route.params.id}`, {
      method: "PUT",
      body: form,
    });
    if(data){
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
      <BaseIcon name="chevron" class="rotate-180" @click="router.push('/')"></baseIcon> {{ "  Tölegi üýtgetmek" }}
    </div>
      <div class="text-[#516AA9] text-[20px]">
        {{ getFormatted(date) }}
      </div>
    </div>
    <div class="text-center text-[36px] mt-2 text-[#0E2C75] font-medium">
      2024-2025-nji okuw ýyly
    </div>

    <div class="grid grid-cols-2 gap-[200px] w-full mt-10">
      <div class="flex flex-col justify-start">
        
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
          class="mt-3"
          placeholder="7906"
          label="Toleg Summa(tmt)"
        ></BaseUserInput>
      </div>
      <div>
        <label class="text-[#0E2C75] mb-2">Çek(*)</label>
        <BaseImgUpload
          :error="imageError"
          :current-img="payment?.checkPhotoURL"
          v-model="checkImage"
        ></BaseImgUpload>
      </div>
    </div>
    <Button
    severity="warn"
      @click="addCash"
      class="bg-[#0E2C75] hover:bg-[#061641] mt-10 rounded-[6px] py-3 text-center w-full text-white font-bold"
    >
      Tölegi üýtget
    </Button>
  </div>
</template>
<style scoped lang="scss"></style>
