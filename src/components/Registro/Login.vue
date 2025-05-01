<template>
  <div class="h-screen flex items-center justify-center bg-cover bg-center full-screen-bg overflow-hidden">
    <!-- Contenedor principal -->
    <div class="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl p-6 rounded-lg shadow-lg max-h-full">
      <!-- Sección izquierda con el logo y texto -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 md:mr-12">
        <h1 class="text-5xl font-bold text-green-700 mb-4">SIM SIM</h1>
        <img src="/images/logo.png" alt="Logo SIM SIM" class="w-32 h-32 mb-4" />
        <p class="text-xl text-gray-700 mb-6">
          Tu dinero, tu ritmo. Pagá fácil, viví sin límites.
        </p>
        <!-- Iconos de redes sociales -->
        <div class="flex space-x-4">
          <a href="#" class="text-gray-600 hover:text-green-700">
            <i class="fab fa-facebook fa-lg"></i>
          </a>
          <a href="#" class="text-gray-600 hover:text-green-700">
            <i class="fab fa-instagram fa-lg"></i>
          </a>
          <a href="#" class="text-gray-600 hover:text-green-700">
            <i class="fab fa-twitter fa-lg"></i>
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
            Inicio
          </button>
        </form>

        <!-- Enlace de Registro -->
        <p class="mt-4 text-center text-gray-600">
          ¿Aún no tienes cuenta?
          <a href="#" class="text-green-600 hover:underline">Regístrate</a>
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
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    },
  },
};
</script>

<style scoped>
.full-screen-bg {
  background-image: url('/images/fondo.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 88vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  padding: 0;
}

.h-screen {
  position: relative;
  z-index: 1;
}
</style>  