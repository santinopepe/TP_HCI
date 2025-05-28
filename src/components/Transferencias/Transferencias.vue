<template>
  <div class="flex h-screen font-sans overflow-hidden relative">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />
    <div class="p-8 bg-gray-50 min-h-screen flex-1 overflow-y-auto">
      <div class="max-w-2xl mx-auto text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Realizar transferencia
        </h1>
        <p class="text-gray-500 text-lg">
          Ingresá los datos para realizar tu transferencia
        </p>
      </div>

      <div class="max-w-md mx-auto">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tipo de identificador
          </label>
          <select
            v-model="identificationType"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
          >
            <option value="cvu">CVU</option>
            <option value="alias">Alias</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ getIdentificationLabel }}
          </label>
          <input
            v-model="identificationValue"
            type="text"
            :placeholder="getIdentificationPlaceholder"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none "
            :class="{ 'border-red-500': identificationError }"
          />
          <p v-if="identificationError" class="mt-1 text-sm text-red-500">
            {{ identificationError }}
          </p>
        </div>

        <div class="mb-4">
          <p class="text-sm font-medium mb-2">Seleccionar método de pago</p>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="metodoPago"
                value="tarjeta"
                v-model="paymentMethod"
                class="hidden"
              />
              <div
                :class="{
                  'bg-[#3C4F2E]': paymentMethod === 'tarjeta',
                  'bg-gray-300': paymentMethod !== 'tarjeta',
                }"
                class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
              >
                <div
                  v-if="paymentMethod === 'tarjeta'"
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
                v-model="paymentMethod"
                class="hidden"
              />
              <div
                :class="{
                  'bg-[#3C4F2E]': paymentMethod === 'cuenta',
                  'bg-gray-300': paymentMethod !== 'cuenta',
                }"
                class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
              >
                <div
                  v-if="paymentMethod === 'cuenta'"
                  class="w-3 h-3 rounded-full"
                ></div>
              </div>
              <span class="text-sm">Dinero en cuenta</span>
            </label>
          </div>
        </div>

        <div v-if="paymentMethod === 'tarjeta'" class="mb-6">
          <p class="text-sm font-medium mb-2">Seleccionar tarjeta</p>
          <div
            v-if="cardStore.loading"
            class="text-center text-blue-600 py-8"
          >
            Cargando tarjetas...
          </div>
          <div
            v-else-if="cardStore.cards.length === 0"
            class="text-center text-gray-500 py-8"
          >
            No hay tarjetas disponibles.
            <p v-if="cardStore.error" class="text-red-500 text-sm mt-2">
              Error al cargar tarjetas: {{ cardStore.error.message }}
            </p>
          </div>
          <div v-else class="flex items-center gap-4 relative overflow-hidden">
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
                  transform: `translateX(${getCardTranslateX(index)}%)`,
                  opacity: index === selectedCardIndex ? 1 : 0,
                  zIndex: index === selectedCardIndex ? 10 : 0,
                }"
              >
                <div
                  class="p-4 rounded-xl shadow-lg text-white text-center h-[140px] flex flex-col justify-between relative"
                  :class="getCardBackground(card.number)"
                >
                  <div>
                    <p class="text-xl font-semibold">
                      {{ (card.type === "CREDIT") ? "CRÉDITO" : "DÉBITO" }} **** **** **** {{ card.number.slice(-4) }}
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
                      v-if="getCardLogo(card.number)"
                      :src="getCardLogo(card.number)"
                      alt="Card Logo"
                      class="h-8 w-12 object-contain"
                      @error="handleImageError"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              @click="rotateCard('siguiente')"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-20"
            >
              <img src="/images/forward.png" alt="Siguiente" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <div v-if="paymentMethod === 'cuenta'" class="mb-6">
          <div
            class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-4 rounded-xl text-white shadow"
          >
            <p class="text-sm">Dinero disponible en cuenta</p>
            <p class="text-2xl font-bold">
              {{ formatAmount(accountBalance) }}
            </p>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Monto a transferir
          </label>
          <div class="relative">
            <span class="absolute left-3 top-3 text-gray-500">$</span>
            <input
              v-model="amount"
              type="text"
              placeholder="0,00"
              class="w-full pl-8 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
              :class="{ 'border-red-500': amountError }"
            />
          </div>
          <p v-if="amountError" class="mt-1 text-sm text-red-500">
            {{ amountError }}
          </p>
        </div>

        <div class="flex justify-center">
          <button
            @click="validateForm"
            class="bg-[#5D8C39] text-white px-6 py-3 rounded-lg hover:bg-[#5D8C39]/90"
          >
            Confirmar transferencia
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showConfirmationModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          Confirmar transferencia
        </h2>
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <div class="space-y-2">
            <p class="text-sm">
              <span class="font-medium">Destinatario:</span>
              {{ identificationValue }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Tipo:</span>
              {{ identificationType.toUpperCase() }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Monto:</span> ${{ amount }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Método:</span>
              {{ paymentMethod === "tarjeta" ? "Tarjeta" : "Cuenta" }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Fecha:</span>
              {{ new Date().toLocaleDateString("es-AR") }}
            </p>
          </div>
        </div>

        <div class="flex justify-between">
          <button
            @click="showConfirmationModal = false"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            @click="handleTransfer"
            class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
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

        <div class="flex flex-col gap-4 items-center">
          <button
            class="flex items-center gap-2 bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 w-[300px] justify-center"
          >
            <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
            <span>Compartir comprobante</span>
          </button>
          <button
            @click="handleSuccessClose"
            class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 w-[300px]"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import BarraLateral from "./../BarraLateral.vue";
import {
  useCardStore,
  getCardLogo,
  getCardBackground,
} from "../store/TarjetasStore.js";
import { useAccountStore } from "../store/accountStore.js";
import { useCobrosStore } from "../store/CobrosStore.js";

const router = useRouter();
const cardStore = useCardStore();
const accountStore = useAccountStore();
const cobrosStore = useCobrosStore();

const activeButton = ref("transferir");
const identificationType = ref("cvu");
const identificationValue = ref("");
const identificationError = ref("");
const paymentMethod = ref("tarjeta");
const selectedCardIndex = ref(0);
const amount = ref("");
const amountError = ref("");
const accountBalance = computed(() => accountStore.account?.balance ?? 0);
const showConfirmationModal = ref(false);
const showSuccessModal = ref(false);

const getIdentificationLabel = computed(() => {
  const labels = {
    cvu: "CVU del destinatario",
    alias: "Alias del destinatario",
    email: "Email del destinatario",
  };
  return labels[identificationType.value];
});

const getIdentificationPlaceholder = computed(() => {
  const placeholders = {
    cvu: "Ingresá el CVU",
    alias: "Ingresá el alias",
    email: "Ingresá el email",
  };
  return placeholders[identificationType.value];
});

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateIdentification = async () => {
  if (!identificationValue.value) {
    identificationError.value = "Este campo es requerido";
    return false;
  }

  if (identificationType.value === "email") {
    if (!validateEmail(identificationValue.value)) {
      identificationError.value = "Email inválido";
      return false;
    }
  } else if (identificationType.value === "cvu") {
    const isValid = await accountStore.validateCVU(identificationValue.value);
    if (!isValid) {
      identificationError.value = "El CVU no existe";
      return false;
    }
  } else if (identificationType.value === "alias") {
    const isValid = await accountStore.validateAlias(identificationValue.value);
    if (!isValid) {
      identificationError.value = "El alias no existe";
      return false;
    }
  }

  identificationError.value = "";
  return true;
};

const validateAmount = () => {
  if (!amount.value) {
    amountError.value = "El monto es requerido";
    return false;
  }

  const numAmount = parseFloat(amount.value.replace(",", "."));
  if (isNaN(numAmount) || numAmount <= 0) {
    amountError.value = "Ingresá un monto válido";
    return false;
  }

  if (paymentMethod.value === "cuenta" && numAmount > accountBalance.value) {
    amountError.value = "Saldo insuficiente";
    return false;
  }

  amountError.value = "";
  return true;
};

const validateForm = async () => {
  const isIdentificationValid = await validateIdentification();
  const isAmountValid = validateAmount();
  if (isIdentificationValid && isAmountValid) {
    showConfirmationModal.value = true;
  }
};

const handleTransfer = async () => {
  const numAmount = parseFloat(amount.value.replace(",", "."));
  const description =
    paymentMethod.value === "tarjeta"
      ? "Transferencia con tarjeta"
      : "Transferencia desde la app";

  const body = {
    description,
    amount: numAmount,
    metadata: {},
  };

  let params = `?${identificationType.value}=${encodeURIComponent(
    identificationValue.value
  )}`;
  if (paymentMethod.value === "tarjeta") {
    const selectedCard = cardStore.cards[selectedCardIndex.value];
    params += `&cardId=${encodeURIComponent(selectedCard.id)}`;
  }

  try {
    if (identificationType.value === "cvu") {
      await cobrosStore.transferByCVU(params, body);
    } else if (identificationType.value === "alias") {
      await cobrosStore.transferByAlias(params, body);
    } else if (identificationType.value === "email") {
      await cobrosStore.transferByEmail(params, body);
    }
    showConfirmationModal.value = false;
    showSuccessModal.value = true;
  } catch (e) {
    identificationError.value = "Error al realizar la transferencia";
    showConfirmationModal.value = false;
  }
};

const handleSuccessClose = () => {
  showSuccessModal.value = false;
  router.push("/transferir");
};

const rotateCard = (direction) => {
  const cardsLength = cardStore.cards.length;
  if (direction === "anterior") {
    selectedCardIndex.value =
      (selectedCardIndex.value - 1 + cardsLength) % cardsLength;
  } else {
    selectedCardIndex.value = (selectedCardIndex.value + 1) % cardsLength;
  }
};

const getCardTranslateX = (index) => {
  const total = cardStore.cards.length;
  const current = selectedCardIndex.value;
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff * 100;
};

const formatAmount = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
};

onMounted(() => {
  cardStore.getAll && cardStore.getAll();
});
</script>
