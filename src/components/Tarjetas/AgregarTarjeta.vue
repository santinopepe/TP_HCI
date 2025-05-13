<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Agregar Nueva Tarjeta</h2>
      <form @submit.prevent="addCard">
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label for="cardNumber" class="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
            <input
              type="text"
              inputmode="numeric"
              id="cardNumber"
              v-model="newCard.number"
              autocomplete="cc-number"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              :class="{ 'border-red-500': errors.number }"
            />
            <p v-if="errors.number" class="text-red-500 text-sm mt-1">{{ errors.number }}</p>
          </div>
          <div>
            <label for="cardName" class="block text-sm font-medium text-gray-700">Nombre en la Tarjeta</label>
            <input
              type="text"
              id="cardName"
              v-model="newCard.name"
              autocomplete="cc-name"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="cardExpiry" class="block text-sm font-medium text-gray-700">Fecha de Vencimiento (MM/AAAA)</label>
              <input
                type="text"
                id="cardExpiry"
                v-model="newCard.expiry"
                placeholder="MM/AAAA"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                :class="{ 'border-red-500': errors.expiry }"
                @input="formatExpiry"
              />
              <p v-if="errors.expiry" class="text-red-500 text-sm mt-1">{{ errors.expiry }}</p>
            </div>
            <div>
              <label for="cardCvv" class="block text-sm font-medium text-gray-700">CVV/CVC</label>
              <input
                type="text"
                inputmode="numeric"
                id="cardCvv"
                v-model="newCard.cvv"
                autocomplete="cc-csc"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                :class="{ 'border-red-500': errors.cvv }"
              />
              <p v-if="errors.cvv" class="text-red-500 text-sm mt-1">{{ errors.cvv }}</p>
            </div>
          </div>
          <div>
            <label for="cardType" class="block text-sm font-medium text-gray-700">Tipo (Visa, Mastercard, etc.)</label>
            <input
              type="text"
              id="cardType"
              v-model="newCard.type"
              autocomplete="cc-type"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              :class="{ 'border-red-500': errors.type }"
            />
            <p v-if="errors.type" class="text-red-500 text-sm mt-1">{{ errors.type }}</p>
          </div>
          <div>
            <label for="cardBank" class="block text-sm font-medium text-gray-700">Banco o Emisor</label>
            <input
              type="text"
              id="cardBank"
              v-model="newCard.bank"
              autocomplete="organization"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              :class="{ 'border-red-500': errors.bank }"
            />
            <p v-if="errors.bank" class="text-red-500 text-sm mt-1">{{ errors.bank }}</p>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button
            type="button"
            @click="cancelAddCard"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-[#5D8C39] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5D8C39]/80 transition"
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
const errors = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: '',
  type: '',
  bank: '',
});

const emit = defineEmits(['add-card', 'cancel']);

// Formatear la fecha de vencimiento como MM/AAAA
const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  if (value.length > 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 6); // Insertar la barra después de los primeros 2 dígitos
  }
  event.target.value = value;
  newCard.value.expiry = value;
};

const validateForm = () => {
  let isValid = true;

  // Validar número de tarjeta
  if (!newCard.value.number.trim()) {
    errors.value.number = 'El número de tarjeta no puede estar vacío.';
    isValid = false;
  } else {
    errors.value.number = '';
  }

  // Validar nombre en la tarjeta
  if (!newCard.value.name.trim()) {
    errors.value.name = 'El nombre en la tarjeta no puede estar vacío.';
    isValid = false;
  } else {
    errors.value.name = '';
  }

  // Validar fecha de vencimiento
  if (!/^\d{2}\/\d{4}$/.test(newCard.value.expiry)) {
    errors.value.expiry = 'La fecha de vencimiento debe tener el formato MM/AAAA.';
    isValid = false;
  } else {
    errors.value.expiry = '';
  }

  // Validar CVV
  if (!newCard.value.cvv.trim()) {
    errors.value.cvv = 'El CVV no puede estar vacío.';
    isValid = false;
  } else {
    errors.value.cvv = '';
  }

  // Validar tipo de tarjeta
  if (!newCard.value.type.trim()) {
    errors.value.type = 'El tipo de tarjeta no puede estar vacío.';
    isValid = false;
  } else {
    errors.value.type = '';
  }

  // Validar banco o emisor
  if (!newCard.value.bank.trim()) {
    errors.value.bank = 'El banco o emisor no puede estar vacío.';
    isValid = false;
  } else {
    errors.value.bank = '';
  }

  return isValid;
};

const addCard = () => {
  if (validateForm()) {
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
  }
};

const cancelAddCard = () => {
  resetNewCardForm();
  emit('cancel');
};

const resetNewCardForm = () => {
  newCard.value = { number: '', name: '', expiry: '', cvv: '', type: '', bank: '' };
  errors.value = { number: '', name: '', expiry: '', cvv: '', type: '', bank: '' };
};
</script>