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

        <!-- Bloque con Alias, CVU y campo de ingreso -->
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
            <!-- Campo para ingresar monto -->
            <div class="flex flex-col">
              <label for="depositAmount" class="text-gray-500 text-sm"
                >Monto a ingresar</label
              >
              <input
                v-model.number="depositAmount"
                type="number"
                id="depositAmount"
                min="0"
                step="0.01"
                class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Ej: 100.00"
              />
            </div>
            <!-- Botón Compartir y Botón Ingresar -->
            <div class="flex gap-4 mt-4">
              <button
                @click="shareData"
                class="bg-[#5D8C39] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#5D8C39]/80 transition-colors flex items-center justify-center gap-2 flex-1"
              >
                <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
                Compartir datos
              </button>
              <button
                @click="depositMoney"
                class="bg-[#5D8C39] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#5D8C39]/80 transition-colors flex-1"
                :disabled="!depositAmount || depositAmount <= 0"
              >
                Ingresar Dinero
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Pop-up de éxito -->
    <div
      v-if="showSuccessPopup"
      class="fixed inset-0 flex items-center justify-center z-60"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <span class="text-green-600 text-3xl mb-2">✔️</span>
        <p class="text-lg font-semibold mb-4">Dinero ingresado exitosamente.</p>
        <button
          @click="closeSuccessPopup"
          class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#5D8C39]/80"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useAccountStore } from "../store/accountStore.js";

export default {
  name: "IngresarDinero",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const accountStore = useAccountStore();

    // Computed para alias y cvu desde el store
    const alias = computed(() => accountStore.account?.alias || "");
    const cvu = computed(() => accountStore.account?.cvu || "");

    // Estado para el monto a ingresar
    const depositAmount = ref(null);
    const showSuccessPopup = ref(false); // Nuevo estado para el pop-up

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

    async function depositMoney() {
      if (!depositAmount.value || depositAmount.value <= 0) {
        alert("Por favor, ingrese un monto válido mayor a 0.");
        return;
      }

      try {
        await accountStore.deposit(depositAmount.value);
        await accountStore.getCurrentAccount();
        showSuccessPopup.value = true; // Mostrar pop-up de éxito
        depositAmount.value = null;
      } catch (e) {
        alert(`Error al ingresar dinero: ${e.message || e.description || "Intente nuevamente."}`);
      }
    }

    function closeSuccessPopup() {
      showSuccessPopup.value = false;
      emit("close");
    }

    return {
      alias,
      cvu,
      shareData,
      depositAmount,
      depositMoney,
      showSuccessPopup,
      closeSuccessPopup,
    };
  },
};
</script>