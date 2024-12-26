<script setup>
import BaseIcon from "@/components/base/base-icon.vue";
import BaseInput from "@/components/base/base-input.vue";
import { useMyFetch } from "@/composables/useMyFetch";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const user = ref("");
const userError = ref("");
const password = ref("");
const passwordError = ref("");
const typePassword = ref(true);

const router = useRouter();
const validate = () => {
  if (user.value == 0) {
    userError.value = "Doly giriziň";
  } else if (password.value == 0) {
    passwordError.value = "Doly Giriziň";
  } else {
    userError.value = "";
    passwordError.value = "";
  }
};

async function login() {
  try {
    // simple data validation
    if (user.value == "" || password.value == "") {
      validate();
      return;
    }
    const form = new FormData();
    form.append("username", user.value);
    form.append("password", password.value);

    const { data, error } = await useMyFetch("/api/v1/auth/login", {
      method: "POST",
      body: form,
    });

    if (data.value?.token) {
      localStorage.setItem("userData", JSON.stringify(data.value));

      if (data.value?.roleType == "admin") {
        
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
      show();
    } else {
      errorToast();
    }
  } catch (error) {
    throw error;
  }
}
const show = () => {
  toast.add({
    severity: "success",
    summary: "Info",
    detail: "Üstünlikli amala aşyryldy!",
    life: 3000,
  });
};
const errorToast = () => {
  toast.add({
    severity: "error",
    summary: "Info",
    detail: "Ýalňyşlyk ýüze çykdy",
    life: 3000,
  });
};
</script>

<template>
  <div
    class="backLogin flex justify-center items-center h-screen bg-[#0000008C]"
  >
    <div class="w-full h-full bg-[#0000008C] flex justify-center items-center">
      <div class="w-full max-w-md text-white">
        <h1 class="text-2xl font-bold text-center mb-6">Talyp Toleg</h1>
        <div class="text-3xl font-bold text-center mb-6">Hoş geldiňiz</div>
        <form class="text-black shadow-lg rounded px-8 pt-16 pb-8 mb-4">
          <div class="mb-4 mt-10">
            <BaseInput
              label="Ullanyjy Ady"
              id="username"
              name="username"
              type="text"
              :error="userError"
              placeholder="mtf232500"
              v-model="user"
            />
          </div>
          <div class="mb-6 relative">
            <BaseInput
              label="Açar sözi"
              id="password"
              name="password"
              :type="typePassword ? 'password' : 'text'"
              :error="passwordError"
              placeholder="Açar sözüni giriziň"
              v-model="password"
            />
            <div
              class="absolute bottom-3 right-3 cursor-pointer"
              @click="typePassword = !typePassword"
            >
              <div v-if="typePassword">
                <BaseIcon name="eyeOpened" />
              </div>
              <div v-else>
                <BaseIcon name="eyeClosed" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-[#0E2C75] hover:bg-[#0a2059] w-full text-white font-bold py-4 rounded-2xl focus:outline-none focus:shadow-outline"
              type="submit"
              @click.prevent="login"
            >
              Ulgama gir
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.backLogin {
  background-image: url("/tdu.jpeg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
