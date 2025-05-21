<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Agregar Nueva Tarjeta
      </h2>
      <form @submit.prevent="addCard">
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label
              for="cardNumber"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Número de Tarjeta</label
            >
            <input
              type="text"
              inputmode="numeric"
              id="cardNumber"
              v-model="newCard.number"
              autocomplete="cc-number"
              @input="formatCardNumber"
              placeholder="1234 5678 9012 3456"
              class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-10 text-gray-700 placeholder-gray-400"
              :class="{ 'border-red-500': errors.number }"
            />
            <p v-if="errors.number" class="text-red-500 text-sm mt-1">
              {{ errors.number }}
            </p>
          </div>
          <div>
            <label
              for="cardName"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Nombre del Titular</label
            >
            <input
              type="text"
              id="cardName"
              v-model="newCard.name"
              autocomplete="cc-name"
              placeholder="Juan Perez"
              class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-10 text-gray-700 placeholder-gray-400"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">
              {{ errors.name }}
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="cardExpiry"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Fecha de Vencimiento (MM/AA)</label
              >
              <input
                type="text"
                id="cardExpiry"
                v-model="newCard.expiry"
                placeholder="MM/AA"
                class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-10 text-gray-700 placeholder-gray-400"
                :class="{ 'border-red-500': errors.expiry }"
                @input="formatExpiry"
              />
              <p v-if="errors.expiry" class="text-red-500 text-sm mt-1">
                {{ errors.expiry }}
              </p>
            </div>
            <div>
              <label
                for="cardCvv"
                class="block text-sm font-medium text-gray-700 mb-1"
                >CVV/CVC</label
              >
              <input
                type="text"
                inputmode="numeric"
                id="cardCvv"
                v-model="newCard.cvv"
                autocomplete="cc-csc"
                placeholder="123"
                @input="formatCvv"
                class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-10 text-gray-700 placeholder-gray-400"
                :class="{ 'border-red-500': errors.cvv }"
              />
              <p v-if="errors.cvv" class="text-red-500 text-sm mt-1">
                {{ errors.cvv }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button
            type="button"
            @click="cancelAddCard"
            class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-[#5D8C39] text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center hover:bg-[#5D8C39]/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Vincular Tarjeta
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newCard = ref({
  number: "",
  name: "",
  expiry: "",
  cvv: "",
  type: "",
  bank: "",
});
const errors = ref({
  number: "",
  name: "",
  expiry: "",
  cvv: "",
  type: "",
  bank: "",
});

const emit = defineEmits(["add-card", "cancel"]);

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4); // Insertar la barra después de los primeros 2 dígitos para MM/AA
  }
  newCard.value.expiry = value;
};

const formatCvv = (event) => {
  let value = event.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  newCard.value.cvv = value.slice(0, 3); // Limitar a 3 dígitos
};

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  value = value.replace(/(.{4})/g, "$1 ").trim(); // Add space every 4 digits
  newCard.value.number = value; // Update the card number
};

const validateForm = () => {
  let isValid = true;

  // Validar número de tarjeta
  if (!newCard.value.number.trim()) {
    errors.value.number = "El número de tarjeta no puede estar vacío.";
    isValid = false;
  } else {
    errors.value.number = "";
  }

  // Validar nombre en la tarjeta
  if (!newCard.value.name.trim()) {
    errors.value.name = "El nombre en la tarjeta no puede estar vacío.";
    isValid = false;
  } else {
    errors.value.name = "";
  }

  // Validar fecha de vencimiento
  if (!/^\d{2}\/\d{2}$/.test(newCard.value.expiry)) {
    errors.value.expiry =
      "La fecha de vencimiento debe tener el formato MM/AA.";
    isValid = false;
  } else {
    errors.value.expiry = "";
  }

  // Validar CVV
  if (!newCard.value.cvv.trim()) {
    errors.value.cvv = "El CVV no puede estar vacío.";
    isValid = false;
  } else if (newCard.value.cvv.length !== 3) {
    errors.value.cvv = "El CVV debe tener exactamente 3 dígitos.";
    isValid = false;
  } else {
    errors.value.cvv = "";
  }

  return isValid;
};
const getCardType = (cardNumber) => {
  const sanitizedCardNumber = cardNumber.replace(/\s+/g, ""); // Remove spaces
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(sanitizedCardNumber)) {
    return "Visa";
  } else if (
    /^5[1-5][0-9]{14}$/.test(sanitizedCardNumber) ||
    /^2(2[2-9][0-9]{2}|[3-6][0-9]{3}|7[01][0-9]{2}|720[0-9]{2})[0-9]{12}$/.test(
      sanitizedCardNumber
    )
  ) {
    return "Mastercard";
  } else if (/^3[47][0-9]{13}$/.test(sanitizedCardNumber)) {
    return "American Express";
  } else {
    return "Unknown";
  }
};

const addCard = () => {
  if (validateForm()) {
    const last4 = newCard.value.number.slice(-4);
    const card = {
      id: Date.now(),
      type: getCardType(newCard.value.number),
      last4,
      name: newCard.value.name,
      expiry: newCard.value.expiry,
      bank: newCard.value.bank,
    };
    emit("add-card", card);
    resetNewCardForm();
  }
};

const cancelAddCard = () => {
  resetNewCardForm();
  emit("cancel");
};

const resetNewCardForm = () => {
  newCard.value = {
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    type: "",
    bank: "",
  };
  errors.value = {
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    type: "",
    bank: "",
  };
};
</script>
