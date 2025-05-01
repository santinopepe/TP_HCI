<template>
  <div class="min-h-screen flex items-center justify-center bg-green-100 bg-opacity-50">
    <!-- Contenedor principal -->
    <div class="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-6">
      <!-- Sección izquierda con el logo y texto -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 md:mr-12">
        <div class="mb-4">
          <h1 class="text-5xl font-bold text-green-700">SIM SIM</h1>
        </div>
        <p class="text-xl text-gray-700">
          Tu dinero, tu ritmo. Pagá fácil, viví sin límites.
        </p>
        <!-- Iconos de redes sociales -->
        <div class="flex space-x-4 mt-6">
          <a href="#" class="text-gray-600 hover:text-green-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.82c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.67.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.56.94.56 1.89v2.8c0 .27.19.58.69.48A10.01 10.01 0 0022 12.04c0-5.52-4.48-10-10-10z"/>
            </svg>
          </a>
          <a href="#" class="text-gray-600 hover:text-green-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.82c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.67.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.56.94.56 1.89v2.8c0 .27.19.58.69.48A10.01 10.01 0 0022 12.04c0-5.52-4.48-10-10-10z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Sección derecha con el formulario -->
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Inicio de Sesión</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Campo Email -->
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2">
              Email o DNI
            </label>
            <input
              type="text"
              id="email"
              v-model="email"
              placeholder="Ingresa tu Email o DNI"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <!-- Campo Contraseña -->
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Ingresa tu contraseña"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m-4.332-.772A12.047 12.047 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-4.332.772l-4.5-4.5m0 0l4.5 4.5M1 1l22 22"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
            <a href="#" class="text-sm text-green-600 hover:underline mt-2 block">
              Recuperar contraseña
            </a>
          </div>

          <!-- Botón de Inicio -->
          <button
            type="submit"
            class="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            INICIO
          </button>
        </form>

        <!-- Enlace de Registro -->
        <p class="mt-4 text-center text-gray-600">
          ¿Aún no tienes cuenta?
          <a href="#" class="text-green-600 hover:underline">Regístrarse</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      // Aquí puedes agregar la lógica para manejar el envío del formulario
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Ejemplo: enviar datos a una API o redirigir al usuario
    },
  },
};
</script>