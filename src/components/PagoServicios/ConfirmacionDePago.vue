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
          {{ linkDePagoStore.metodo === "tarjeta" ? `Tarjeta ****${linkDePagoStore.selectedCard?.number.slice(-4)}` : "Dinero en Cuenta" }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Fecha:</span>
          {{ new Date().toLocaleDateString('es-AR') }}
        </p>
      </div>
    </div>

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
    linkDePagoStore.loading = true; // Empieza a cargar

    try {
        const success = await linkDePagoStore.confirmPayment();
        if (success) {
            console.log("ConfirmacionPago.vue: Pago exitoso, emitiendo 'confirm' al padre.");
            emit("confirm");
        } else {
            console.error("ConfirmacionPago.vue: Error al confirmar el pago en el store.");
        }
    } catch (error) {
        console.error("ConfirmacionPago.vue: Error inesperado en confirmAndProceed:", error);
    } finally {
        linkDePagoStore.loading = false; 
    }
};
const formatCurrency = (value) => {
      if (typeof value !== "number" || isNaN(value)) return "$0.00";
      return value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
};
</script>