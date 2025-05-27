<template>
  <div class="bg-white p-6 rounded-xl shadow-xl max-w-md w-full m-4 relative">
    <div
      class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
    >
      Paso 4 de 4
    </div>

    <div class="p-6 rounded-lg mb-4">
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
        <h3 class="text-xl font-semibold text-gray-800">¡Pago exitoso!</h3>
        <p class="text-gray-600 text-sm">
            UUID: {{ linkDePagoStore.paymentLink }}
        </p>
      </div>


    </div>

    <div class="flex flex-col gap-4 items-center mt-auto">
      <button
        class="flex items-center gap-2 bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 w-[300px] justify-center"
        @click="$emit('share-receipt')"
      >
        <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
        <span>Compartir comprobante</span>
      </button>
      <button
        @click="
          linkDePagoStore.resetPayment();
          $emit('return-to-home');
        "
        class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 w-[300px]"
      >
        Finalizar
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";

const linkDePagoStore = useLinkDePagoStore();
const emit = defineEmits([
  "make-another-payment",
  "return-to-home",
  "share-receipt",
]);
</script>