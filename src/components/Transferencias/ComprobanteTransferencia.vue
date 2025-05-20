<template>
  <div class="flex flex-col items-center min-h-screen bg-gradient-to-b from-pink-50 to-white p-32 font-sans">
    <div class="max-w-sm w-full space-y-6">
      <div class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm">
        Paso 4 de 4
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-md text-center">
        <h2 class="text-2xl font-semibold text-gray-800">
          ¡Perfecto! La transferencia a {{ transferenciaStore.receiptDetails.destinatario }} se ha realizado con éxito
        </h2>
      </div>

      <div class="bg-white rounded-3xl p-6 shadow-md text-center">
        <p class="text-lg font-medium text-gray-600 mb-4">Monto transferido</p>
        <p class="text-2xl font-bold text-gray-900 mb-6">${{ transferenciaStore.receiptDetails.monto ? Number(transferenciaStore.receiptDetails.monto).toFixed(2) : '0.00' }}</p>
        <button
          class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 transition w-full flex items-center justify-center gap-2"
        >
          <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
          Compartir comprobante
        </button>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 w-full p-8 bg-transparent">
      <div class="max-w-sm mx-auto flex flex-col gap-4">
        <button
          @click="hacerOtraTransferencia"
          class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 transition w-full"
        >
          Hacer otra transferencia
        </button>
        <button
          @click="volverAlInicio"
          class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 transition w-full"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'; 
import { useTransferenciaStore } from '../store/TransferenciasStore.js';

export default defineComponent({
  name: 'ComprobanteTransferencia',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const transferenciaStore = useTransferenciaStore();

    onMounted(() => {
      transferenciaStore.setReceiptDetailsFromRoute(route.params, route.query);
    });

    onBeforeRouteLeave((to, from, next) => {
      if (!to.path.startsWith('/transferir')) {
        transferenciaStore.resetTransferenciaFlow();
      }
      next();
    });

    const hacerOtraTransferencia = () => {
      transferenciaStore.resetTransferForm();
      router.push({ name: 'Transferencias' });
    };

    const volverAlInicio = () => {
      transferenciaStore.resetTransferenciaFlow();
      router.push({ name: 'Paginaprincipal' });
    };

    return {
      transferenciaStore,
      hacerOtraTransferencia,
      volverAlInicio,
    };
  },
});
</script>