<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md relative">
      <!-- Header section with fixed height -->
      <div class="h-10 relative">
        <!-- Step indicator -->
        <div
          class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
        >
          Paso {{ currentStep }} de 3
        </div>

        <!-- Close button -->
        <button
          @click="closeModal"
          class="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Content section -->
      <div class="p-6">
        <!-- Step 1: Payment Method and Amount -->
        <div v-if="currentStep === 1" class="flex flex-col">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Método de pago</h2>
          <div
            v-if="transferenciaStore.selectedContact"
            class="flex items-center gap-4 mb-6"
          >
            <img
              :src="transferenciaStore.selectedContact.avatar"
              alt="Avatar"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <p class="text-lg font-semibold">
                {{ transferenciaStore.selectedContact.nombre }}
              </p>
              <p class="text-sm text-gray-500">
                CBU/CVU: {{ transferenciaStore.selectedContact.cbu }}
              </p>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-sm font-medium mb-2">Seleccionar método de pago</p>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="metodoPago"
                  value="tarjeta"
                  v-model="transferenciaStore.paymentMethod"
                  class="hidden"
                />
                <div
                  :class="
                    transferenciaStore.paymentMethod === 'tarjeta'
                      ? 'bg-[#3C4F2E]'
                      : 'bg-gray-300'
                  "
                  class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
                >
                  <div
                    v-if="transferenciaStore.paymentMethod === 'tarjeta'"
                    class="w-3 h-3 rounded-full"
                  ></div>
                </div>
                <span class="text-sm">Tarjeta</span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="metodoPago"
                  value="cuenta"
                  v-model="transferenciaStore.paymentMethod"
                  class="hidden"
                />
                <div
                  :class="
                    transferenciaStore.paymentMethod === 'cuenta'
                      ? 'bg-[#3C4F2E]'
                      : 'bg-gray-300'
                  "
                  class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
                >
                  <div
                    v-if="transferenciaStore.paymentMethod === 'cuenta'"
                    class="w-3 h-3 rounded-full"
                  ></div>
                </div>
                <span class="text-sm">Dinero en Cuenta</span>
              </label>
            </div>
          </div>

          <div
            v-if="transferenciaStore.paymentMethod === 'tarjeta'"
            class="mb-6"
          >
            <p class="text-sm font-medium mb-2">Seleccionar tarjeta</p>
            <div class="flex items-center gap-4 relative overflow-hidden">
              <button
                @click="rotateCard('anterior')"
                class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-30"
              >
                <img
                  src="/images/backComplete.png"
                  alt="Anterior"
                  class="w-6 h-6"
                />
              </button>

              <div class="relative w-full h-[180px] overflow-hidden">
                <div
                  v-for="(card, index) in cardStore.cards"
                  :key="card.id || index"
                  class="absolute w-full transition-all duration-500 ease-in-out"
                  :style="{
                    transform: `translateX(${
                      (index - transferenciaStore.selectedCardIndex) * 100
                    }%)`,
                    opacity:
                      index === transferenciaStore.selectedCardIndex ? 1 : 0,
                    zIndex:
                      index === transferenciaStore.selectedCardIndex ? 10 : 0,
                  }"
                >
                  <div
                    class="p-4 rounded-xl shadow-lg text-white text-center h-[140px] flex flex-col justify-between relative"
                    :class="getCardBackground(card.number)"
                  >
                    <div>
                      <p class="text-xl font-semibold">
                        {{ card.type }} **** **** **** {{ card.number.slice(-4) }}                      
                      </p>
                      <p class="text-sm opacity-80 mt-2">
                        Titular: {{ card.fullName }}
                      </p>
                      <p class="text-sm opacity-80">
                        Expira: {{ card.expirationDate }}
                      </p>
                    </div>
                    <div class="absolute bottom-4 right-4">
                      <img
                        :src="getCardLogo(card.number)"
                        alt="Card Logo"
                        class="h-8 w-12 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                @click="rotateCard('siguiente')"
                class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-20"
              >
                <img
                  src="/images/forward.png"
                  alt="Siguiente"
                  class="w-6 h-6"
                />
              </button>
            </div>
          </div>

          <div
            v-if="transferenciaStore.paymentMethod === 'cuenta'"
            class="mb-6"
          >
            <div
              class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-4 rounded-xl text-white shadow"
            >
              <p class="text-sm">Dinero disponible en cuenta</p>
              <p class="text-xl font-bold tracking-widest mt-2">
                ${{ transferenciaStore.accountBalance.toFixed(2) }}
              </p>
            </div>
          </div>

          <div class="mb-6">
            <label for="monto" class="block text-sm font-medium mb-1"
              >Monto</label
            >
            <input
              v-model="transferenciaStore.amount"
              id="monto"
              type="text"
              placeholder="100,000"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              :class="{ 'border-red-500': transferenciaStore.amountError }"
              @input="validateAmount"
            />
            <p
              v-if="transferenciaStore.amountError"
              class="text-red-500 text-sm mt-1"
            >
              Ingresar monto a transferir
            </p>
          </div>

          <div class="flex justify-between mt-6">
            <button
              @click="closeModal"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              @click="validateAndShowConfirmation"
              class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
            >
              Continuar
            </button>
          </div>
        </div>

        <!-- Step 2: Confirmation -->
        <div v-if="currentStep === 2" class="flex flex-col">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Confirmar transferencia
          </h2>
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <div class="flex items-center gap-4 mb-4">
              <img
                :src="transferenciaStore.selectedContact.avatar"
                alt="Avatar"
                class="w-12 h-12 rounded-full"
              />
              <div>
                <p class="font-semibold">
                  {{ transferenciaStore.selectedContact.nombre }}
                </p>
                <p class="text-sm text-gray-500">
                  CBU/CVU: {{ transferenciaStore.selectedContact.cbu }}
                </p>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-sm">
                <span class="font-medium">Monto:</span> ${{
                  transferenciaStore.amount
                }}
              </p>
              <p class="text-sm">
                <span class="font-medium">Método:</span>
                {{
                  transferenciaStore.paymentMethod === "tarjeta"
                    ? "Tarjeta"
                    : "Cuenta"
                }}
              </p>
              <p class="text-sm">
                <span class="font-medium">Fecha:</span>
                {{ transferenciaStore.formattedCurrentDate }}
              </p>
            </div>
          </div>

          <div class="flex justify-between mt-auto">
            <button
              @click="previousStep"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Volver
            </button>
            <button
              @click="confirmTransfer"
              class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
            >
              Confirmar
            </button>
          </div>
        </div>

        <!-- Step 3: Receipt -->
        <div v-if="currentStep === 3" class="flex flex-col">
          <div class="bg p-6 rounded-lg mb-6">
            <div class="text-center mb-6">
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
              <h3 class="text-xl font-semibold text-gray-800">
                ¡Transferencia exitosa!
              </h3>
            </div>
          </div>

          <div class="flex flex-col gap-4 items-center mt-auto">
            <button
              class="flex items-center gap-2 bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 w-[300px] justify-center"
            >
              <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
              <span>Compartir Comprobante</span>
            </button>
            <button
              @click="closeModal"
              class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 w-[300px]"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useTransferenciaStore } from "../store/TransferenciasStore.js";
