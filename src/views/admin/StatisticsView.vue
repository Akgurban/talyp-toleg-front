<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useMyFetch } from "@/composables/useMyFetch";
import { useRoute, useRouter } from "vue-router";
import Chart from "primevue/chart";
const router = useRouter();
const route = useRoute();

const statistics = ref(null);
const chartData1 = ref();
const chartData2 = ref();
const chartData3 = ref();
const chartOptions = ref();
onMounted(async () => {
  await getFaculties();
});
async function getFaculties() {
  try {
    // simple data validation

    const { data, error } = await useMyFetch(
      `/api/v1/admin/statistics/university?start-year=${2024}`,
      {
        method: "GET",
      }
    );

    statistics.value = data.value;

    chartData1.value = setChartData(
      "1-nji semestr tölanler",
      statistics.value?.firstSemester?.studentsFirstSemesterPaid,
      "1-nji semestr tölemedikler",
      statistics.value?.firstSemester?.studentsFirstSemesterNotPaid
    );
    chartData2.value = setChartData(
      "2-nji semestr tölanler",
      statistics.value?.secondSemester?.studentsSecondSemesterPaid,
      "2-nji semestr tölemedikler",
      statistics.value?.secondSemester?.studentsSecondSemesterNotPaid
    );
    chartData3.value = setChartData(
      "1-nji semestr tölanler",
      statistics.value?.bothSemester?.studentsBothSemesterPaid,
      "1-nji semestr tölemedikler",
      statistics.value?.bothSemester?.studentsBothSemesterNotPaid
    );
    chartOptions.value = setChartOptions();
  } catch (error) {
    throw error;
  }
}

const setChartData = (label1, value1, label2, value2) => {
  const documentStyle = getComputedStyle(document.body);
  return {
    labels: [label1, label2],
    datasets: [
      {
        data: [value1, value2],
        backgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-500"),
          documentStyle.getPropertyValue("--p-orange-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-400"),
          documentStyle.getPropertyValue("--p-orange-400"),
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
      <div class="text-[#516AA9] text-[20px]"></div>
    </div>

    <div class="card flex justify-start mt-5">
      <div class="card flex justify-between w-full">
        <div>
          <h2 class="text-center mx-auto mb-6 font-semibold text-[20px]">
            1nji semester
          </h2>
          <Chart
            type="pie"
            :data="chartData1"
            :options="chartOptions"
            class="w-full md:w-[20rem]"
          />
        </div>
        <div class="">
          <h2 class="text-center mx-auto mb-6 font-semibold text-[20px]">
            2nji semester
          </h2>
          <Chart
            type="pie"
            :data="chartData2"
            :options="chartOptions"
            class="w-full md:w-[20rem]"
          />
        </div>
        <div>
          <h2 class="text-center mx-auto mb-6 font-semibold text-[20px]">
            1nji we 2nji semester
          </h2>
          <Chart
            type="pie"
            :data="chartData3"
            :options="chartOptions"
            class="w-full md:w-[20rem]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
