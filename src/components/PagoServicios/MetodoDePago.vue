<template>
  <div class="bg-white p-6 rounded-xl shadow-xl max-w-md w-full m-4 relative">
    <!-- Indicador de pasos -->
    <div
      class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
    >
      Paso 2 de 4
    </div>
    <!-- Datos del servicio -->
    <div class="flex items-center gap-4 mb-6">
      <div>
        <p class="text-lg font-semibold">
          {{ linkDePagoStore.serviceName || "Servicio" }}
        </p>
        <p class="text-sm text-gray-500">
          ID: {{ linkDePagoStore.serviceId || "N/A" }}
        </p>
        <p class="text-sm text-gray-500">
          Monto a pagar: ${{ (linkDePagoStore.total || 0).toFixed(2) }}
        </p>
      </div>
    </div>

    <div class="mb-4">
      <p class="text-sm font-medium mb-2">Seleccionar método de pago</p>
      <div class="flex gap-4">
        <!-- Opción Tarjeta -->
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

        <!-- Opción Dinero en Cuenta -->
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

    <!-- Tarjetas -->
    <div v-if="linkDePagoStore.metodo === 'tarjeta'" class="mb-6">
      <p class="text-sm font-medium mb-2">Seleccionar tarjeta</p>
      <div class="flex items-center gap-4 relative overflow-hidden">
        <!-- Botón anterior -->
        <button
          @click="rotateCard('anterior')"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-30"
        >
          <img src="/images/backComplete.png" alt="Anterior" class="w-6 h-6" />
        </button>

        <!-- Contenedor de tarjetas con animación -->
        <div class="relative w-full h-[180px] overflow-hidden">
          <div
            v-for="(card, index) in cardStore.cards"
            :key="card.id || index"
            class="absolute w-full transition-all duration-500 ease-in-out"
            :style="{
              transform: `translateX(${
                (index - linkDePagoStore.tarjetaSeleccionada) * 100
              }%)`,
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

        <!-- Botón siguiente -->
        <button
          @click="rotateCard('siguiente')"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-20"
        >
          <img src="/images/forward.png" alt="Siguiente" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Dinero en cuenta -->
    <div v-if="linkDePagoStore.metodo === 'cuenta'" class="mb-6">
      <div
        class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-4 rounded-xl text-white shadow"
      >
        <p class="text-sm">Dinero disponible en cuenta</p>
        <p class="text-xl font-bold tracking-widest mt-2">
          ${{ (linkDePagoStore.accountBalance || 0).toFixed(2) }}
        </p>
      </div>
    </div>

    <!-- Botones -->
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
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";
import { onMounted } from "vue";
import { useCardStore, getCardLogo, getCardBackground } from "../store/TarjetasStore.js";

const cardStore = useCardStore();

const linkDePagoStore = useLinkDePagoStore();

const emit = defineEmits(["proceed-to-confirmation", "go-to-step-1"]);

const proceedToConfirmation = () => {
  console.log(
    "Proceeding to confirmation with method:",
    linkDePagoStore.metodo
  );
  const paymentDetails = {
    metodo: linkDePagoStore.metodo,
    card:
      linkDePagoStore.metodo === "tarjeta"
        ? linkDePagoStore.selectedCard
        : null,
  };
  console.log("Emitting proceed-to-confirmation with details:", paymentDetails);
  emit("proceed-to-confirmation", paymentDetails);
};

onMounted(async () => {
  await cardStore.getAll();
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
</script>
