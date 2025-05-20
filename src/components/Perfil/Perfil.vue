<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />

    <main class="flex-1 bg-[#FAFAFA] flex flex-col items-center justify-center">
      <div class="w-full max-w-md mb-4 flex items-center justify-center">
        <h1 class="text-2xl font-bold text-simsim-green-dark">Perfil</h1>
      </div>

      <div class="w-full max-w-md">
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <div class="flex flex-col items-center mb-6">
            <div class="relative">
              <img
                :src="perfilStore.profileImage"
                alt="Profile Picture"
                class="w-24 h-24 rounded-full border-2 border-simsim-green-dark"
              />
              <span
                @click="triggerFileInput"
                class="absolute top-0 right-0 bg-simsim-green-darker text-white w-6 h-6 flex items-center justify-center rounded-full text-xs cursor-pointer"
              >
                ✎
              </span>
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                class="hidden"
                @change="handleFileChange"
              />
            </div>
            <h2 class="text-2xl font-bold text-simsim-green-dark mt-4">
              {{ perfilStore.user.name }}
            </h2>
          </div>

          <div class="space-y-6 text-left">
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">
                N° de Documento
              </p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ perfilStore.user.accountNumber }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">Email</p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ perfilStore.user.email }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">
                Número telefónico
              </p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ perfilStore.user.phone }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">Alias</p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ perfilStore.user.alias }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">Género</p>
              <p class="text-lg text-gray-700 font-bold">{{ perfilStore.user.gender }}</p>
            </div>
          </div>

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
import { defineComponent, ref } from 'vue';
import { usePerfilStore } from '../store/PerfilStore.js'; // Import the new store
import BarraLateral from "../BarraLateral.vue";

export default defineComponent({
  name: "Perfil",
  components: {
    BarraLateral,
  },
  setup() {
    const perfilStore = usePerfilStore(); // Initialize the store
    const activeButton = ref('perfil'); // Moved to ref for setup composition API
    const fileInput = ref(null); // Ref for the file input element

    const goToChangePassword = () => {
      // Assuming you have access to router via useRoute/useRouter from vue-router
      // or if using options API style setup, this.$router would still be available.
      // For composition API, you'd usually import:
      // import { useRouter } from 'vue-router';
      // const router = useRouter();
      // router.push("/cambiarcontraseña");

      // For this example, if running directly in a setup without router setup:
      console.log("Navigating to /cambiarcontraseña");
      // You'll need to set up vue-router properly in your main.js/app.js
      // if you're not seeing navigation, or mock it for testing.
    };

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          perfilStore.setProfileImage(e.target.result); // Update image via store action
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      activeButton,
      perfilStore, // Make the store accessible in the template
      fileInput,    // Expose the ref for the template
      goToChangePassword,
      triggerFileInput,
      handleFileChange,
    };
  },
});
</script>