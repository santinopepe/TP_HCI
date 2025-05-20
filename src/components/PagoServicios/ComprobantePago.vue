<template>
  <div class="bg-gradient-to-b from-pink-50 to-white p-6 rounded-3xl max-w-sm w-full space-y-6 font-sans relative">
    <div class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm">
      Paso 4 de 4
    </div>
    <div class="bg-white rounded-3xl p-6 shadow-md text-center">
      <h2 class="text-2xl font-semibold text-gray-800">
        ¡Perfecto! El pago del servicio se ha realizado con éxito
      </h2>
    </div>

    <div class="bg-white rounded-3xl p-6 shadow-md text-center">
      <p class="text-lg font-medium text-gray-600 mb-4">Monto pagado</p>
      <p class="text-2xl font-bold text-gray-900 mb-6">${{ linkDePagoStore.total.toFixed(2) }}</p>
      <button
        class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 transition w-full flex items-center justify-center gap-2"
        @click="$emit('share-receipt')"
      >
        <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
        Compartir comprobante
      </button>
    </div>

    <!-- Botones -->
    <div class="flex flex-col gap-4">
      <button
        @click="linkDePagoStore.resetPayment(); $emit('make-another-payment')"
        class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 transition w-full"
      >
        Hacer otro pago
      </button>
      <button
        @click="linkDePagoStore.resetPayment(); $emit('return-to-home')"
        class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 transition w-full"
      >
        Volver al inicio
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLinkDePagoStore } from '../store/LinkDePagoStore.js';

const linkDePagoStore = useLinkDePagoStore();
const emit = defineEmits(['make-another-payment', 'return-to-home', 'share-receipt']);
</script>