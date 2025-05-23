<template>
  <div class="flex justify-center items-center min-h-screen bg-[#d3e4cd] bg-[url('/images/fondo.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
    <div class="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm flex flex-col items-center">
      <h3 class="text-xl font-bold mb-4 text-[#2e4b3f]">Verifica tu cuenta</h3>
      <p class="mb-4 text-gray-700 text-center">Ingresa el código que recibiste en tu correo para activar tu cuenta.</p>
      <input
        v-model="verificationCode"
        class="w-full mb-4 p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
        placeholder="Código de verificación"
      />
      <p v-if="verificationError" class="text-red-500 text-sm mb-2">{{ verificationError }}</p>
      <button
        @click="verifyCode"
        class="w-full p-3 text-white border-none rounded-lg text-base cursor-pointer bg-[#5D8C39] hover:bg-[#4e7531] transition"
      >
        Verificar
      </button>
      <button
        @click="cancelVerification"
        class="w-full mt-2 p-2 text-[#2e4b3f] border border-[#2e4b3f] rounded-lg text-base cursor-pointer bg-white hover:bg-gray-100 transition"
      >
        Cancelar
      </button>
      <p v-if="apiMessage" class="w-full mt-4 text-center text-base font-semibold text-green-600">{{ apiMessage }}</p>
      <p class="mt-6 text-sm">
        <router-link to="/" class="text-[#2e4b3f] no-underline hover:underline">Volver al Inicio de Sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { UserApi } from "../../api/user.js";

export default {
  name: 'VerificacionPage',
  data() {
    return {
      verificationCode: '',
      verificationError: '',
      apiMessage: '',
      email: ''
    };
  },
  created() {
    // Obtiene el email desde la query si viene de registro
    this.email = this.$route.query.email || '';
  },
  methods: {
    async verifyCode() {
      this.verificationError = '';
      if (!this.verificationCode) {
        this.verificationError = 'Debes ingresar el código.';
        return;
      }
      try {
        await UserApi.verify({ email: this.email, code: this.verificationCode });
        this.apiMessage = '¡Cuenta verificada correctamente! Ahora puedes iniciar sesión.';
      } catch (e) {
        let msg = '';
        if (e?.response?.data?.message) {
          msg = e.response.data.message;
        } else if (e?.message) {
          msg = e.message;
        } else {
          msg = 'Error al verificar el código.';
        }
        this.verificationError = msg;
      }
    },
    cancelVerification() {
      this.$router.push('/');
    }
  }
};
</script>