<script setup>
import { onMounted, reactive, ref } from "vue";
import baseSidebar from "@/components/sidebar/base-sidebar.vue";
import Header from "@/components/Header.vue";
import baseButton from "@/components/base/base-button.vue";
import baseCard from "@/components/base/base-card.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useMyFetch } from "@/composables/useMyFetch";

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

const widthSidebar = reactive(260);
const date = new Date();

onMounted(async () => {
  await getPayments();
});
const payments = ref(null);
async function getPayments() {
  try {
    // simple data validation

    const { data, error } = await useMyFetch("/api/v1/students/list-payments", {
      method: "GET",
    });

    payments.value = data.value?.items;
  } catch (error) {
    throw error;
  }
}
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between items-center">
      <div class="font-medium text-[#0E2C75] text-[24px]">Toleglerim</div>
      <div class="text-[#516AA9] text-[20px]">
        {{ getFormatted(date) }}
      </div>
    </div>
    <div class="flex mt-7 items-center gap-3">
      <baseButton icon="add" @click="router.push('/add')">Töleg goş</baseButton>
      <div class="text-[#6a7caa] font-medium">
        You have {{ payments?.length }}
        {{ payments?.length > 1 ? "payments" : "payment" }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-7 w-full mt-10">
      <baseCard
        :info="item"
        class=""
        v-for="item in payments"
        :key="item"
        :edit-path="`/edit/${item.paymentID}`"
      ></baseCard>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
