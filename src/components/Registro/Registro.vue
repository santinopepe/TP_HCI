<template>
  <div
    class="flex justify-center items-center min-h-screen bg-[#d3e4cd] bg-[url('/images/fondo.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
  >
    <div
      class="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col items-center"
    >
      <h2 class="text-3xl text-[#2e4b3f] mb-2 font-bold">Crear tu cuenta</h2>
      <p class="text-gray-600 mb-6">
        Completa los datos para registrarte en SIM SIM.
      </p>
      <div
        v-if="showSuccessModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      >
        <div
          class="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center"
        >
          <div
            class="w-16 h-16 bg-[#5D8C39] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-[#2e4b3f] mb-2 text-center">
            Usuario creado con éxito
          </h3>
          <p class="text-gray-700 mb-6 text-center">
            Tu usuario fue registrado correctamente.<br />Por favor, verifica tu
            correo electrónico.
          </p>
          <button
            @click="goBack"
            class="w-full p-3 text-white rounded-lg text-base cursor-pointer"
            :style="{ backgroundColor: '#5D8C39' }"
          >
            OK
          </button>
        </div>
      </div>
      <p
        v-if="apiMessage && !showSuccessModal"
        class="w-full mb-4 text-center text-base font-semibold text-red-600"
      >
        {{ apiMessage }}
      </p>
      <form v-if="!showSuccessModal" @submit.prevent="register" class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block mb-1 text-gray-800 font-medium"
              >Nombre</label
            >
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              placeholder="Ingresa tu nombre"
              class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
              :class="{ 'border-red-500': errors.firstName }"
            />
            <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">
              {{ errors.firstName }}
            </p>
          </div>
          <div>
            <label for="lastName" class="block mb-1 text-gray-800 font-medium"
              >Apellido</label
            >
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              placeholder="Ingresa tu apellido"
              class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
              :class="{ 'border-red-500': errors.lastName }"
            />
            <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">
              {{ errors.lastName }}
            </p>
          </div>
          <div>
            <label for="birthDate" class="block mb-1 text-gray-800 font-medium"
              >Fecha de nacimiento</label
            >
            <input
              type="date"
              id="birthDate"
              v-model="birthDate"
              class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
              :class="{ 'border-red-500': errors.birthDate }"
            />
            <p v-if="errors.birthDate" class="text-red-500 text-sm mt-1">
              {{ errors.birthDate }}
            </p>
          </div>
          <div>
            <label for="email" class="block mb-1 text-gray-800 font-medium"
              >Correo electrónico</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Ingresa tu correo"
              class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>
        </div>
        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="password" class="block mb-1 text-gray-800 font-medium"
              >Contraseña</label
            >
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Ingresa tu contraseña"
                class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition pr-10"
                :class="{ 'border-red-500': errors.password }"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                @click="showPassword = !showPassword"
                tabindex="-1"
                aria-label="Mostrar/Ocultar contraseña"
              >
                <svg
                  v-if="showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.5"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3l18 18M1.5 12s4-7.5 10.5-7.5c2.5 0 4.7.7 6.5 1.8M22.5 12s-4 7.5-10.5 7.5c-2.5 0-4.7-.7-6.5-1.8M9.5 9.5a3.5 3.5 0 0 1 5 5"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>
          <div>
            <label
              for="confirmPassword"
              class="block mb-1 text-gray-800 font-medium"
              >Confirmar contraseña</label
            >
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Repite tu contraseña"
                class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition pr-10"
                :class="{ 'border-red-500': errors.confirmPassword }"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                @click="showConfirmPassword = !showConfirmPassword"
                tabindex="-1"
                aria-label="Mostrar/Ocultar confirmar contraseña"
              >
                <svg
                  v-if="showConfirmPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.5"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3l18 18M1.5 12s4-7.5 10.5-7.5c2.5 0 4.7.7 6.5 1.8M22.5 12s-4 7.5-10.5 7.5c-2.5 0-4.7-.7-6.5-1.8M9.5 9.5a3.5 3.5 0 0 1 5 5"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="dni" class="block mb-1 text-gray-800 font-medium"
              >DNI</label
            >
            <input
              type="text"
              id="dni"
              v-model="dni"
              placeholder="Ingresa tu DNI"
              class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
              :class="{ 'border-red-500': errors.dni }"
            />
            <p v-if="errors.dni" class="text-red-500 text-sm mt-1">
              {{ errors.dni }}
            </p>
          </div>
          <div>
            <label for="phone" class="block mb-1 text-gray-800 font-medium"
              >Teléfono</label
            >
            <input
              type="tel"
              id="phone"
              v-model="phone"
              placeholder="Ingresa tu teléfono"
              class="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#5D8C39] outline-none transition"
              :class="{ 'border-red-500': errors.phone }"
            />
            <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
              {{ errors.phone }}
            </p>
          </div>
        </div>
        <button
          type="submit"
          class="w-full mt-8 p-3 text-white border-none rounded-lg text-base cursor-pointer bg-[#5D8C39] hover:bg-[#4e7531] transition"
        >
          Registrarse
        </button>
      </form>
      <p class="mt-6 text-sm">
        <router-link to="/" class="text-[#2e4b3f] no-underline hover:underline"
          >Volver al inicio de sesión</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { useSecurityStore } from "../store/securityStore.js";