import { useCardStore, getCardLogo, getCardBackground } from "../store/TarjetasStore.js";
const cardStore = useCardStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "transfer-complete"]);

const router = useRouter();
const transferenciaStore = useTransferenciaStore();
const currentStep = ref(1);

const closeModal = () => {
  emit("close");
  resetSteps();
};

const validateAmount = (event) => {
  // Eliminar cualquier carácter que no sea número, punto o coma
  let value = event.target.value.replace(/[^\d.,]/g, "");

  // Asegurar que solo haya un punto decimal o una coma
  const hasDecimal = value.includes(".");
  const hasComma = value.includes(",");

  if (hasDecimal && hasComma) {
    // Si hay ambos, mantener solo el primero que aparezca
    const decimalIndex = value.indexOf(".");
    const commaIndex = value.indexOf(",");
    if (decimalIndex < commaIndex) {
      value = value.replace(",", "");
    } else {
      value = value.replace(".", "");
    }
  }

  // Actualizar el valor en el store
  transferenciaStore.amount = value;
};

const resetSteps = () => {
  currentStep.value = 1;
  transferenciaStore.resetTransferForm();
};

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const validateAndShowConfirmation = () => {
  if (!transferenciaStore.amount || transferenciaStore.amount.trim() === "") {
    transferenciaStore.setAmountError(true);
    return;
  }

  // Convertir el monto a un número válido
  const amount = parseFloat(transferenciaStore.amount.replace(",", "."));

  if (isNaN(amount) || amount <= 0) {
    transferenciaStore.setAmountError(true);
    return;
  }

  transferenciaStore.setAmountError(false);
  nextStep();
};

const confirmTransfer = () => {
  transferenciaStore.confirmTransfer();
  nextStep();
};


watch(
  () => props.isOpen,
  async (newValue) => {
    if (newValue) {
      await cardStore.getAll();
    }
    if (!newValue) {
      resetSteps();
    }
  }
);

  const rotateCard = (direction) => {
    const cardsLength = cardStore.cards.length;
    if (!cardsLength) return;
    if (direction === "anterior") {
      transferenciaStore.selectedCardIndex =
        (transferenciaStore.selectedCardIndex - 1 + cardsLength) % cardsLength;
    } else if (direction === "siguiente") {
      transferenciaStore.selectedCardIndex =
        (transferenciaStore.selectedCardIndex + 1) % cardsLength;
    }
  };
</script>
