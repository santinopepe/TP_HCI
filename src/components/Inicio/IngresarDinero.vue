<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div
      v-if="!showSuccessPopup"
      class="bg-white rounded-2xl shadow-lg w-full max-w-2xl relative"
    >
      <button
        class="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-2xl z-10"
        @click="$emit('close')"
        aria-label="Cerrar"
      >
        ×
      </button>

      <div class="grid grid-cols-1 gap-6">
        <div class="text-center mt-12">
          <h2 class="text-2xl font-bold text-gray-800">Ingresar dinero</h2>
          <p class="text-lg mt-4 font-semibold text-gray-800">
            Compartí tu alias o CVU para recibir dinero de cuentas bancarias o
            digitales
          </p>
        </div>

        <div class="bg-white p-6 rounded-b-2xl">
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center border-b pb-2">
              <div class="flex flex-col">
                <span class="text-gray-500 text-sm">Tu alias</span>
                <span class="text-gray-700 font-semibold text-lg">{{
                  alias
                }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center border-b pb-2">
              <div class="flex flex-col">
                <span class="text-gray-500 text-sm">Tu CVU</span>
                <span class="text-gray-700 font-semibold text-lg">{{
                  cvu
                }}</span>
              </div>
            </div>
            <button
              class="bg-[#5D8C39] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#5D8C39]/80 transition-colors flex items-center justify-center gap-2 flex-1"
            >
              <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
              Compartir datos
            </button>
            <div class="flex flex-col">
              <label for="depositAmount" class="text-gray-500 text-sm"
                >Monto a ingresar</label
              >
              <input
                v-model.number="depositAmount"
                type="text"
                id="depositAmount"
                min="0"
                step="0.01"
                class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500 [appearance:textfield]"
                placeholder="Ej: 100.00"
                :class="{ 'border-red-500': showAmountError }"
                @input="onAmountInput"
                autocomplete="off"
                inputmode="decimal"
              />
              <p v-if="showAmountError" class="text-red-500 text-sm mt-1">
                Por favor, ingrese un monto válido mayor a 0.
              </p>
            </div>
            <button
              @click="depositMoney"
              class="bg-[#5D8C39] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#5D8C39]/80 transition-colors flex-1"
            >
              Ingresar dinero
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showSuccessPopup"
      class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center"
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
      <p class="text-lg font-semibold mb-4">Dinero ingresado exitosamente.</p>
      <button
        @click="closeSuccessPopup"
        class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#5D8C39]/80"
      >
        Cerrar
      </button>
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

    const alias = computed(() => accountStore.account?.alias || "");
    const cvu = computed(() => accountStore.account?.cvu || "");

    const depositAmount = ref("");
    const showSuccessPopup = ref(false);
    const showAmountError = ref(false);

    onMounted(() => {
      accountStore.getCurrentAccount();
    });

    function onAmountInput(e) {
      let value = e.target.value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) {
        value = parts[0] + "." + parts.slice(1).join("");
      }
      depositAmount.value = value;
    }

    async function depositMoney() {
      const amount = parseFloat(depositAmount.value);
      if (!amount || amount <= 0) {
        showAmountError.value = true;
        return;
      }
      showAmountError.value = false;
      await accountStore.deposit(amount);
      await accountStore.getCurrentAccount();
      showSuccessPopup.value = true;
      depositAmount.value = "";
    }

    function closeSuccessPopup() {
      showSuccessPopup.value = false;
      emit("close");
    }

    return {
      alias,
      cvu,
      depositAmount,
      depositMoney,
      showSuccessPopup,
      closeSuccessPopup,
      showAmountError,
      onAmountInput,
    };
  },
};
</script>
