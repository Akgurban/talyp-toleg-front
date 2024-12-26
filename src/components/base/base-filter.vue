<script setup>
import { reactive } from "vue";
import { useFilterStore } from "@/store/filter";
const store = useFilterStore();
const filter = reactive(store.filter);

const emit = defineEmits(["create"]);
watch(
  filter,
  (v) => {
    store.setFilter(v);
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="w-full h-full flex justify-between space-x-5 items-center">
    <div class="w-full">
      <BaseInput
        placeholder="Habarlardan gozlan"
        label="Gozleg"
        name="newsSearch"
        v-model="filter.search"
      />
    </div>
    <!-- <div class="w-[10%]">
      <BaseSelect
        v-model="filter.lang"
        label="Dil"
        :options="[
          { id: 'tm', text: 'TM' },
          { id: 'en', text: 'EN' },
          { id: 'ru', text: 'RU' },
        ]"
      >
      </BaseSelect>
    </div> -->
    <!-- <div class="w-[35%]">
      <BaseDateRange
        v-model:start-date="filter.startDate"
        v-model:end-date="filter.endDate"
      />
    </div> -->
    <!-- <div class="w-[15%]">
      <BaseSelect
        v-model="filter.status"
        label="Status"
        :options="[
          { id: 1, text: 'Hemmesi' },
          { id: 2, text: 'Aktiw' },
          { id: 3, text: 'Aktiw dal' },
        ]"
      >
      </BaseSelect>
    </div> -->
    <div class="mt-7">
      <BaseButton @click="emit('create')" class="bg-white h-[50px] !py-0">
        <p class="text-primary text-3xl">+</p></BaseButton
      >
    </div>
  </div>
</template>
