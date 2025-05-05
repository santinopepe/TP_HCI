<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />

    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Mis Tarjetas</h1>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Tarjetas Vinculadas</h2>

        <div v-if="cards.length === 0" class="text-center text-gray-500 py-8 mb-4">
          Aún no tienes tarjetas vinculadas.
        </div>

        <div class="flex flex-col space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-4">

            <div
              v-for="card in cards"
              :key="card.id"
              @click="viewCardDetails(card)"
              class="bg-gradient-to-br from-[#243219] to-[#558B2F] text-white p-4 rounded-lg shadow cursor-pointer
                     transform transition duration-200 hover:scale-[1.02]"
            >
              <div>
                <p class="text-lg font-semibold">{{ card.type }} **** **** {{ card.last4 }}</p>
                <p class="text-sm opacity-90">{{ card.bank }}</p>
                <p class="text-xs opacity-80 mt-1">Titular: {{ card.name }}</p>
                <p class="text-xs opacity-80">Expira: {{ card.expiry }}</p>
              </div>
            </div>

            <div
              @click="showAddCardForm = true"
              class="border-2 border-dashed border-gray-400 text-gray-500 hover:border-green-600 hover:text-green-700
                     flex items-center justify-center rounded-lg shadow cursor-pointer
                     p-4 min-h-[150px] transition duration-200 hover:scale-[1.02]"
                     :class="{'md:col-span-2 lg:col-span-1': cards.length === 0}"
            >
              <div class="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="mt-2 text-lg font-semibold">Añadir Tarjeta</span>
              </div>
            </div>
        </div>
      </div>

      <transition name="fade">
        <div v-if="showAddCardForm" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative">
             <button @click="cancelAddCard" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
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
          <div v-if="showRemoveConfirmModal" class="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4"> <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full m-4">
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
]);

const showAddCardForm = ref(false);
const newCard = ref({ number: '', name: '', expiry: '', cvv: '', type: '', bank: '' });

const selectedCard = ref(null);
const showCardDetailModal = ref(false);

const showRemoveConfirmModal = ref(false);
const cardIdToRemove = ref(null); // Guarda el ID de la tarjeta a eliminar


const addCard = () => {
  if (!newCard.value.number || !newCard.value.name || !newCard.value.expiry || !newCard.value.cvv || !newCard.value.type || !newCard.value.bank) {
    alert('Por favor, completa todos los campos de la tarjeta.');
    return;
  }
  const last4 = newCard.value.number.slice(-4);
  const newId = Date.now();
  cards.value.push({
    id: newId,
    type: newCard.value.type,
    last4: last4,
    name: newCard.value.name,
    expiry: newCard.value.expiry,
    bank: newCard.value.bank,
  });
  resetNewCardForm();
  showAddCardForm.value = false;
  alert('Tarjeta agregada exitosamente!');
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
};

const requestRemoveCard = (cardId) => {
  cardIdToRemove.value = cardId; 
  showCardDetailModal.value = false; 
  showRemoveConfirmModal.value = true; 
};

const confirmRemoveCard = () => {
  if (cardIdToRemove.value !== null) {
    cards.value = cards.value.filter(card => card.id !== cardIdToRemove.value);
    alert('Tarjeta desvinculada.');
  }
  cardIdToRemove.value = null;
  showRemoveConfirmModal.value = false;
  selectedCard.value = null; // Limpia la tarjeta seleccionada ahora sí
};

const cancelRemoveCard = () => {
  cardIdToRemove.value = null;
  showRemoveConfirmModal.value = false;
   
   selectedCard.value = null; // Limpia la tarjeta seleccionada si se cancela
};

</script>

