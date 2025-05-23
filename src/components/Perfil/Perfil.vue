<!-- src/components/Perfil.vue -->
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
              @click="showChangePasswordModal"
              class="bg-[#5D8C39] text-white py-2 px-6 rounded-lg hover:bg-[#4A6F2E] transition duration-200"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>

      <!-- Code Verification Modal -->
      <CodeVerificationModal
        v-if="showFormModal && !isCodeVerified"
        :code="code"
        :errorMessage="errorMessage"
        @update:code="code = $event"
        @verify-code="verifyCode"
        @cancel="cancel"
      />

      <!-- Password Update Modal -->
      <PasswordUpdateModal
        v-if="showFormModal && isCodeVerified"
        :newPassword="newPassword"
        :confirmPassword="confirmPassword"
        :errorMessage="errorMessage"
        @update:newPassword="newPassword = $event"
        @update:confirmPassword="confirmPassword = $event"
        @update-password="updatePassword"
        @cancel="cancel"
      />

      <!-- Success Modal -->
      <SuccessModal
        v-if="showSuccessModal"
        @close="closeSuccessModal"
      />
    </main>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { usePerfilStore } from '../store/PerfilStore.js';
import BarraLateral from '../BarraLateral.vue';
import CodeVerificationModal from './ModalDeVerificacion.vue';
import PasswordUpdateModal from './ModalActulizacionContrasenia.vue';
import SuccessModal from './ModalDeCambioExitoso.vue';

export default defineComponent({
  name: 'Perfil',
  components: {
    BarraLateral,
    CodeVerificationModal,
    PasswordUpdateModal,
    SuccessModal,
  },
  setup() {
    const perfilStore = usePerfilStore();
    const activeButton = ref('perfil');
    const fileInput = ref(null);
    const code = ref('');
    const isCodeVerified = ref(false);
    const newPassword = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const showFormModal = ref(false);
    const showSuccessModal = ref(false);

    const showChangePasswordModal = () => {
      showFormModal.value = true;
      isCodeVerified.value = false;
      code.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
      errorMessage.value = '';
    };

    const verifyCode = () => {
      if (code.value === '123456') {
        isCodeVerified.value = true;
        errorMessage.value = '';
      } else {
        errorMessage.value = 'El código ingresado es incorrecto.';
      }
    };

    const updatePassword = () => {
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(newPassword.value)) {
        errorMessage.value =
          'La contraseña debe tener al menos 8 caracteres, un carácter especial (!@#$%^&*) y un número.';
        return;
      }

      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = 'Las contraseñas no coinciden.';
        return;
      }

      errorMessage.value = '';
      showFormModal.value = false;
      showSuccessModal.value = true;
      newPassword.value = '';
      confirmPassword.value = '';
    };

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
    };

    const cancel = () => {
      showFormModal.value = false;
      errorMessage.value = '';
      code.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
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
      verifyCode,
      updatePassword,
      closeSuccessModal,
      cancel,
      triggerFileInput,
      handleFileChange,
    };
  },
});
</script>