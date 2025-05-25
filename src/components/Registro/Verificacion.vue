<template>
  <div
    class="flex justify-center items-center min-h-screen bg-[#d3e4cd] bg-[url('/images/fondo.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
  >
    <div
      class="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm flex flex-col items-center"
    >
      <h3 class="text-xl font-bold mb-4 text-[#2e4b3f]">Verifica tu cuenta</h3>
      <p class="mb-4 text-gray-700 text-center">
        Ingresa tu correo electrónico y el código que recibiste para activar tu
        cuenta.
      </p>
      <div class="w-full mb-4">
        <input
          v-model="email"
          class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
          :class="{ 'border-red-500': errors.email }"
          placeholder="Correo electrónico"
          type="email"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">
          {{ errors.email }}
        </p>
      </div>
      <div class="w-full mb-4">
        <input
          v-model="verificationCode"
          class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
          :class="{ 'border-red-500': errors.verificationCode }"
          placeholder="Código de verificación"
        />
        <p v-if="errors.verificationCode" class="text-red-500 text-sm mt-1">
          {{ errors.verificationCode }}
        </p>
      </div>
      <button
        @click="verifyCode"
        class="w-full p-3 text-white border-none rounded-lg text-base cursor-pointer bg-[#5D8C39] hover:bg-[#4e7531] transition"
      >
        Verificar
      </button>
      <p
        v-if="apiMessage"
        class="w-full mt-4 text-center text-base font-semibold text-green-600"
      >
        {{ apiMessage }}
      </p>
      <p class="mt-6 text-sm">
        <router-link to="/" class="text-[#2e4b3f] no-underline hover:underline"
          >Volver al Inicio de Sesión</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { UserApi } from "../../api/user.js";
import { ContactsApi, Contact } from "../../api/contacts.js";

export default {
  name: "VerificacionPage",
  data() {
    return {
      verificationCode: "",
      email: "",
      apiMessage: "",
      errors: {
        email: "",
        verificationCode: "",
      },
    };
  },
  created() {
    this.email = this.$route.query.email || "";
  },
  methods: {
    async verifyCode() {
      // Reset errors
      this.errors = {
        email: "",
        verificationCode: "",
      };
      this.apiMessage = "";

      // Validate fields
      let valid = true;
      if (!this.email) {
        this.errors.email = "El correo electrónico es obligatorio.";
        valid = false;
      }
      if (!this.verificationCode) {
        this.errors.verificationCode =
          "El código de verificación es obligatorio.";
        valid = false;
      }
      try {
        await UserApi.verify({ email: this.email, code: this.verificationCode });

        this.apiMessage = '¡Cuenta verificada correctamente! Ahora puedes iniciar sesión.';
      } catch (e) {
        let msg = "";
        if (e?.response?.data?.message) {
          msg = e.response.data.message;
        } else if (e?.message) {
          msg = e.message;
        } else {
          msg = "Error al verificar el código.";
        }
        this.errors.verificationCode = msg;
      }
    },
    cancelVerification() {
      this.$router.push("/");
    },
  },
};
</script>
