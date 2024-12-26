<template>
  <div>
    <Dialog
      v-model:visible="visible"
      modal
      v-if="visible"
      header="Fakultete üýgeşme giriz"
      :style="{ width: '45rem' }"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-[200px]"
          >Fakultetiñ ady</label
        >
        <InputText
          id="username"
          class="flex-auto"
          autocomplete="off"
          v-model="facultyName"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-[200px]"
          >Fakultetiñ kody</label
        >
        <InputText
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="facultyCode"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-[200px]"
          >Fakultetiñ indeksi</label
        >
        <InputText
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="facultyIndex"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Delete"
          severity="danger"
          @click="deleteField"
        ></Button>
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Save" @click="updateField"></Button>
      </div>
    </Dialog>

    <BaseIcon @click="visible = true" name="settings" class="inline"></BaseIcon>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import BaseIcon from "@/components/base/base-icon.vue";
import { Button, Dialog, InputText } from "primevue";
import { useToast } from "primevue/usetoast";
import { useMyFetch } from "@/composables/useMyFetch";
import { useRoute, useRouter } from "vue-router";
const toast = useToast();
const router = useRouter();
const route = useRoute();
const props = defineProps({
  facultyData: {
    type: Object,
    default: {},
  },
});

const visible = ref(false);
const facultyName = ref();
const facultyCode = ref();
const facultyIndex = ref();
onMounted(() => {
  facultyName.value = props.facultyData.facultyName;
  facultyCode.value = props.facultyData["faculty-code"];
  facultyIndex.value = props.facultyData.indexOfFaculty;
});
watch(
  () => visible.value,
  () => {
    if (visible.value == false) {
      facultyName.value = "";
      facultyCode.value = "";
      facultyIndex.value = "";
    } else {
      facultyName.value = props.facultyData.facultyName;
      facultyCode.value = props.facultyData["faculty-code"];
      facultyIndex.value = props.facultyData.indexOfFaculty;
    }
  },
  { deep: true }
);
// /api/v1/admin/faculties/2
const updateField = async () => {
  const form = new FormData();
  form.append("faculty-name", facultyName.value);
  form.append("faculty-code", facultyCode.value);
  form.append("faculty-index", facultyIndex.value);

  const { data, error } = await useMyFetch(
    `/api/v1/admin/faculties/${props.facultyData?.facultyID}`,
    {
      method: "PUT",
      body: form,
    }
  );
  router.push({
    path: "/admin/dashboard",
    query: { ...route.query, update: true },
  });

  if (data) {
    show();
    visible.value = false;
  }
};
const deleteField = async () => {
  const { data, error } = await useMyFetch(
    `/api/v1/admin/faculties/${route.query.f}`,
    {
      method: "DELETE",
    }
  );

  if (data) {
    show();
    visible.value = false;
    router.push({
      path: "/admin/dashboard",
      query: { update: true },
    });
  }
};
const show = () => {
  toast.add({
    severity: "success",
    summary: "Info",
    detail: "Üstünlikli amala aşyryldy!",
    life: 3000,
  });
};
</script>

<style lang="scss" scoped>
</style>