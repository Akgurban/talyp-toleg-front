<script setup>
import Header from "@/components/Header.vue";
import AdminSidebar from "@/components/sidebar/admin-sidebar.vue";
import { useMyFetch } from "@/composables/useMyFetch";
import { FloatLabel, InputText } from "primevue";
import { onMounted, reactive, ref, watch } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row";
const name = ref("");
const username = ref("");
const surname = ref("");
const results = ref(10);
const products = ref();
const columns = [
  { field: "studentSurname", header: "Familýasy" },
  { field: "studentName", header: "Ady" },
  { field: "studentUsername", header: "Ulanyjy ady" },
  { field: "facultyName", header: "Fakulteti" },
  { field: "groupCode", header: "Topary" },
];

const date = new Date();

onMounted(async () => {
  await getFaculties();
});
async function getFaculties() {
  try {
    // simple data validation

    const { data, error } = await useMyFetch(
      `/api/v1/admin/find-student?student-name=${name.value}&student-surname=${surname.value}&student-username=${username.value}&current-page=1&limit=10000`,
      {
        method: "GET",
      }
    );

    results.value = data.value?.items;
  } catch (error) {
    throw error;
  }
}

watch(
  () => name.value,
  async () => {
    await getFaculties();
  }
);
watch(
  () => username.value,
  async () => {
    await getFaculties();
  }
);
watch(
  () => surname.value,
  async () => {
    await getFaculties();
  }
);
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between items-center mt-3">
      <div class="font-medium text-[#0E2C75] text-[24px] flex gap-4">
     
        <FloatLabel variant="on" class="">
          <InputText id="Surname" v-model="surname" class="border" />
          <label for="Surname">Familýasy</label>
        </FloatLabel>
        <FloatLabel variant="on" class="">
          <InputText id="Name" v-model="name" class="border" />
          <label for="Name">Ady</label>
        </FloatLabel>
        <FloatLabel variant="on" class="">
          <InputText id="Username" v-model="username" class="border" />
          <label for="Username">Ulanyjy ady</label>
        </FloatLabel>
      </div>
      <div>Date</div>
    </div>

    <div>
     
      <DataTable :value="results" class="mt-6"  tableStyle="min-width: 50rem">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        >
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.p-inputtext:enabled:focus {
  border-color: #0e2c75 !important;

  outline: #0e2c75 !important;
  color: #0e2c75 !important;

  outline-offset: #0e2c75 !important;
}
.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(.p-inputwrapper-focus) label {
  color: #0e2c75 !important;
}
</style>