export default {
  name: "RegistroPage",
  data() {
    return {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      password: "",
      confirmPassword: "",
      dni: "",
      phone: "",
      showPassword: false,
      showConfirmPassword: false,
      apiMessage: "",
      showSuccessModal: false,
      errors: {
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        password: "",
        confirmPassword: "",
        dni: "",
        phone: "",
      },
    };
  },
  methods: {
    async register() {
      let valid = true;
      if (!this.firstName) {
        this.errors.firstName = "El nombre es obligatorio.";
        valid = false;
      } else {
        this.errors.firstName = "";
      }
      if (!this.lastName) {
        this.errors.lastName = "El apellido es obligatorio.";
        valid = false;
      } else {
        this.errors.lastName = "";
      }
      if (!this.birthDate) {
        this.errors.birthDate = "La fecha de nacimiento es obligatoria.";
        valid = false;
      } else {
        this.errors.birthDate = "";
      }
      if (!this.email) {
        this.errors.email = "El correo es obligatorio.";
        valid = false;
      } else {
        this.errors.email = "";
      }
      if (!this.password) {
        this.errors.password = "La contraseña es obligatoria.";
        valid = false;
      } else {
        this.errors.password = "";
      }
      if (!this.confirmPassword) {
        this.errors.confirmPassword = "Debes confirmar la contraseña.";
        valid = false;
      } else if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = "Las contraseñas no coinciden.";
        valid = false;
      } else {
        this.errors.confirmPassword = "";
      }
      if (!this.dni) {
        this.errors.dni = "El DNI es obligatorio.";
        valid = false;
      } else if (this.dni.length < 6 || this.dni.length > 9) {
        this.errors.dni = "El DNI debe tener entre 6 y 9 caracteres.";
        valid = false;
      } else {
        this.errors.dni = "";
      }
      if (!this.phone) {
        this.errors.phone = "El teléfono es obligatorio.";
        valid = false;
      } else {
        this.errors.phone = "";
      }
      if (!valid) return;

      try {
        this.apiMessage = "";

        const user = useSecurityStore().createUser(
          this.firstName,
          this.lastName,
          this.birthDate,
          this.email,
          this.password,
          this.dni,
          this.phone
        );

        const security = useSecurityStore();
        await security.register(user);
        this.showSuccessModal = true;
      } catch (e) {
        let msg = "";
        if (e?.response?.data?.message) {
          msg = e.response.data.message;
        } else if (e?.message) {
          msg = e.message;
        } else {
          msg = "Error al registrar usuario.";
        }
        if (msg === "Email already in use.") {
          this.apiMessage = "El correo electrónico ya está en uso.";
        } else if (msg === "User already exists.") {
          this.apiMessage = "El usuario ya existe.";
        } else if (msg === "Invalid email format.") {
          this.apiMessage = "El formato del correo es inválido.";
        } else if (msg === "Invalid password format.") {
          this.apiMessage = "El formato de la contraseña es inválido.";
        } else if (msg === "Invalid phone format.") {
          this.apiMessage = "El formato del teléfono es inválido.";
        } else if (msg === "User must be at least 13 years old.") {
          this.apiMessage = "El usuario debe tener al menos 13 años.";
        } else if (msg === "Password must be at least 6 characters long.") {
          this.apiMessage = "La contraseña debe tener al menos 6 caracteres.";
        } else {
          this.apiMessage = msg;
        }
      }
    },
    goBack() {
      this.showSuccessModal = false;
      this.$router.go(-1);
    },
  },
};
</script>
