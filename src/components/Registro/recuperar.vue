<template>
  <div class="flex justify-center items-center h-screen bg-[#d3e4cd] bg-[url('/images/fondo.png')] bg-cover bg-center bg-no-repeat">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
      <h2 class="text-2xl text-[#2e4b3f] mb-4">Recuperar contraseña</h2>
      <p class="text-gray-600 mb-6">Ingresa tu email o DNI para recuperar tu contraseña.</p>
      <form v-if="!showModal && !showSuccessModal" @submit.prevent="handleRecoverPassword">
        <div class="mb-6 text-left">
          <label for="email-dni" class="block mb-2 text-gray-800">Email o DNI</label>
          <input
            type="text"
            id="email-dni"
            v-model="emailOrDni"
            placeholder="Ingresa tu email o DNI"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            :class="{ 'border-red-500': errorEmailOrDni }"
          />
          <p v-if="errorEmailOrDni" class="text-red-500 text-sm mt-1">{{ errorEmailOrDni }}</p>
        </div>
        <button
          type="submit"
          class="w-full p-3 text-white border-none rounded-md text-base cursor-pointer bg-[#5D8C39] hover:bg-[#5D8C39]/80"
        >
          Enviar
        </button>
        <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
      </form>
      <p class="mt-4 text-sm" v-if="!showModal && !showSuccessModal">
        <router-link to="/" class="text-[#2e4b3f] no-underline hover:underline">Volver al inicio de sesión</router-link>
      </p>
    </div>
    <ModalActulizacionContrasenia
      v-if="showModal"
      :code="code"
      :newPassword="newPassword"
      :confirmPassword="confirmPassword"
      :errorMessage="modalError"
      @update:code="code = $event"
      @update:newPassword="newPassword = $event"
      @update:confirmPassword="confirmPassword = $event"
      @update-password="handleUpdatePassword"
      @cancel="showModal = false"
    />
    <ModalDeCambioExitoso
      v-if="showSuccessModal"
      @close="showSuccessModal = false"
    />
  </div>
</template>

<script>
import { useSecurityStore } from "../../components/store/securityStore.js";
import ModalActulizacionContrasenia from "../../components/Perfil/ModalActulizacionContrasenia.vue";
import ModalDeCambioExitoso from "../../components/Perfil/ModalDeCambioExitoso.vue";

export default {
  name: "RecoverPassword",
  components: { ModalActulizacionContrasenia, ModalDeCambioExitoso },
  data() {
    return {
      emailOrDni: "",
      errorEmailOrDni: "",
      successMessage: "",
      errorMessage: "",
      showModal: false,
      showSuccessModal: false,
      code: "",
      newPassword: "",
      confirmPassword: "",
      modalError: "",
      emailForReset: "",
    };
  },
  methods: {
    async handleRecoverPassword() {
      this.errorEmailOrDni = "";
      this.errorMessage = "";
      this.successMessage = "";
      if (!this.emailOrDni) {
        this.errorEmailOrDni = "Por favor, ingresa tu email o DNI.";
        return;
      }
      try {
        const securityStore = useSecurityStore();
        await securityStore.resetPassword(this.emailOrDni);
        this.successMessage = "Se ha enviado un código a tu email. Revisa tu bandeja de entrada.";
        this.emailForReset = this.emailOrDni;
        this.showModal = true;
      } catch (e) {
        this.errorMessage = e.description || "No se pudo enviar el email de recuperación.";
      }
    },
    async handleUpdatePassword() {
      this.modalError = "";
      if (!this.code || !this.newPassword || !this.confirmPassword) {
        this.modalError = "Todos los campos son obligatorios.";
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.modalError = "Las contraseñas no coinciden.";
        return;
      }
      try {
        const securityStore = useSecurityStore();
        await securityStore.changePassword({
          code: this.code,
          password: this.newPassword,
        });
        this.showModal = false;
        this.showSuccessModal = true;
      } catch (e) {
        this.modalError = e.description || "No se pudo actualizar la contraseña.";
      }
    },
  },
};
</script>