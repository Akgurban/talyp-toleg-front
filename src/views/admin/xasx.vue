<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useMyFetch } from "@/composables/useMyFetch";
import { useRoute, useRouter } from "vue-router";
import Chart from "primevue/chart";
const router = useRouter();
const route = useRoute();



const statistics = ref(null);

onMounted(async () => {
  await getFaculties();
});
async function getFaculties() {
  try {
    // simple data validation
console.log('tttt');

    const { data, error } = await useMyFetch("/api/v1/admin/faculties?current-page=1&limit=10000", {
      method: "GET",
      body: {
        startYear: 2024,
      },
    });
console.log('iiiiii');

    statistics.value = data.value;
  } catch (error) {
    throw error;
  }
}

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-500"),
          documentStyle.getPropertyValue("--p-orange-500"),
          documentStyle.getPropertyValue("--p-gray-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-400"),
          documentStyle.getPropertyValue("--p-orange-400"),
          documentStyle.getPropertyValue("--p-gray-400"),
        ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  };
};
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between items-center">
      <div class="font-medium text-[#0E2C75] text-[24px]">Statistika</div>
      <div class="text-[#516AA9] text-[20px]">
      </div>
    </div>

    <div class="card flex justify-start mt-5">
      <!-- {{ statistics }} -->

      <div>
        <div class="card flex justify-center">
          <Chart
            type="pie"
            :data="chartData"
            :options="chartOptions"
            class="w-full md:w-[30rem]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
