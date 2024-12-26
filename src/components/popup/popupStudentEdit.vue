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
        <label for="name" class="font-semibold w-[200px]">Student ady </label>
        <InputText
          id="name"
          class="flex-auto"
          autocomplete="off"
          v-model="name"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="surname" class="font-semibold w-[200px]"
          >Student familyasy</label
        >
        <InputText
          id="surname"
          class="flex-auto"
          autocomplete="off"
          v-model="surname"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-[200px]"
          >Student ulanyjy ady</label
        >
        <InputText
          id="username"
          class="flex-auto"
          autocomplete="off"
          v-model="username"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="password" class="font-semibold w-[200px]"
          >Student taze paroly</label
        >
        <InputText
          id="password"
          class="flex-auto"
          autocomplete="off"
          v-model="password"
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

    <BaseIcon
      @click.stop="visible = true"
      name="settings"
      class="inline"
    ></BaseIcon>
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
  studentData: {
    type: Object,
    default: {},
  },
});

const visible = ref(false);
const name = ref();
const surname = ref();
const username = ref();
const password = ref(null);
onMounted(() => {
  username.value = props.studentData.username;
  name.value = props.studentData.name;
  surname.value = props.studentData.surname;
  // password.value = props.studentData.password;
});

watch(
  () => visible.value,
  () => {
    if (visible.value == false) {
      name.value = "";
      surname.value = "";
      username.value = "";
      password.value = "";
    } else {
      username.value = props.studentData.username;
      name.value = props.studentData.name;
      surname.value = props.studentData.surname;
    }
  },
  { deep: true }
);
// /api/v1/admin/faculties/2
const updateField = async () => {
  const form = new FormData();
  form.append("name", name.value);
  form.append("surname", surname.value);
  form.append("username", username.value);
  form.append("group-id", route.query.g);
  if (password.value) {
    form.append("password", password.value);
  }

  const { data, error } = await useMyFetch(
    `/api/v1/admin/update-student/${props.studentData.id}`,
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

      query: { update: true, f: route.query.f, g: route.query.g },
    });
  }
};
const deleteField = async () => {
  const { data, error } = await useMyFetch(
    `/api/v1/admin/delete-student/${props.studentData.id}`,
    {
      method: "DELETE",
    }
  );

  if (data) {
    show();
    visible.value = false;

    router.push({
      path: "/admin/dashboard",
      query: { update: true, f: route.query.f, g: route.query.g },
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