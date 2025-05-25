<template>
  <div
    class="flex justify-center items-center h-screen bg-[#d3e4cd] bg-[url('/images/fondo.png')] bg-cover bg-center bg-no-repeat"
  >
    <!-- Contenedor principal -->
    <div class="w-full max-w-3xl p-4 box-border">
      <!-- Card que contiene todo -->
      <div class="bg-white rounded-2xl shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Sección izquierda con logo y texto -->
          <div
            class="flex-1 p-8 bg-gray-100 flex flex-col justify-center items-center text-center text-black"
          >
            <h1 class="text-5xl font-bold mb-4">SIM SIM</h1>
            <img
              src="/images/logo.png"
              alt="Logo SIM SIM"
              class="w-24 h-24 mb-6"
            />
            <p class="text-lg text-gray-600 mb-8">
              Tu dinero, tu ritmo. Pagá fácil, viví sin límites.
            </p>
            <!-- Iconos de redes sociales -->
            <div class="flex gap-4">
              <a href="#" class="text-[#2e4b3f] text-2xl hover:text-[#3a5c4b]">
                <i class="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" class="text-[#2e4b3f] text-2xl hover:text-[#3a5c4b]">
                <i class="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" class="text-[#2e4b3f] text-2xl hover:text-[#3a5c4b]">
                <i class="fab fa-twitter fa-lg"></i>
              </a>
            </div>
          </div>

          <!-- Sección derecha con el formulario -->
          <div class="flex-1 p-8 flex flex-col justify-center">
            <h2 class="text-3xl text-[#2e4b3f] mb-6 text-center">
              Inicio de Sesión
            </h2>
            <form @submit.prevent="handleSubmit">
              <!-- Campo Email -->
              <div class="mb-6 text-left">
                <label for="email" class="block mb-2 text-sm text-gray-800"
                  >Email o DNI</label
                >
                <input
                  type="text"
                  id="email"
                  v-model="email"
                  placeholder="Ingresa tu Email o DNI"
                  class="w-full p-3 border border-gray-300 rounded-l-md rounded-r-md text-base box-border"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                  {{ errors.email }}
                </p>
              </div>

              <!-- Campo Contraseña -->
              <div class="mb-6 text-left">
                <label for="password" class="block mb-2 text-sm text-gray-800"
                  >Contraseña</label
                >
                <div
                  class="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden"
                  :class="{ 'border-red-500': errors.password }"
                >
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    placeholder="Ingresa tu contraseña"
                    class="flex-1 p-3 border-none outline-none"
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="border-l border-gray-300 text-[#2e4b3f] text-sm p-3 cursor-pointer hover:text-[#3a5c4b] whitespace-nowrap"
                  >
                    {{ showPassword ? "Ocultar" : "Mostrar" }}
                  </button>
                </div>
                <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                  {{ errors.password }}
                </p>
                <button
                  type="button"
                  @click="goToRecuperar"
                  class="text-right text-sm text-[#2e4b3f] mt-2 bg-none border-none cursor-pointer hover:underline"
                >
                  Recuperar contraseña
                </button>
              </div>

              <!-- Mensaje de error arriba del botón de inicio -->
              <p v-if="loginError" class="text-red-500 text-center mb-4">
                {{ loginError }}
              </p>

              <!-- Botón de Inicio -->
              <button
                type="submit"
                class="w-full p-3 bg-[#5D8C39] text-white border-none rounded-md text-base cursor-pointer hover:bg-[#5D8C39]/80"
              >
                Inicio
              </button>
            </form>

            <!-- Enlace de Registro -->
            <p class="mt-4 text-sm text-gray-600 text-center">
              ¿Aún no tienes cuenta?
              <router-link
                to="/registro"
                class="text-[#2e4b3f] no-underline hover:underline"
                >Regístrate</router-link
              >
            </p>
            <p class="mt-2 text-sm text-gray-600 text-center">
              ¿No estás verificado?
              <router-link
                to="/verificacion"
                class="text-[#2e4b3f] no-underline hover:underline"
                >Verificate</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Credentials } from "../../api/user.js";
import { useSecurityStore } from "../store/securityStore.js";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loginError: "",
      errors: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      // Reset errors
      this.errors = {
        email: "",
        password: "",
      };
      this.loginError = "";

      // Validate fields
      let valid = true;
      if (!this.email) {
        this.errors.email = "El correo o DNI es obligatorio.";
        valid = false;
      }
      if (!this.password) {
        this.errors.password = "La contraseña es obligatoria.";
        valid = false;
      }

      if (!valid) return;

      try {
        const credentials = new Credentials(this.email, this.password);
        const security = useSecurityStore();
        await security.login(credentials, true);
        await security.getCurrentUser();
        this.$router.push("/paginaprincipal");
      } catch (e) {
        this.loginError = "La contraseña o el email son incorrectos.";
      }
    },
    goToRecuperar() {
      this.$router.push("/recover-password");
    },
  },
};
</script>
