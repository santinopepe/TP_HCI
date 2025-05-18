<template>
  <div class="flex justify-center items-center h-screen bg-[#d3e4cd] bg-[url('/images/fondo.png')] bg-cover bg-center bg-no-repeat">
    <div class="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
      <h2 class="text-2xl text-[#2e4b3f] mb-1">Crear tu Cuenta</h2>
      <p class="text-gray-600 mb-4">Completa los datos para registrarte en SIM SIM.</p>
      <form @submit.prevent="register">
        <div class="mb-6 text-left">
          <label for="name" class="block mb-2 text-gray-800">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Ingresa tu nombre"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>
        <div class="mb-6 text-left">
          <label for="email" class="block mb-2 text-gray-800">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Ingresa tu correo"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div class="mb-6 text-left">
          <label for="dni" class="block mb-2 text-gray-800">DNI</label>
          <input
            type="text"
            id="dni"
            v-model="dni"
            placeholder="Ingresa tu DNI"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            :class="{ 'border-red-500': errors.dni }"
          />
          <p v-if="errors.dni" class="text-red-500 text-sm mt-1">{{ errors.dni }}</p>
        </div>
        <div class="mb-6 text-left">
          <label for="phone" class="block mb-2 text-gray-800">Teléfono</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            placeholder="Ingresa tu teléfono"
            class="w-full p-3 border border-gray-300 rounded-md text-base"
            :class="{ 'border-red-500': errors.phone }"
          />
          <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
        </div>
        <button
          type="submit"
          class="w-full p-3 bg-[#2e4b3f] text-white border-none rounded-md text-base cursor-pointer hover:bg-[#3a5c4b]"
        >
          Registrarse
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
  name: 'RegistroPage',
  data() {
    return {
      name: '',
      email: '',
      dni: '',
      phone: '',
      errors: {
        name: '',
        email: '',
        dni: '',
        phone: ''
      }
    };
  },
  methods: {
    register() {
      let valid = true;
      // Validación campo por campo
      if (!this.name) {
        this.errors.name = 'El nombre es obligatorio.';
        valid = false;
      } else {
        this.errors.name = '';
      }
      if (!this.email) {
        this.errors.email = 'El correo es obligatorio.';
        valid = false;
      } else {
        this.errors.email = '';
      }
      if (!this.dni) {
        this.errors.dni = 'El DNI es obligatorio.';
        valid = false;
      } else {
        this.errors.dni = '';
      }
      if (!this.phone) {
        this.errors.phone = 'El teléfono es obligatorio.';
        valid = false;
      } else {
        this.errors.phone = '';
      }
      if (!valid) return;
      // Si todo está bien, puedes continuar con el registro
      // ...
    }
  }
};
</script>