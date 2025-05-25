<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-2xl relative">
      <!-- Botón cerrar -->
      <button
        class="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-2xl z-10"
        @click="$emit('close')"
        aria-label="Cerrar"
      >
        ×
      </button>

      <!-- Contenido principal -->
      <div class="grid grid-cols-1 gap-6">
        <div class="text-center mt-12">
          <h2 class="text-2xl font-bold text-gray-800">Ingresar Dinero</h2>
          <p class="text-lg mt-4 font-semibold text-gray-800">
            Compartí tu alias o CVU para recibir dinero de cuentas bancarias o
            digitales
          </p>
        </div>

        <!-- Bloque con Alias y CVU -->
        <div class="bg-white p-6 rounded-b-2xl">
          <div class="flex flex-col gap-4">
            <!-- Alias -->
            <div class="flex justify-between items-center border-b pb-2">
              <div class="flex flex-col">
                <span class="text-gray-500 text-sm">Tu alias</span>
                <span class="text-gray-700 font-semibold text-lg">{{
                  alias
                }}</span>
              </div>
            </div>
            <!-- CVU -->
            <div class="flex justify-between items-center border-b pb-2">
              <div class="flex flex-col">
                <span class="text-gray-500 text-sm">Tu CVU</span>
                <span class="text-gray-700 font-semibold text-lg">{{
                  cvu
                }}</span>
              </div>
            </div>
            <!-- Botón Compartir -->
            <button
              @click="shareData"
              class="bg-[#5D8C39] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#5D8C39]/80 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
              Compartir datos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useAccountStore } from "../store/accountStore.js";

export default {
  name: "IngresarDinero",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const accountStore = useAccountStore();

    // Computed para alias y cvu desde el store
    const alias = computed(() => accountStore.account?.alias || "");
    const cvu = computed(() => accountStore.account?.cvu || "");

    // Cargar cuenta al montar
    onMounted(() => {
      accountStore.getCurrentAccount();
    });

    function shareData() {
      const text = `Alias: ${alias.value}\nCVU: ${cvu.value}`;
      if (navigator.share) {
        navigator.share({ text });
      } else {
        navigator.clipboard.writeText(text);
        alert("Datos copiados al portapapeles");
      }
    }

    return {
      alias,
      cvu,
      shareData,
    };
  },
};
</script>