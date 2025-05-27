<template>
  <div class="bg-white p-6 rounded-xl shadow-xl max-w-md w-full m-2 relative">
    <div
      class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
    >
      Paso 2 de 4
    </div>
    <div class="flex items-center gap-4 mb-6 mt-12">
      <div>
        <p class="text-sm text-gray-500">
          UUID: {{ linkDePagoStore.paymentLink || "N/A" }}
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
            v-model="linkDePagoStore.metodo"
            class="hidden"
          />
          <div
            :class="
              linkDePagoStore.metodo === 'tarjeta'
                ? 'bg-[#3C4F2E]'
                : 'bg-gray-300'
            "
            class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
          >
            <div
              v-if="linkDePagoStore.metodo === 'tarjeta'"
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
            v-model="linkDePagoStore.metodo"
            class="hidden"
          />
          <div
            :class="
              linkDePagoStore.metodo === 'cuenta'
                ? 'bg-[#3C4F2E]'
                : 'bg-gray-300'
            "
            class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
          >
            <div
              v-if="linkDePagoStore.metodo === 'cuenta'"
              class="w-3 h-3 rounded-full"
            ></div>
          </div>
          <span class="text-sm">Dinero en Cuenta</span>
        </label>
      </div>
    </div>

    <div v-if="linkDePagoStore.metodo === 'tarjeta'" class="mb-6">
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
          <img src="/images/backComplete.png" alt="Anterior" class="w-6 h-6" />
        </button>
        <div class="relative w-full h-[180px] overflow-hidden">
          <div
            v-for="(card, index) in cardStore.cards"
            :key="card.id || index"
            class="absolute w-full transition-all duration-500 ease-in-out"
            :style="{
              transform: `translateX(${getCardTranslateX(index)}%)`,
              opacity: index === linkDePagoStore.tarjetaSeleccionada ? 1 : 0,
              zIndex: index === linkDePagoStore.tarjetaSeleccionada ? 10 : 0,
            }"
          >
            <div
              class="p-4 rounded-xl shadow-lg text-white text-center h-[140px] flex flex-col justify-between relative"
              :class="getCardBackground(card.number)"
            >
              <div>
                <p class="text-xl font-semibold">
                  {{ card.type === "CREDIT" ? "CRÉDITO" : "DÉBITO" }} **** **** **** {{ card.number.slice(-4) }}
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

    <div v-if="linkDePagoStore.metodo === 'cuenta'" class="mb-6">
      <div
        class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-4 rounded-xl text-white shadow"
      >
        <p class="text-sm">Dinero disponible en cuenta</p>
        <p class="text-xl font-bold tracking-widest mt-2">
          {{ formatCurrency(linkDePagoStore.accountBalance) }}
        </p>
      </div>
    </div>

    <p v-if="errorMetodo" class="text-red-500 text-sm mb-4 text-center">
      {{ errorMetodo }}
    </p>
    <p v-if="linkDePagoStore.errors.api" class="text-red-500 text-sm mb-4 text-center">
      {{ linkDePagoStore.errors.api.message }}
    </p>

    <div class="flex justify-between">
      <button
        @click="$emit('go-to-step-1')"
        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 font-semibold"
      >
        Volver
      </button>
      <button
        @click="proceedToConfirmation"
        class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80 font-semibold"
        :disabled="linkDePagoStore.loading"
      >
        <span v-if="linkDePagoStore.loading">Cargando...</span>
        <span v-else>Continuar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";
import { ref, onMounted } from "vue";
import {
  useCardStore,
  getCardLogo,
  getCardBackground,
} from "../store/TarjetasStore.js";

const cardStore = useCardStore();
const linkDePagoStore = useLinkDePagoStore();
const errorMetodo = ref("");

const emit = defineEmits(["proceed-to-confirmation", "go-to-step-1"]);

const proceedToConfirmation = () => {
  errorMetodo.value = "";
  if (linkDePagoStore.metodo === "tarjeta") {
    if (cardStore.cards.length === 0) {
      errorMetodo.value = "No hay tarjetas disponibles. Agregue una tarjeta o elija otro método.";
      return;
    }
    if (!linkDePagoStore.selectedCard) {
      errorMetodo.value = "Por favor, seleccione una tarjeta.";
      return;
    }
  } else if (linkDePagoStore.metodo === "cuenta") {
    if (linkDePagoStore.accountBalance < linkDePagoStore.total) {
      errorMetodo.value = `Saldo insuficiente. Necesita ${formatCurrency(
        linkDePagoStore.total
      )} pero tiene ${formatCurrency(
        linkDePagoStore.accountBalance
      )}. Recargue su cuenta o use otro método.`;
      return;
    }
  } else {
    errorMetodo.value = "Por favor, seleccione un método de pago.";
    return;
  }

  emit("proceed-to-confirmation");
};

const formatCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) return "$0.00";
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};

onMounted(async () => {
  linkDePagoStore.metodo = "tarjeta";
  await cardStore.getAll();
  await linkDePagoStore.fetchAccountBalance(); 
});

const rotateCard = (direction) => {
  const cardsLength = cardStore.cards.length;
  if (!cardsLength) return;
  if (direction === "anterior") {
    linkDePagoStore.tarjetaSeleccionada =
      (linkDePagoStore.tarjetaSeleccionada - 1 + cardsLength) % cardsLength;
  } else if (direction === "siguiente") {
    linkDePagoStore.tarjetaSeleccionada =
      (linkDePagoStore.tarjetaSeleccionada + 1) % cardsLength;
  }
};

const getCardTranslateX = (index) => {
  const total = cardStore.cards.length;
  const current = linkDePagoStore.tarjetaSeleccionada;
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff * 100;
};
</script>