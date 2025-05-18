<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-gradient-to-b from-pink-50 to-white p-6 rounded-3xl max-w-sm w-full shadow-xl text-center font-sans relative">
      <div class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm">
        Paso 3 de 4
      </div>
      <!-- Encabezado -->
      <div class="text-left mb-4 relative">
        <h2 class="text-center font-semibold text-gray-800 text-lg">Confirmación</h2>
      </div>

      <!-- Total -->
      <p class="text-gray-600 text-sm mb-1">Total</p>
      <p class="text-3xl font-bold text-gray-900 mb-4">${{ total.toFixed(2) }}</p>

      <!-- Detalles -->
      <div class="bg-white rounded-xl text-sm text-gray-700 space-y-2 p-4 border-t border-b border-dashed border-gray-300 mb-4">
        <div class="text-left font-semibold text-base">Detalles de transferencia</div>
        <div class="flex justify-between">
          <span>Total de la transferencia</span>
          <span>${{ parseFloat(monto).toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Cargo</span>
          <span>${{ cargo.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between font-bold text-green-600 border-t border-dashed pt-2">
          <span>Pago final</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Aviso -->
      <div class="bg-green-50 text-green-800 text-sm p-3 rounded-lg flex items-center gap-2 mb-5">
        Se realizará el pago una vez confirmes la transacción.
      </div>

      <!-- Botones -->
      <div class="flex justify-between">
        <button
          @click="cancelarTransferencia"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          @click="confirmarTransferencia"
          class="bg-[#5D8C39] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5D8C39]/80 transition"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    monto: { type: String, required: true },
    contacto: { type: Object, required: true },
  },
  computed: {
    cargo() {
      return 1.00;
    },
    total() {
      return parseFloat(this.monto) + this.cargo;
    },
  },
  methods: {
    confirmarTransferencia() {
      this.$emit('confirmar');
    },
    cancelarTransferencia() {
      this.$emit('cancelar');
    },
  },
};
</script>