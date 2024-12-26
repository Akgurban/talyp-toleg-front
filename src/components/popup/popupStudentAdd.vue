<template>
  <div class="w-full">
    <Dialog
      v-model:visible="visible"
      modal
      v-if="visible"
      header="Talyp goşuň"
      :style="{ width: '45rem' }"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-[200px]">Talyp ady</label>
        <InputText
          id="username"
          class="flex-auto"
          autocomplete="off"
          v-model="name"
        />
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-[200px]"
          >Talyp familyasy</label
        >
        <InputText
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="surname"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-[200px]"
          >Talyp username</label
        >
        <InputText
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="username"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-[200px]">Talyp parol</label>
        <InputText
          type="text"
          id="email"
          class="flex-auto"
          autocomplete="off"
          v-model="password"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Save" @click="updateField"></Button>
      </div>
    </Dialog>

    <Button
      severity="help"
      @click="visible = true"
      name="settings"
      class="inline w-full"
      >Talyp goş</Button
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseIcon from "@/components/base/base-icon.vue";
import { Button, Dialog, InputText } from "primevue";
import { useToast } from "primevue/usetoast";
import { useMyFetch } from "@/composables/useMyFetch";
import { useRoute, useRouter } from "vue-router";
import GlobalListAdmin from "@/components/global-list-admin.vue";
const toast = useToast();
const router = useRouter();
const route = useRoute();

const visible = ref(false);
const password = ref();
const name = ref();
const surname = ref();
const username = ref();

// /api/v1/admin/faculties/2
const updateField = async () => {
  const form = new FormData();

  form.append("group-id", route.query?.g);
  form.append("name", name.value);
  form.append("surname", surname.value);
  form.append("username", username.value);
  form.append("password", password.value);

  const { data, error } = await useMyFetch(`/api/v1/admin/create-student`, {
    method: "POST",
    body: form,
  });
  router.push({
    path: "/admin/dashboard",
    query: { ...route.query, update: true },
  });

  if (data) {
    show();
    name.value = "";
    username.value = "";
    surname.value = "";
    password.value = "";
    visible.value = false;
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