<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />

    <main class="flex-1 p-5 bg-gray-100 overflow-y-auto">
      <div class="mb-4">
        <h1 class="text-3xl font-bold text-gray-800">Mis Tarjetas</h1>
      </div>

      <div class="flex justify-center">
        <div class="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-700">Tarjetas Vinculadas</h2>
            <button
              @click="showAddCardForm = true"
              class="bg-[#5D8C39] text-white hover:bg-[#5D8C39]/80 font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Añadir Tarjeta
            </button>
          </div>

          <div v-if="cards.length === 0" class="text-center text-gray-500 py-8 mb-4">
            Aún no tienes tarjetas vinculadas.
          </div>

          <div class="flex flex-col items-center pb-10">
            <div
              v-for="(card, index) in cards"
              :key="card.id"
              @click="viewCardDetails(card)"
              @mouseenter="handleMouseEnter(index)"
              @mouseleave="handleMouseLeave"
              class="bg-gradient-to-br from-[#243219] to-[#558B2F] text-white p-6 rounded-lg shadow cursor-pointer
                     transform transition-all duration-300 hover:scale-105 relative
                     w-64 sm:w-72 md:w-80 lg:w-96
                     first:mt-0"
              :class="{ '-mt-12': index > 0 }"
              :style="{ zIndex: calculatedZIndex(index) }"
            >
              <div>
                <p class="text-xl font-semibold truncate">{{ card.type }} **** **** {{ card.last4 }}</p>
                <p class="text-lg opacity-90 truncate">{{ card.bank }}</p>
                <p class="text-base opacity-80 mt-2 truncate">Titular: {{ card.name }}</p>
                <p class="text-base opacity-80 truncate">Expira: {{ card.expiry }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <transition name="fade">
        <AddCardForm
          v-if="showAddCardForm"
          @add-card="handleAddCard"
          @cancel="showAddCardForm = false"
        />
      </transition>

      <transition name="fade">
        <div v-if="showCardDetailModal && selectedCard" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative">
            <button @click="closeCardDetailModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Detalles de Tarjeta</h2>
            <div class="bg-gradient-to-br from-[#243219] to-[#558B2F] text-white p-4 rounded-lg shadow mb-6">
              <p class="text-xl font-semibold mb-2">{{ selectedCard.type }} **** **** {{ selectedCard.last4 }}</p>
              <p class="text-base opacity-90">{{ selectedCard.bank }}</p>
              <p class="text-sm opacity-80 mt-2">Titular: {{ selectedCard.name }}</p>
              <p class="text-sm opacity-80">Expira: {{ selectedCard.expiry }}</p>
            </div>
            <div class="flex justify-center">
              <button
                @click="requestRemoveCard(selectedCard.id)"
                class="text-base bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-200"
              >
                Desvincular Tarjeta
              </button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showRemoveConfirmModal" class="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4">
          <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full m-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Confirmar Desvinculación</h3>
            <p class="text-gray-600 mb-6">¿Estás seguro de que quieres desvincular esta tarjeta?</p>
            <div class="flex justify-end space-x-3">
              <button
                @click="cancelRemoveCard"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md shadow transition duration-200"
              >
                Cancelar
              </button>
              <button
                @click="confirmRemoveCard"
                class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow transition duration-200"
              >
                Sí, Desvincular
              </button>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BarraLateral from '../BarraLateral.vue';
import AddCardForm from './AgregarTarjeta.vue';

const activeButton = ref('tarjetas');

const cards = ref([
  { id: 1, type: 'Visa', last4: '1234', name: 'Juan Perez', expiry: '12/25', bank: 'Mi Banco Principal' },
  { id: 2, type: 'Mastercard', last4: '5678', name: 'Juan Perez', expiry: '08/24', bank: 'Otro Banco' },
  { id: 3, type: 'American Express', last4: '9012', name: 'Juan Perez', expiry: '06/26', bank: 'Banco del Sur' },
  { id: 4, type: 'Discover', last4: '3456', name: 'Juan Perez', expiry: '03/27', bank: 'Banco del Norte' },
]);

const showAddCardForm = ref(false);
const selectedCard = ref(null);
const showCardDetailModal = ref(false);
const showRemoveConfirmModal = ref(false);
const cardIdToRemove = ref(null);
const hoveredIndex = ref(null);

const handleMouseEnter = (index) => {
  hoveredIndex.value = index;
};

const handleMouseLeave = () => {
  hoveredIndex.value = null;
};

const calculatedZIndex = (index) => {
  if (hoveredIndex.value === index) {
    return cards.value.length + 1;
  }
  return cards.value.length - index;
};

const handleAddCard = (card) => {
  cards.value.unshift(card);
  showAddCardForm.value = false;
};

const viewCardDetails = (card) => {
  selectedCard.value = card;
  showCardDetailModal.value = true;
};

const closeCardDetailModal = () => {
  showCardDetailModal.value = false;
};

const requestRemoveCard = (cardId) => {
  cardIdToRemove.value = cardId;
  showCardDetailModal.value = false;
  showRemoveConfirmModal.value = true;
};

const confirmRemoveCard = () => {
  if (cardIdToRemove.value !== null) {
    cards.value = cards.value.filter(card => card.id !== cardIdToRemove.value);
  }
  cardIdToRemove.value = null;
  showRemoveConfirmModal.value = false;
  selectedCard.value = null;
};

const cancelRemoveCard = () => {
  cardIdToRemove.value = null;
  showRemoveConfirmModal.value = false;
  selectedCard.value = null;
};
</script>