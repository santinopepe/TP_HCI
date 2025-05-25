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
              {{ userData.firstName }} {{ userData.lastName }}
            </h2>
          </div>

          <div class="space-y-6 text-left">
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">
                N° de Documento
              </p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ userData.dni }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">Email</p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ userData.email }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">
                Número telefónico
              </p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ userData.phone }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-simsim-green-dark">Alias</p>
              <p class="text-lg text-gray-700 font-bold border-b pb-2">
                {{ accountData.alias }}
              </p>
            </div>
          </div>

          <div class="flex justify-center mt-8">
            <button
              @click="showChangePasswordModal"
              class="bg-[#5D8C39] text-white py-2 px-6 rounded-lg hover:bg-[#4A6F2E] transition duration-200"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>

      <!-- Password Update Modal (unificado, sin paso intermedio) -->
      <PasswordUpdateModal
        v-if="showFormModal"
        :code="code"
        :newPassword="newPassword"
        :confirmPassword="confirmPassword"
        :errorMessage="errorMessage"
        @update:code="code = $event"
        @update:newPassword="newPassword = $event"
        @update:confirmPassword="confirmPassword = $event"
        @update-password="updatePassword"
        @cancel="cancel"
      />

      <!-- Success Modal -->
      <SuccessModal v-if="showSuccessModal" @close="closeSuccessModal" />
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { usePerfilStore } from "../store/PerfilStore.js";
import { useSecurityStore } from "../store/securityStore.js";
import { AccountApi } from "../../api/account.js";
import { UserApi } from "../../api/user.js";
import BarraLateral from "../BarraLateral.vue";
import PasswordUpdateModal from "./ModalActulizacionContrasenia.vue";
import SuccessModal from "./ModalDeCambioExitoso.vue";

export default defineComponent({
  name: "Perfil",
  components: {
    BarraLateral,
    PasswordUpdateModal,
    SuccessModal,
  },
  setup() {
    const perfilStore = usePerfilStore();
    const securityStore = useSecurityStore();
    const activeButton = ref("perfil");
    const fileInput = ref(null);
    const code = ref("");
    const isCodeVerified = ref(false);
    const newPassword = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const showFormModal = ref(false);
    const showSuccessModal = ref(false);

    // Datos de usuario y cuenta
    const userData = ref({
      firstName: "",
      lastName: "",
      email: "",
      dni: "",
      phone: "",
      gender: "",
    });
    const accountData = ref({
      alias: "",
      cvu: "",
    });

    // Cargar datos al montar el componente usando securityStore
    onMounted(async () => {
      try {
        const user = await securityStore.getCurrentUser();
        userData.value.firstName = user.firstName || "";
        userData.value.lastName = user.lastName || "";
        userData.value.email = user.email || "";
        userData.value.dni = user.metadata?.dni || "";
        userData.value.phone = user.metadata?.phone || "";
        userData.value.gender = user.metadata?.gender || "";
      } catch (e) {
        console.error("Error al obtener usuario:", e);
      }
      try {
        const account = await AccountApi.get();
        accountData.value.alias = account.alias || "";
        accountData.value.cvu = account.cvu || "";
      } catch (e) {
        console.error("Error al obtener cuenta:", e);
      }
    });

    const showChangePasswordModal = async () => {
      showFormModal.value = true;
      code.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
      errorMessage.value = "";
      try {
        const user = await securityStore.getCurrentUser();
        if (!user || !user.email) {
          throw new Error("No se pudo obtener la información del usuario");
        }
        await UserApi.resetPassword(user.email);
      } catch (error) {
        console.error("Error al solicitar cambio de contraseña:", error);
        if (error.response?.data?.message) {
          errorMessage.value = error.response.data.message;
        } else if (error.description) {
          errorMessage.value = error.description;
        } else {
          errorMessage.value =
            "Error al solicitar el cambio de contraseña. Por favor, intente nuevamente.";
        }
      }
    };

    const updatePassword = async () => {
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(newPassword.value)) {
        errorMessage.value =
          "La contraseña debe tener al menos 8 caracteres, un carácter especial (!@#$%^&*) y un número.";
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = "Las contraseñas no coinciden.";
        return;
      }
      if (!code.value) {
        errorMessage.value = "Debes ingresar el código recibido por email.";
        return;
      }
      try {
        await UserApi.changePassword({
          code: code.value,
          password: newPassword.value,
        });
        errorMessage.value = "";
        showFormModal.value = false;
        showSuccessModal.value = true;
        newPassword.value = "";
        confirmPassword.value = "";
        code.value = "";
      } catch (error) {
        if (error.response?.data?.message) {
          errorMessage.value = error.response.data.message;
        } else if (error.description) {
          errorMessage.value = error.description;
        } else {
          errorMessage.value =
            "Error al cambiar la contraseña. Por favor, intente nuevamente.";
        }
      }
    };

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
    };

    const cancel = () => {
      showFormModal.value = false;
      errorMessage.value = "";
      code.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
      isCodeVerified.value = false;
    };

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          perfilStore.setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      activeButton,
      perfilStore,
      fileInput,
      code,
      isCodeVerified,
      newPassword,
      confirmPassword,
      errorMessage,
      showFormModal,
      showSuccessModal,
      showChangePasswordModal,
      updatePassword,
      closeSuccessModal,
      cancel,
      triggerFileInput,
      handleFileChange,
      userData,
      accountData,
    };
  },
});
</script>
