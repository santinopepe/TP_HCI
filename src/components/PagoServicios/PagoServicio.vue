<template>
  <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative">
    <div
      class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
    >
      Paso 1 de 4
    </div>
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">
      Código de pago
    </h2>
    <form @submit.prevent="submitLink">
      <div class="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label
            for="paymentLink"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Código de pago (UUID)</label
          >
          <input
            type="text"
            id="paymentLink"
            v-model="linkDePagoStore.paymentLink"
            placeholder="Ejemplo: 8af03b83-3a55-4418-aa1a-a2269e9a4677"
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-10 text-gray-700 placeholder-gray-400"
            :class="{ 'border-red-500': linkDePagoStore.errors.paymentLink }"
          />
          <p
            v-if="linkDePagoStore.errors.paymentLink"
            class="text-red-500 text-sm mt-1"
          >
            {{ linkDePagoStore.errors.paymentLink }}
          </p>
          <p v-if="linkDePagoStore.errors.api" class="text-red-500 text-sm mt-1">
            Error al buscar pago: {{ linkDePagoStore.errors.api.message || 'Error desconocido' }}
          </p>
        </div>
      </div>
      <div class="mt-4 flex justify-between">
        <button
          type="button"
          @click="$emit('cancel')"
          class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="bg-[#5D8C39] text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center hover:bg-[#5D8C39]/80"
          :disabled="linkDePagoStore.loading"
        >
          <span v-if="linkDePagoStore.loading">Cargando...</span>
          <span v-else>Continuar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";

const linkDePagoStore = useLinkDePagoStore();
const emit = defineEmits(["submit-link", "cancel"]);

const submitLink = async () => {
  linkDePagoStore.errors.paymentLink = null; 
  linkDePagoStore.errors.api = null; 

  if (!linkDePagoStore.paymentLink.trim()) {
    linkDePagoStore.errors.paymentLink = "Por favor, ingrese un código de pago.";
    return;
  
  
  }
  emit("submit-link"); 
};
</script> 