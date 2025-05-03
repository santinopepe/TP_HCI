<template>
  <div class="flex justify-center items-center h-screen bg-[#d3e4cd] bg-[url('/images/fondo.png')] bg-cover bg-center bg-no-repeat">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
      <h2 class="text-2xl text-[#2e4b3f] mb-4">Crear tu Cuenta</h2>
      <p class="text-gray-600 mb-6">Completa los datos para registrarte en SIM SIM.</p>
      <form @submit.prevent="register">
        <div class="mb-6 text-left">
          <label for="name" class="block mb-2 text-gray-800">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Ingresa tu nombre"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            required
          />
        </div>
        <div class="mb-6 text-left">
          <label for="email" class="block mb-2 text-gray-800">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Ingresa tu correo"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            required
          />
        </div>
        <div class="mb-6 text-left">
          <label for="dni" class="block mb-2 text-gray-800">DNI</label>
          <input
            type="text"
            id="dni"
            v-model="dni"
            placeholder="Ingresa tu DNI"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            required
          />
        </div>
        <div class="mb-6 text-left">
          <label for="phone" class="block mb-2 text-gray-800">Teléfono</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            placeholder="Ingresa tu teléfono"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full p-3 bg-[#2e4b3f] text-white border-none rounded-md text-base cursor-pointer hover:bg-[#3a5c4b]"
        >
          Registrarse
        </button>
        <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
      </form>
      <p class="mt-4 text-sm">
        <router-link to="/" class="text-[#2e4b3f] no-underline hover:underline">Volver al Inicio de Sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistroPage',
  data() {
    return {
      name: '',
      email: '',
      dni: '',
      phone: '',
      error: ''
    };
  },
  methods: {
    register() {
      console.log('Registrando:', { name: this.name, email: this.email, dni: this.dni, phone: this.phone });
      if (!this.name || !this.email || !this.dni || !this.phone) {
        this.error = 'Por favor, completa todos los campos.';
        return;
      }
      this.error = '';
    }
  }
};
</script>