<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Agregar nueva tarjeta
      </h2>
      <form @submit.prevent="addCard">
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label
              for="cardNumber"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Número de tarjeta</label
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
              >Nombre del titular</label
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
                >Fecha de vencimiento (MM/AA)</label
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
            <div>
              <label
                for="cardType"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Tipo de tarjeta</label
              >
              <select
                id="cardType"
                v-model="newCard.type"
                class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 h-10 text-gray-700"
                :class="{ 'border-red-500': errors.type }"
              >
                <option value="">Selecciona tipo</option>
                <option value="CREDIT">Crédito</option>
                <option value="DEBIT">Débito</option>
              </select>
              <p v-if="errors.type" class="text-red-500 text-sm mt-1">
                {{ errors.type }}
              </p>
            </div>
          </div>
        </div>
        <p v-if="apiError" class="text-red-500 text-center mt-2">
          {{ apiError }}
        </p>
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
            Vincular tarjeta
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCardStore } from "../store/TarjetasStore.js";
const cardStore = useCardStore();

const newCard = ref({
  type: "",
  number: "",
  expiry: "",
  name: "",
  cvv: "",
  metadata: {},
});
const errors = ref({
  type: "",
  number: "",
  expiry: "",
  name: "",
  cvv: "",
  metadata: {},
});

const emit = defineEmits(["add-card", "cancel"]);

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, "");
  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }
  newCard.value.expiry = value;
};

const formatCvv = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  newCard.value.cvv = value.slice(0, 3);
};

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, ""); 
  value = value.replace(/(.{4})/g, "$1 ").trim();
  newCard.value.number = value; 
};

const validateForm = () => {
  let isValid = true;

  if (!newCard.value.number.trim()) {
    errors.value.number = "El número de tarjeta no puede estar vacío.";
    isValid = false;
  } else {
    errors.value.number = "";
  }

  if (!newCard.value.name.trim()) {
    errors.value.name = "El nombre en la tarjeta no puede estar vacío.";
    isValid = false;
  } else {
    errors.value.name = "";
  }

  if (!/^\d{2}\/\d{2}$/.test(newCard.value.expiry)) {
    errors.value.expiry =
      "La fecha de vencimiento debe tener el formato MM/AA.";
    isValid = false;
  } else {
    errors.value.expiry = "";
  }

  if (!newCard.value.type) {
    errors.value.type = "Selecciona el tipo de tarjeta.";
    isValid = false;
  } else {
    errors.value.type = "";
  }

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

const apiError = ref(""); 

const addCard = async () => {
  apiError.value = "";
  if (validateForm()) {
    const card = {
      type: newCard.value.type,
      number: newCard.value.number.replace(/\s+/g, ""),
      expirationDate: newCard.value.expiry,
      fullName: newCard.value.name,
      cvv: newCard.value.cvv,
      metadata: {},
    };
    try {
      await cardStore.add(card);
      emit("add-card", card);
      resetNewCardForm();
      router.push('/tarjetas');
    } catch (error) {
        apiError.value = error?.response?.data?.message || error.message || "Error al agregar la tarjeta.";
        if(apiError.value === "Card expired."){
          apiError.value = "La tarjeta ha expirado. Por favor, verifica la fecha de vencimiento.";
        }
        else if(apiError.value === "Invalid card number. It must be 15, 16, or 19 digits."){
          apiError.value = "Numero de tarjeta inválido. Debe tener 15, 16 o 19 dígitos.";
        }
        else if(apiError.value === "Card already added."){
          apiError.value = "Esta tarjeta ya ha sido agregada.";
        }
    }
  }
};

const cancelAddCard = () => {
  resetNewCardForm();
  emit("cancel");
};

const resetNewCardForm = () => {
  newCard.value = {
    type: "",
    number: "",
    expiry: "",
    fullName: "",
    cvv: "",
    metadata: {},
  };
  errors.value = {
    type: "",
    number: "",
    expiry: "",
    fullName: "",
    cvv: "",
    metadata: {},
  };
};
</script>