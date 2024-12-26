<script setup>

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
]);

const widthSidebar = reactive(260);
const date = new Date();

const addCash = () => {
  if (
    checkImage.value == null ||
    cashAmount.value == "" ||
    studyYear.value == "" ||
    studyYearType.value == ""
  ) {
    checkImage.value == null
      ? (imageError.value = "Suraty saylaň")
      : (imageError.value = "");

    cashAmount.value == ""
      ? (cashAmountError.value = "Doly dolduruň")
      : (cashAmountError.value = "");

    studyYear.value == ""
      ? (studyYearError.value = "Doly dolduruň")
      : (studyYearError.value = "");
    studyYearType.value == null
      ? (studyYearTypeError.value = "Doly dolduruň")
      : (studyYearTypeError.value = "");

    return;
  }
};
</script>
<template>
  <div class="h-screen overflow-auto">
    <div class="flex h-full">
      <sidebar-base></sidebar-base>

      <div :class="`w-[calc(100vw-264px)]`" class="flex flex-col ml-13">
        <header-base></header-base>
        <div class="h-[calc(100vh-146px)] pr-8 pl-2 overflow-scroll">
          <div class="flex justify-between items-center">
            <div
              class="font-medium text-[#0E2C75] text-[24px] cursor-pointer flex"
            >
              <base-icon
                name="chevron"
                @click="
                useRouter().push(`/admin/student`)
                "
                class="rotate-180"
              ></base-icon>
              Kerim Muhammedow
              <base-icon
                @click="
                  useRouter().push(`/admin/student/${useRoute().params.id}`)
                "
                name="chevron"
                class="rotate-180"
              ></base-icon>
              Utget
            </div>
            <div class="text-[#516AA9] text-[20px]">
              {{ getFormatted(date) }}
            </div>
          </div>
          <div class="text-center text-[36px] mt-2 text-[#0E2C75] font-medium">
            2024-2025-nji okuw ýyly
          </div>

          <div class="grid grid-cols-2 gap-[200px] w-full mt-10">
            <div class="flex flex-col justify-between">
              <base-select
                :options="studyYearOptions"
                v-model="studyYear"
                placeholder="Okuw yylyny saylan"
                :error="studyYearError"
                label="Okuw ýyly"
              ></base-select>
              <base-select
                :options="studyYearTypeOptions"
                v-model="studyYearType"
                placeholder="Okuw yylyny saylan"
                :error="studyYearTypeError"
                label="Töleg Görnüşi(Ýarym Ýyllyk)"
              ></base-select>
              <base-user-input
                :error="cashAmountError"
                v-model="cashAmount"
                type="number"
                label="Toleg Summa(tmt)"
              ></base-user-input>
            </div>
            <div>
              <label class="text-[#0E2C75] mb-2">Çek(*)</label>
              <base-img-upload
                :error="imageError"
                v-model="checkImage"
              ></base-img-upload>
            </div>
          </div>
          <button
            @click="addCash"
            class="bg-[#0E2C75] hover:bg-[#061641] mt-10 rounded-[6px] py-3 text-center w-full text-white font-bold"
          >
            Tölegi goş
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
