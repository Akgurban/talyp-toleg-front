<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useMyFetch } from "@/composables/useMyFetch";
import BaseIcon from "@/components/base/base-icon.vue";
import BaseCardAdmin from "@/components/base/base-card-admin.vue";

const toast = useToast();

const router = useRouter();
const route = useRoute();
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
const studentData = ref(null);
async function getPayments() {
  try {
    // simple data validation

    const { data, error } = await useMyFetch(
      `/api/v1/admin/student-payments?student-id=${route.params.id}`,
      {
        method: "GET",
      }
    );

    payments.value = data.value?.studentPayments?.items;
    studentData.value = data.value?.student;
  } catch (error) {
    throw error;
  }
}
async function updateStatus(a, b) {
  console.log(a, b);

  try {
    const form = new FormData();
    form.append("payment-status", a == 1 ? "Accepted" : "Rejected");

    // simple data validation
    const { data, error } = await useMyFetch(
      `/api/v1/admin/student-payments/update/${route.params.id}/${b}`,
      {
        method: "PUT",
        body: form,
      }
    );

    getPayments();
  } catch (error) {
    throw error;
  }
}
async function deletePayment(e) {

  try {
   
    // simple data validation
    const { data, error } = await useMyFetch(
      `/api/v1/admin/student-payments/delete/${route.params.id}/${e}`,
      {
        method: "DELETE",
      }
    );

    getPayments();
  } catch (error) {
    throw error;
  }
}
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between items-center">
      <div class="font-medium text-[#0E2C75] text-[24px] flex gap-3 items-end">
        <BaseIcon
          name="chevron"
          class="rotate-180"
          @click="router.go(-1)"
        ></BaseIcon>
        <div>{{ studentData?.name }} {{ studentData?.surname }}</div>
        <div class="flex items-center gap-3 pl-5">
          <div class="text-[#6a7caa] font-medium inline">
            {{ payments?.length }}
            {{ payments?.length > 1 ? "payments" : "payment" }}
          </div>
        </div>
      </div>
      <div class="text-[#516AA9] text-[20px]">
        {{ getFormatted(date) }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-7 w-full mt-10">
      <BaseCardAdmin
        :info="item"
        class=""
        v-for="item in payments"
        :key="item.id"
        @typeUpdate="(a, b) => updateStatus(a, b)"
        @delete="(e)=>deletePayment(e)"
        :edit-path="`/edit/${item.paymentID}`"
      ></BaseCardAdmin>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
