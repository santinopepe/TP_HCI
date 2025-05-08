<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />

    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Mis Tarjetas</h1>
      </div>

      <div class="flex justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-700">Tarjetas Vinculadas</h2>
            <button
              @click="showAddCardForm = true"
              class="bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700 font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center"
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
              :style="{ zIndex: calculatedZIndex(index) }" >
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
        <div v-if="showAddCardForm" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
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
                  <input type="text" id="cardNumber" v-model="newCard.number" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                </div>
                <div>
                  <label for="cardName" class="block text-sm font-medium text-gray-700">Nombre en la Tarjeta</label>
                  <input type="text" id="cardName" v-model="newCard.name" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="cardExpiry" class="block text-sm font-medium text-gray-700">Fecha de Vencimiento (MM/AA)</label>
                    <input type="text" id="cardExpiry" v-model="newCard.expiry" required placeholder="Ej: 12/25" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                  </div>
                  <div>
                    <label for="cardCvv" class="block text-sm font-medium text-gray-700">CVV/CVC</label>
                    <input type="text" id="cardCvv" v-model="newCard.cvv" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                  </div>
                </div>
                <div>
                  <label for="cardType" class="block text-sm font-medium text-gray-700">Tipo (Visa, Mastercard, etc.)</label>
                  <input type="text" id="cardType" v-model="newCard.type" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                </div>
                <div>
                  <label for="cardBank" class="block text-sm font-medium text-gray-700">Banco o Emisor</label>
                  <input type="text" id="cardBank" v-model="newCard.bank" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <button type="submit" class="bg-[#243219] hover:bg-[#354a2f] text-white font-bold py-2 px-4 rounded-md shadow transition duration-200">
                  Vincular Tarjeta
                </button>
              </div>
            </form>
          </div>
        </div>
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
import BarraLateral from './BarraLateral.vue';

const activeButton = ref('tarjetas');

const cards = ref([
  { id: 1, type: 'Visa', last4: '1234', name: 'Juan Perez', expiry: '12/25', bank: 'Mi Banco Principal' },
  { id: 2, type: 'Mastercard', last4: '5678', name: 'Juan Perez', expiry: '08/24', bank: 'Otro Banco' },
  { id: 3, type: 'American Express', last4: '9012', name: 'Juan Perez', expiry: '06/26', bank: 'Banco del Sur' },
  { id: 4, type: 'Discover', last4: '3456', name: 'Juan Perez', expiry: '03/27', bank: 'Banco del Norte' },
]);

const showAddCardForm = ref(false);
const newCard = ref({ number: '', name: '', expiry: '', cvv: '', type: '', bank: '' });

const selectedCard = ref(null);
const showCardDetailModal = ref(false);

const showRemoveConfirmModal = ref(false);
const cardIdToRemove = ref(null);

// --- Logic to track hovered card and control z-index ---
const hoveredIndex = ref(null);

const handleMouseEnter = (index) => {
  hoveredIndex.value = index;
};

const handleMouseLeave = () => {
  hoveredIndex.value = null;
};

const calculatedZIndex = (index) => {
  if (hoveredIndex.value === index) {
    return cards.value.length + 1; // Ensure hovered is always on top of others
  }
  return cards.value.length - index; // Stacking order
};


const addCard = () => {
  if (!newCard.value.number || !newCard.value.name || !newCard.value.expiry || !newCard.value.cvv || !newCard.value.type || !newCard.value.bank) {
    return;
  }
  const last4 = newCard.value.number.slice(-4);
  const newId = Date.now(); // Simple ID generation
  // Add to the beginning of the array to have it appear on top initially
  cards.value.unshift({ 
    id: newId,
    type: newCard.value.type,
    last4: last4,
    name: newCard.value.name,
    expiry: newCard.value.expiry,
    bank: newCard.value.bank,
  });
  resetNewCardForm();
  showAddCardForm.value = false;
};

const resetNewCardForm = () => {
  newCard.value = { number: '', name: '', expiry: '', cvv: '', type: '', bank: '' };
};

const cancelAddCard = () => {
  resetNewCardForm();
  showAddCardForm.value = false;
};

const viewCardDetails = (card) => {
  selectedCard.value = card;
  showCardDetailModal.value = true;
};

const closeCardDetailModal = () => {
  showCardDetailModal.value = false;
  // It's good practice to nullify selected card if user explicitly closes detail view
  // and not proceeding to remove, to avoid stale state.
  // However, if requestRemoveCard keeps it for context, this might be optional.
  // For now, let's keep it simple.
};

const requestRemoveCard = (cardId) => {
  cardIdToRemove.value = cardId;
  showCardDetailModal.value = false; // Close detail modal
  showRemoveConfirmModal.value = true;
};

const confirmRemoveCard = () => {
  if (cardIdToRemove.value !== null) {
    cards.value = cards.value.filter(card => card.id !== cardIdToRemove.value);
  }
  cardIdToRemove.value = null;
  showRemoveConfirmModal.value = false;
  selectedCard.value = null; // Clear selected card after removal
};

const cancelRemoveCard = () => {
  cardIdToRemove.value = null;
  showRemoveConfirmModal.value = false;
  selectedCard.value = null; 
};
</script>