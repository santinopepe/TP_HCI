<template>
  <div class="flex h-screen font-sans bg-gray-100">
    <BarraLateral :active-button="'inicio'" />

    <main class="flex-1 flex flex-col justify-center items-center py-8 px-2 overflow-y-auto">
      <div class="w-full max-w-2xl">
        <p class="mb-6 text-gray-700 text-base">
          Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta.
        </p>

        <!-- CVU Card -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-4 flex items-center justify-between">
          <div>
            <div class="text-gray-400 text-lg font-semibold">CVU</div>
            <div class="text-gray-800 text-xl font-medium mt-1 select-all">{{ cvu }}</div>
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
            <div class="text-gray-400 text-lg font-semibold">Alias</div>
            <div class="text-gray-800 text-xl font-medium mt-1 select-all">{{ alias }}</div>
          </div>
          <button @click="copiarAlias" class="transition-colors text-[#5D8C39] hover:text-[#4A6F2E]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke-width="2" stroke="currentColor" fill="none"/>
              <rect x="3" y="3" width="13" height="13" rx="2" stroke-width="2" stroke="currentColor" fill="none"/>
            </svg>
          </button>
        </div>
        <!-- Modificar alias -->
        <div class="bg-white rounded-b-xl rounded-t-none shadow-sm border-t flex items-center px-6 py-3 cursor-pointer hover:bg-gray-50 transition"
             @click="modificarAlias">
          <span class="font-semibold text-black">Modificar mi alias</span>
          <span class="ml-auto text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>

        <!-- Necesito ayuda -->
        <div class="bg-white rounded-xl shadow-sm p-6 mt-6 flex items-center cursor-pointer hover:bg-gray-50 transition">
          <span class="text-gray-700 font-medium">Necesito ayuda</span>
          <span class="ml-auto text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>

        <!-- Botón Volver alineado a la derecha -->
        <div class="flex justify-end mt-6">
          <button
            class="bg-[#5D8C39] text-white py-2 px-6 rounded-lg hover:bg-[#4A6F2E] transition duration-200"
            @click="volver"
          >
            Volver
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BarraLateral from '../BarraLateral.vue';

export default {
  name: 'CVU',
  components: {
    BarraLateral,
  },
  data() {
    return {
      cvu: '00234819282019304576839',
      alias: 'jmarquez01',
    };
  },
  methods: {
    copiarCVU() {
      navigator.clipboard.writeText(this.cvu);
    },
    copiarAlias() {
      navigator.clipboard.writeText(this.alias);
    },
    modificarAlias() {
      alert('Funcionalidad para modificar el alias');
    },
    volver() {
      this.$router.back();
    },
  },
};
</script>