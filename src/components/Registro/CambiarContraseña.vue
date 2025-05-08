<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <!-- Barra lateral -->
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />
    
    <!-- Contenido principal -->
    <main class="flex-1 flex flex-col items-center justify-center bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
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
            <div class="flex justify-between">
              <button
                type="submit"
                class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Verificar Código
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
                class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
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
    </main>
  </div>
</template>

<script>
import BarraLateral from '../Inicio/BarraLateral.vue';

export default {
  name: "CambiarContraseña",
  components: {
    BarraLateral,
  },
  data() {
    return {
      activeButton: 'perfil',
      code: "",
      isCodeVerified: false,
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
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
      // Validación de la nueva contraseña
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(this.newPassword)) {
        this.errorMessage =
          "La contraseña debe tener al menos 8 caracteres, un carácter especial y un número.";
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Las contraseñas no coinciden.";
        return;
      }

      // Simula la actualización de la contraseña
      alert("¡Contraseña actualizada con éxito!");
      this.errorMessage = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
    cancel() {
      this.$emit('update:activeButton', 'perfil'); // Actualiza el botón activo a "perfil"
      this.$router.push('/perfil'); // Redirige al perfil
    },
    setActiveButton(button) {
      this.activeButton = button;
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
</style>