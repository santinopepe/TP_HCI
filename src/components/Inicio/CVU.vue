<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
      <!-- Botón cerrar -->
      <button
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        @click="$emit('close')"
        aria-label="Cerrar"
      >×</button>

      <p class="mb-5 text-xl font-bold text-simsim-green-dark">
        Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta.
      </p>

      <!-- Mensaje de copiado -->
      <transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="copiado"
          class="fixed top-8 left-1/2 transform -translate-x-1/2 bg-[#5D8C39] text-white px-6 py-2 rounded-lg shadow-lg z-50 text-base"
        >
          ¡Contenido copiado!
        </div>
      </transition>

      <!-- CVU Card -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-4 flex items-center justify-between border">
        <div>
          <div class="text-2xl font-semibold text-simsim-green-dark">CVU</div>
          <div class="text-gray-800 text-lg font-medium mt-1 select-all">{{ cvu }}</div>
        </div>
        <button @click="copiarCVU" class="transition-colors text-[#5D8C39] hover:text-[#4A6F2E]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="9" y="9" width="13" height="13" rx="2" stroke-width="2" stroke="currentColor" fill="none"/>
            <rect x="3" y="3" width="13" height="13" rx="2" stroke-width="2" stroke="currentColor" fill="none"/>
          </svg>
        </button>
      </div>

      <!-- Alias Card -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-0 flex items-center justify-between border">
        <div>
          <div class="text-2xl font-semibold text-simsim-green-dark">Alias</div>
          <div v-if="!editandoAlias" class="flex text-gray-800 text-lg font-medium mt-1 select-all">
            <span>{{ alias }}</span>
            <img src='/images/pencil.png' alt="Editar" class="w-6 h-6 cursor-pointer ml-3" @click="modificarAlias"/>
          </div>
          <div v-else class="mt-1 flex flex-col">
            <input
              v-model="nuevoAlias"
              class="border border-gray-300 rounded px-2 py-1 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#5D8C39]"
              maxlength="20"
              @keyup.enter="guardarAlias"
              @blur="guardarAlias"
              autofocus
            />
            <span class="text-sm text-gray-500 mt-2">
              El alias debe contener entre 6 a 20 caracteres
            </span>
            <span v-if="errorAlias" class="text-sm text-red-500 mt-1">
              El alias ingresado no cumple con la longitud requerida.
            </span>
          </div>
        </div>
        <button @click="copiarAlias" class="transition-colors text-[#5D8C39] hover:text-[#4A6F2E]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="9" y="9" width="13" height="13" rx="2" stroke-width="2" stroke="currentColor" fill="none"/>
            <rect x="3" y="3" width="13" height="13" rx="2" stroke-width="2" stroke="currentColor" fill="none"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AccountApi } from "../../api/account.js";

export default {
  name: 'CVU',
  data() {
    return {
      cvu: '',
      alias: '',
      editandoAlias: false,
      nuevoAlias: '',
      copiado: false,
      copiadoTimeout: null,
      errorAlias: false,
    };
  },
  created() {
    this.cargarCuenta();
  },
  methods: {
    async cargarCuenta() {
      try {
        const account = await AccountApi.get();
        this.alias = account.alias || '';
        this.cvu = account.cvu || '';
      } catch (e) {
        console.error("Error al obtener la cuenta:", e);
        this.alias = '';
        this.cvu = '';
      }
    },
    copiarCVU() {
      navigator.clipboard.writeText(this.cvu);
      this.mostrarCopiado();
    },
    copiarAlias() {
      navigator.clipboard.writeText(this.alias);
      this.mostrarCopiado();
    },
    modificarAlias() {
      this.nuevoAlias = this.alias;
      this.editandoAlias = true;
      this.errorAlias = false;
      this.$nextTick(() => {
        const input = this.$el.querySelector('input');
        if (input) input.focus();
      });
    },
    async guardarAlias() {
      const len = this.nuevoAlias.trim().length;
      if (len >= 6 && len <= 20) {
        try {
          const payload = { alias: this.nuevoAlias.trim() };
          console.log("Payload enviado a updateAlias:", payload);
          await AccountApi.updateAlias(payload);
          await this.cargarCuenta();
          this.editandoAlias = false;
          this.errorAlias = false;
        } catch (e) {
          this.errorAlias = true;
          console.error("Error al actualizar el alias:", e);
        }
      } else if (this.editandoAlias) {
        this.errorAlias = true;
      }
    },
    mostrarCopiado() {
      this.copiado = true;
      if (this.copiadoTimeout) clearTimeout(this.copiadoTimeout);
      this.copiadoTimeout = setTimeout(() => {
        this.copiado = false;
      }, 1500);
    },
  },
};
</script>