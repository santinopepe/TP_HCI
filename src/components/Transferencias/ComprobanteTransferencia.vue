<template>
  <div class="flex flex-col items-center min-h-screen bg-gradient-to-b from-pink-50 to-white p-32 font-sans">
    <div class="max-w-sm w-full space-y-6">
      <!-- Bloque 1: Mensaje de éxito -->
      <div class="bg-white rounded-3xl p-6 shadow-md text-center">
        <h2 class="text-2xl font-semibold text-gray-800">
          ¡Perfecto! La transferencia a {{ destinatario }} se ha realizado con éxito
        </h2>
      </div>

      <!-- Bloque 2: Monto y botón compartir -->
      <div class="bg-white rounded-3xl p-6 shadow-md text-center">
        <p class="text-lg font-medium text-gray-600 mb-4">Monto transferido</p>
        <p class="text-2xl font-bold text-gray-900 mb-6">${{ monto ? Number(monto).toFixed(2) : '0.00' }}</p>
        <button
          class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39]/80 transition w-full flex items-center justify-center gap-2"
        >
          <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
          Compartir comprobante
        </button>
      </div>
    </div>

    <!-- Botones pegados al borde inferior -->
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
import { contactStore } from '../tienda.js';

export default {
  name: 'ComprobanteTransferencia',
  computed: {
    transferencia() {
      const transferId = this.$route.params.transferId;
      return contactStore.getTransferenciaById(transferId);
    },
    destinatario() {
      return decodeURIComponent(this.$route.params.destinatario || '');
    },
      monto() {
        return Number(this.$route.query.monto) || 0;
      },
      metodo() {
        return this.$route.query.metodo || '';
      },
      fecha() {
        return this.$route.query.fecha || '';
      },
      orden() {
        return this.$route.query.orden || '';
      },
  },
  methods: {
    hacerOtraTransferencia() {
      this.$router.push({ name: 'Transferencias' });
    },
    volverAlInicio() {
      this.$router.push({ name: 'Paginaprincipal' });
    },
  },
};
</script>