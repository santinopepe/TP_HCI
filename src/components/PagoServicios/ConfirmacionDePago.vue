<template>
  <div class="bg-white p-6 rounded-xl shadow-xl max-w-md w-full m-4 relative">
    <div
      class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
    >
      Paso 3 de 4
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mb-4">Confirmar pago</h2>

    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <div class="space-y-2">
        <p class="text-sm">
          <span class="font-medium">UUID:</span> {{ linkDePagoStore.paymentLink }}
        </p>
        
        <p class="text-sm">
          <span class="font-medium">Método:</span>
          {{ linkDePagoStore.metodo === "tarjeta" ? `Tarjeta ****${linkDePagoStore.selectedCard?.number.slice(-4)}` : "Dinero en cuenta" }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Fecha:</span>
          {{ new Date().toLocaleDateString('es-AR') }}
        </p>
      </div>
    </div>
    
    <p v-if="linkDePagoStore.errors.api" class="text-red-500 text-sm mb-4 text-center">
        Error al procesar el pago: {{ translateErrorMessage(linkDePagoStore.errors.api.message) || 'Error desconocido' }}
    </p>

    <div class="flex justify-between mt-auto">
      <button
        @click="$emit('go-to-step-2')"
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Volver
      </button>
      <button
        @click="confirmAndProceed"
        class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
        :disabled="linkDePagoStore.loading"
      >
        <span v-if="linkDePagoStore.loading">Procesando...</span>
        <span v-else>Confirmar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";

const linkDePagoStore = useLinkDePagoStore();
const emit = defineEmits(["confirm", "go-to-step-2"]);

const confirmAndProceed = async () => {
    linkDePagoStore.errors.api = null;
    linkDePagoStore.loading = true; 

    try {
        const success = await linkDePagoStore.confirmPayment();
        if (success) {
            emit("confirm");
        } else {
            console.error("ConfirmacionPago.vue: Error al confirmar el pago en el store.");
        }
    } catch (error) {
        console.error("ConfirmacionPago.vue: Error inesperado en la confirmación del pago.");
    } finally {
        linkDePagoStore.loading = false; 
    }
};
const translateErrorMessage = (error)=>{
    if (typeof error === 'string') {
        if (error.includes("Payment must be pushed with another user")) {
            return "El pago debe realizarse a otro usuario diferente.";
        }
        return error;
    }
      if (error?.message) {
        if (error.message.includes("Payment must be pushed with another user")) {
            return "El pago debe realizarse a otro usuario diferente.";
        }
        return error.message;
      }
}
</script>