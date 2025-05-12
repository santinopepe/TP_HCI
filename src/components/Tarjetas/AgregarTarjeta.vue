<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative">
      <button @click="cancelAddCard" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Agregar Nueva Tarjeta</h2>
      <form @submit.prevent="addCard">
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label for="cardNumber" class="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
            <input
              type="text"
              id="cardNumber"
              v-model="newCard.number"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="cardName" class="block text-sm font-medium text-gray-700">Nombre en la Tarjeta</label>
            <input
              type="text"
              id="cardName"
              v-model="newCard.name"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="cardExpiry" class="block text-sm font-medium text-gray-700">Fecha de Vencimiento (MM/AA)</label>
              <input
                type="text"
                id="cardExpiry"
                v-model="newCard.expiry"
                required
                placeholder="Ej: 12/25"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label for="cardCvv" class="block text-sm font-medium text-gray-700">CVV/CVC</label>
              <input
                type="text"
                id="cardCvv"
                v-model="newCard.cvv"
                required
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div>
            <label for="cardType" class="block text-sm font-medium text-gray-700">Tipo (Visa, Mastercard, etc.)</label>
            <input
              type="text"
              id="cardType"
              v-model="newCard.type"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="cardBank" class="block text-sm font-medium text-gray-700">Banco o Emisor</label>
            <input
              type="text"
              id="cardBank"
              v-model="newCard.bank"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button
            type="submit"
            class="bg-[#5D8C39] hover:bg-[#5D8C39]/80 text-white font-bold py-2 px-4 rounded-md shadow transition duration-200"
          >
            Vincular Tarjeta
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newCard = ref({ number: '', name: '', expiry: '', cvv: '', type: '', bank: '' });

const emit = defineEmits(['add-card', 'cancel']);

const addCard = () => {
  if (!newCard.value.number || !newCard.value.name || !newCard.value.expiry || !newCard.value.cvv || !newCard.value.type || !newCard.value.bank) {
    return;
  }
  const last4 = newCard.value.number.slice(-4);
  const card = {
    id: Date.now(),
    type: newCard.value.type,
    last4,
    name: newCard.value.name,
    expiry: newCard.value.expiry,
    bank: newCard.value.bank,
  };
  emit('add-card', card);
  resetNewCardForm();
};

const cancelAddCard = () => {
  resetNewCardForm();
  emit('cancel');
};

const resetNewCardForm = () => {
  newCard.value = { number: '', name: '', expiry: '', cvv: '', type: '', bank: '' };
};
</script>