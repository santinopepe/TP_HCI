<template>
  <div class="flex h-screen font-sans bg-gray-100">
    <BotonRetroceder/>
    <main class="flex-1 flex flex-col justify-center items-center py-8 px-2 overflow-y-auto">
      <div class="w-full max-w-2xl">
        <p class="mb-5 text-xl font-bold text-simsim-green-dark">
          Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta.
        </p>

        <!-- Mensaje de copiado -->
        <transition name="fade">
          <div
            v-if="copiado"
            class="fixed top-8 left-1/2 transform -translate-x-1/2 bg-[#5D8C39] text-white px-6 py-2 rounded-lg shadow-lg z-50 text-base"
          >
            ¡Contenido copiado!
          </div>
        </transition>

        <!-- CVU Card -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-4 flex items-center justify-between">
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
        <div class="bg-white rounded-xl shadow-sm p-6 mb-0 flex items-center justify-between">
          <div>
            <div class="text-2xl font-semibold text-simsim-green-dark">Alias</div>
            <div v-if="!editandoAlias" class="text-gray-800 text-lg font-medium mt-1 select-all">{{ alias }}</div>
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
        <!-- Modificar alias -->
        <div
          class="bg-white rounded-xl  shadow-sm border-t flex items-center px-6 py-3 cursor-pointer hover:bg-gray-50 transition"
          @click="modificarAlias"
          v-if="!editandoAlias"
        >
          <span class="font-semibold text-black">Modificar mi alias</span>
          <span class="ml-auto text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BotonRetroceder from "../BotonRetroceder.vue";
export default {
  name: 'CVU',
  components: {
    BotonRetroceder,
  },
  data() {
    return {
      cvu: '00234819282019304576839',
      alias: 'jmarquez01',
      editandoAlias: false,
      nuevoAlias: '',
      copiado: false,
      copiadoTimeout: null,
      errorAlias: false,
    };
  },
  methods: {
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
        // Enfoca el input automáticamente
        const input = this.$el.querySelector('input');
        if (input) input.focus();
      });
    },
    guardarAlias() {
      const len = this.nuevoAlias.trim().length;
      if (len >= 6 && len <= 20) {
        this.alias = this.nuevoAlias.trim();
        this.editandoAlias = false;
        this.errorAlias = false;
      } else if (this.editandoAlias) {
        this.errorAlias = true;
        // Mantiene el input abierto hasta que sea válido
      }
    },
    volver() {
      this.$router.back();
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

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>