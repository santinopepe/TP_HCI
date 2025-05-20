<template>
  <div class="flex justify-center items-center h-screen bg-[#d3e4cd] bg-[url('/images/fondo.png')] bg-cover bg-center bg-no-repeat">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
      <h2 class="text-2xl text-[#2e4b3f] mb-4">Recuperar Contraseña</h2>
      <p class="text-gray-600 mb-6">Ingresa tu Email o DNI para recuperar tu contraseña.</p>
      <form @submit.prevent="handleRecoverPassword">
        <div class="mb-6 text-left">
          <label for="email-dni" class="block mb-2 text-gray-800">Email o DNI</label>
          <input
            type="text"
            id="email-dni"
            v-model="emailOrDni"
            placeholder="Ingresa tu Email o DNI"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            :class="{ 'border-red-500': errorEmailOrDni }"
          />
          <p v-if="errorEmailOrDni" class="text-red-500 text-sm mt-1">{{ errorEmailOrDni }}</p>
        </div>
        <button
          type="submit"
          class="w-full p-3  text-white border-none rounded-md text-base cursor-pointer bg-[#5D8C39] hover:bg-[#5D8C39]/80"
        >
          Enviar
        </button>
      </form>
      <p class="mt-4 text-sm">
        <router-link to="/" class="text-[#2e4b3f] no-underline hover:underline">Volver al Inicio de Sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecoverPassword",
  data() {
    return {
      emailOrDni: "",
      errorEmailOrDni: ""
    };
  },
  methods: {
    handleRecoverPassword() {
      if (!this.emailOrDni) {
        this.errorEmailOrDni = "Por favor, ingresa tu Email o DNI.";
        return;
      }
      this.errorEmailOrDni = "";
      // Aquí continúa el proceso de recuperación...
    },
  },
};
</script>