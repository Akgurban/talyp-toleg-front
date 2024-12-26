<template>
  <div>
    <label class="text-white" >{{ label }}</label>
    <input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      :class="
        props.error !=='' ? 'placeholder:text-[#FF0004] border-[#FF0004]' : 'placeholder:text-[#5D6C87] border-[#fff]'
      "
      class="bg-white font-medium text-[#0E2C75] w-full border sm:px-6 px-4 h-[50px] rounded-[6px] focus:outline-none mt-1"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, default: "text" },
  label: { type: String, required: true },
  error: { type: String, default: '' },

  modelValue: { type: [String, Number], default: "" },
  placeholder: { type: String, default: "" },
  validate: { type: Function },
});
const emit = defineEmits(["update:modelValue"]);
const error = ref('');
function handleInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<style>
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
