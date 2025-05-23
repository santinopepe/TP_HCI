<template>
  <!-- Modal for password change form -->
  <div v-if="showFormModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
      <!-- Close button -->
      <button
        @click="cancel"
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
        aria-label="Cerrar"
      >
        ×
      </button>
      <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Cambiar Contraseña</h1>

      <!-- Verificación del código -->
      <div v-if="!isCodeVerified">
        <p class="text-gray-600 mb-4 text-center">
          Por favor, ingresa el código que se envió a tu correo electrónico.
        </p>
        <form @submit.prevent="verifyCode">
          <div class="mb-4">
            <label for="code" class="block text-gray-700 font-medium mb-2">Código</label>
            <input
              type="text"
              id="code"
              v-model="code"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa el código"
              required
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              type="submit"
              class="bg-[#5D8C39] text-white py-2 px-4 rounded-lg hover:bg-[#5D8C39]/80"
            >
              Verificar Código
            </button>
          </div>
        </form>
      </div>

      <!-- Actualización de contraseña -->
      <div v-else>
        <p class="text-gray-600 mb-4 text-center">
          Ingresa tu nueva contraseña y confírmala.
        </p>
        <form @submit.prevent="updatePassword">
          <div class="mb-4">
            <label for="newPassword" class="block text-gray-700 font-medium mb-2">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa tu nueva contraseña"
              required
            />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-700 font-medium mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Repite tu nueva contraseña"
              required
            />
          </div>
          <div class="flex justify-between">
            <button
              type="submit"
              class="bg-[#5D8C39] text-white py-2 px-4 rounded-lg hover:bg-[#5D8C39]/80"
            >
              Actualizar Contraseña
            </button>
            <button
              type="button"
              @click="cancel"
              class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </div>

  <!-- Modal de éxito -->
  <transition name="fade">
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg px-8 py-8 flex flex-col items-center relative max-w-xs w-full">
        <button
          @click="closeSuccessModal"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Cerrar"
        >
          ×
        </button>
        <div class="flex flex-col items-center">
          <svg class="w-14 h-14 mb-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="#e6fbe6"/>
            <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M8 12l3 3 5-5"/>
          </svg>
          <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Contraseña actualizada</h2>
          <p class="text-gray-600 mb-6 text-center">Tu contraseña fue actualizada satisfactoriamente.</p>
          <button
            @click="closeSuccessModal"
            class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39] focus:outline-none"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>

  <!-- BotonRetroceder outside the modal -->
  <BotonRetroceder v-if="!showFormModal && !showSuccessModal" />
</template>

<script>
import BotonRetroceder from '../BotonRetroceder.vue';

export default {
  name: "CambiarContraseña",
  components: {
    BotonRetroceder,
  },
  data() {
    return {
      activeButton: 'perfil',
      code: "",
      isCodeVerified: false,
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      showSuccessModal: false,
      showFormModal: true, // Controls the visibility of the form modal
    };
  },
  methods: {
    verifyCode() {
      // Simula la verificación del código
      if (this.code === "123456") {
        this.isCodeVerified = true;
        this.errorMessage = "";
      } else {
        this.errorMessage = "El código ingresado es incorrecto.";
      }
    },
    updatePassword() {
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(this.newPassword)) {
        this.errorMessage =
          "La contraseña debe tener al menos 8 caracteres, un carácter especial (!@#$%^&*) y un número.";
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Las contraseñas no coinciden.";
        return;
      }

      // Mostrar modal de éxito
      this.errorMessage = "";
      this.showFormModal = false; // Hide form modal
      this.showSuccessModal = true; // Show success modal
      this.newPassword = "";
      this.confirmPassword = "";
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push('/perfil');
    },
    cancel() {
      this.showFormModal = false;
      this.$emit('update:activeButton', 'perfil');
      this.$router.push('/perfil');
    },
    setActiveButton(button) {
      this.activeButton = button;
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>