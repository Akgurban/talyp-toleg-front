<script setup>
const fileInput = ref(null);
const img = ref(null);
const file = ref(null);

const props = defineProps({
  placeholder: { type: String, default: "Kanunyň PDF formatyny ýükläň" },
});

const emit = defineEmits(["update:modelValue"]);

function showFileUpload() {
  fileInput.value.click();
}

function setImg(event) {
  emit("update:modelValue", event.target.files[0]);
  file.value = event.target.files[0];
}
</script>
<template>
  <div
    @click="showFileUpload"
    class="cursor-pointer border-dashed border-2 flex justify-center items-center bg-white hover:bg-white/50 text-[#ddd] w-full relative h-100 py-6"
  >
    <div
      class="bg-[#D9D9D9] text-white flex justify-center items-center h-60 w-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="w-10">
        <IconPlus />
      </div>
    </div>
    <p class="mt-auto text-black" v-if="file">
      {{ file.name }}
    </p>
    <p class="mt-auto text-black" v-else>{{ props.placeholder }}</p>
    <input
      @input="setImg"
      ref="fileInput"
      accept="application/pdf"
      type="file"
      class="hidden"
    />
  </div>
</template>
