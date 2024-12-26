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
          >groupba ady</label
        >
        <InputText
          id="username"
          class="flex-auto"
          autocomplete="off"
          v-model="groupCode"
        />
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-[200px]">Group indeksi</label>
        <InputText
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="groupIndex"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-[200px]">Kurs yyly</label>
        <InputText
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="courseYear"
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
import { useToast } from "primevue/usetoast";
import { useMyFetch } from "@/composables/useMyFetch";
import { useRoute, useRouter } from "vue-router";
import { Button, Dialog, InputText } from "primevue";
const toast = useToast();
const router = useRouter();
const route = useRoute();
const props = defineProps({
  groupData: {
    type: Object,
    default: {},
  },
});

const visible = ref(false);
const groupCode = ref();
const groupIndex = ref();
const courseYear = ref();
onMounted(() => {
  groupCode.value = props.groupData.groupCode;
  groupIndex.value = props.groupData.groupIndex;
  courseYear.value = props.groupData.courseYear;
});

watch(
  () => visible.value,
  () => {
    if (visible.value == false) {
      groupCode.value = "";
      groupIndex.value = "";
      courseYear.value = "";
    } else {
      groupCode.value = props.groupData.groupCode;
      groupIndex.value = props.groupData.groupIndex;
      courseYear.value = props.groupData.courseYear;
    }
  },
  { deep: true }
);
// /api/v1/admin/faculties/2
const updateField = async () => {
  const form = new FormData();
  form.append("group-code", groupCode.value);
  form.append("faculty-id", route.query.f);
  form.append("course-year", courseYear.value);
  form.append("group-index", groupIndex.value);

  const { data, error } = await useMyFetch(
    `/api/v1/admin/groups/${props.groupData?.groupID}`,
    {
      method: "PUT",
      body: form,
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
const deleteField = async () => {
  const { data, error } = await useMyFetch(
    `/api/v1/admin/groups/${props.groupData?.groupID}`,
    {
      method: "DELETE",
    }
  );

  if (data) {
    show();
    visible.value = false;

    router.push({
      path: "/admin/dashboard",
      query: { update: true, f: route.query.f },
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