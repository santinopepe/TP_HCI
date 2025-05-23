<template>
  <div class="bg-white p-6 rounded-xl shadow-xl max-w-md w-full m-4 relative">
    <!-- Indicador de pasos -->
    <div
      class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
    >
      Paso 3 de 4
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mb-4">Confirmar pago</h2>

    <!-- Detalles del servicio -->
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <div class="space-y-2">
        <p class="text-sm">
          <span class="font-medium">Servicio:</span>
          {{ linkDePagoStore.serviceName }}
        </p>
        <p class="text-sm">
          <span class="font-medium">ID:</span> {{ linkDePagoStore.serviceId }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Monto del servicio:</span> ${{
            linkDePagoStore.amount.toFixed(2)
          }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Cargo:</span> ${{
            linkDePagoStore.cargo.toFixed(2)
          }}
        </p>
        <p class="text-sm font-bold text-green-600 border-t border-dashed pt-2">
          <span class="font-medium">Total a pagar:</span> ${{
            linkDePagoStore.total.toFixed(2)
          }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Método:</span>
          {{ linkDePagoStore.metodo === "tarjeta" ? "Tarjeta" : "Cuenta" }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Fecha:</span>
          {{ new Date().toLocaleDateString() }}
        </p>
      </div>
    </div>

    <!-- Botones -->
    <div class="flex justify-between mt-auto">
      <button
        @click="$emit('cancel')"
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Volver
      </button>
      <button
        @click="
          linkDePagoStore.confirmPayment();
          $emit('confirm');
        "
        class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";

const linkDePagoStore = useLinkDePagoStore();
const emit = defineEmits(["confirm", "cancel"]);
</script>
