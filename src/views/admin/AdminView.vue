<script setup>
import GlobalListAdmin from "@/components/global-list-admin.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useMyFetch } from "@/composables/useMyFetch";
import { useRoute, useRouter } from "vue-router";
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

const menu = ref();
const faculties = ref([]);
const groups = ref([]);
const students = ref([]);

const widthSidebar = reactive(260);
const date = new Date();
onMounted(async () => {
  await getFaculties();
  if (route.query.f) {
    await getGroups();
  }
  if (route.query.g && route.query.f) {
    await getStudents();
  }
});
async function getFaculties() {
  try {
    // simple data validation

    const { data, error } = await useMyFetch(
      "/api/v1/admin/faculties?current-page=1&limit=10000",
      {
        method: "GET",
      }
    );

    faculties.value = data.value?.items;
  } catch (error) {
    throw error;
  }
}
watch(
  () => route.query.f,
  () => {
    getGroups();
  }
);
watch(
  () => route.query.g,
  () => {
    getStudents();
  }
);
watch(
  () => route.query.update,
  async () => {
    if (route.query.update == "true") {
      await getFaculties();
      await getGroups();
      await getStudents();

      router.push({
        path: "/admin/dashboard",
        query: { ...route.query, update: false },
      });
    }
  }
);

async function getGroups() {
  if (route.query?.f == undefined) {
    router.push("/admin/dashboard");
    return;
  }
  try {
    // simple data validation
    const { data, error } = await useMyFetch(
      `/api/v1/admin/faculties/list-groups?current-page=1&limit=500&faculty-id=${route.query.f}`,
      {
        method: "GET",
      }
    );
    groups.value = data.value?.items;
  } catch (error) {
    router.push("/admin/dashboard");
    throw error;
  }
}
async function getStudents() {
  console.log(route.query?.g, "ii");
  if (route.query?.g) {
    // router.push("/admin/dashboard");
    try {
      // simple data validation
      const { data, error } = await useMyFetch(
        `/api/v1/admin/groups/students?group-id=${route.query?.g}&current-page=1&limit=100`,
        {
          method: "GET",
        }
      );
      students.value = data.value?.items;
      if (error) {
        // router.push('/admin/dashboard')
      }
    } catch (error) {
      throw error;
    }
  }
}
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between items-center">
      <div class="font-medium text-[#0E2C75] text-[24px]">Fakultetlar</div>
      <div class="text-[#516AA9] text-[20px]">
        {{ getFormatted(date) }}
      </div>
    </div>

    <div class="card flex justify-start mt-5">
      <GlobalListAdmin
        :faculties="faculties"
        :groups="groups"
        :students="students"
      >
      </GlobalListAdmin>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
