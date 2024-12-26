<script setup>
import { computed } from "vue";

const props = defineProps({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

const startDateModelValue = computed({
  get: () => props.startDate,
  set: (val) => emit("update:startDate", val),
});

const endDateModelValue = computed({
  get: () => props.endDate,
  set: (val) => emit("update:endDate", val),
});

const emit = defineEmits(["update:startDate", "update:endDate"]);
</script>
<template>
  <div class="flex">
    <div class="w-1/2">
      <BaseInput
        label="Wagt aralygy"
        name="startDate"
        type="date"
        :modelValue="startDateModelValue"
        @update:modelValue="startDateModelValue = $event"
      />
    </div>
    <div class="w-1/2">
      <BaseInput
        class="mt-6 border-l-2"
        name="endDate"
        label=""
        type="date"
        :modelValue="endDateModelValue"
        @update:modelValue="endDateModelValue = $event"
      />
    </div>
  </div>
</template>
