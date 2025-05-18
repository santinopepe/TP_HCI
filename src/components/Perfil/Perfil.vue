<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />

    <!-- Contenedor principal centrado -->
    <main class="flex-1 bg-[#FAFAFA] flex flex-col items-center justify-center">
      <!-- Título centrado -->
      <div class="w-full max-w-md mb-4 flex items-center justify-center">
        <h1 class="text-2xl font-bold text-simsim-green-dark">Perfil</h1>
      </div>

      <!-- Contenedor de los datos del perfil -->
      <div class="w-full max-w-md">
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <!-- Imagen de perfil y nombre -->
          <div class="flex flex-col items-center mb-6">
            <div class="relative">
              <img
                :src="profileImage"
                alt="Profile Picture"
                class="w-24 h-24 rounded-full border-2 border-simsim-green-dark"
              />
              <span
                @click="triggerFileInput"
                class="absolute top-0 right-0 bg-simsim-green-darker text-white w-6 h-6 flex items-center justify-center rounded-full text-xs cursor-pointer"
              >
                ✎
              </span>
              <!-- Input para seleccionar archivo -->
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                class="hidden"
                @change="handleFileChange"
              />
            </div>
            <h2 class="text-2xl font-bold text-simsim-green-dark mt-4">
              {{ user.name }}
            </h2>
          </div>

          <!-- Datos del perfil -->
          <div class="space-y-6 text-left">
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">
                N° de Documento
              </p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ user.accountNumber }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">Email</p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ user.email }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">
                Número telefónico
              </p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ user.phone }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">Alias</p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ user.alias }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">Género</p>
              <p class="text-lg text-gray-700 font-bold">{{ user.gender }}</p>
            </div>
          </div>

          <!-- Botón Cambiar Contraseña -->
          <div class="flex justify-center mt-8">
            <button
              @click="goToChangePassword('perfil')"
              class="bg-[#5D8C39] text-white py-2 px-6 rounded-lg hover:bg-[#4A6F2E] transition duration-200"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BarraLateral from "../BarraLateral.vue";

export default {
  name: "Perfil",
  components: {
    BarraLateral,
  },
  data() {
    return {
      activeButton: "perfil",
      user: {
        cvu: "0023481928201930457639",
        name: "Juliana Márquez",
        accountNumber: "44.887.744",
        email: "jmarquez01@gmail.com",
        phone: "+54 9 11 5325-6201",
        alias: "jmarquez01",
        gender: "Mujer",
      },
      profileImage: "/images/mujer.png", // Imagen de perfil inicial
    };
  },
  methods: {
    setActiveButton(button) {
      this.activeButton = button;
    },
    goToChangePassword(button) {
      this.$router.push("/cambiarcontraseña");
      this.activeButton = button;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImage = e.target.result;
        };
        reader.readAsDataURL(fi);
      }
    },
  },
};
</script>
