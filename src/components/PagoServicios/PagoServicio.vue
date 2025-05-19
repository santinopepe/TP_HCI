<template>
  <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative">
    <!-- Indicador de pasos -->
    <div class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm">
      Paso 1 de 4
    </div>
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Ingresar Link de Pago</h2>
    <form @submit.prevent="submitLink">
      <div class="grid grid-cols-1 gap-4 mb-6">
        <!-- Campo para el link de pago -->
        <div>
          <label for="paymentLink" class="block text-sm font-medium text-gray-700 mb-1">Link de Pago</label>
          <input
            type="text"
            id="paymentLink"
            v-model="paymentLink"
            placeholder="https://ejemplo.com/pago/12345"
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-10 text-gray-700 placeholder-gray-400"
            :class="{ 'border-red-500': errors.paymentLink }"
          />
          <p v-if="errors.paymentLink" class="text-red-500 text-sm mt-1">{{ errors.paymentLink }}</p>
        </div>
      </div>
      <!-- Botones -->
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
        >
          Continuar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit-link', 'cancel']);

const paymentLink = ref('');
const errors = ref({
  paymentLink: '',
});

const submitLink = () => {
  if (!paymentLink.value.trim()) {
    errors.value.paymentLink = 'El link de pago no puede estar vacío.';
    return;
  }
  errors.value.paymentLink = '';
  emit('submit-link', paymentLink.value);
};
</script>