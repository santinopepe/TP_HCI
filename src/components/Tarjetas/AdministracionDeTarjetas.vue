<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />

    <main class="flex-1 p-5 bg-gray-100 overflow-y-auto">
      <div class="mb-4">
        <h1 class="text-3xl font-bold text-gray-800">Mis Tarjetas</h1>
      </div>

      <div class="flex justify-center">
        <div class="bg-white p-4 rounded-lg shadow-lg w-full max-w-7xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-700">
              Tarjetas Vinculadas
            </h2>
            <button
              @click="showAddCardForm = true"
              class="bg-[#5D8C39] text-white hover:bg-[#5D8C39]/80 font-semibold py-2 px-4 rounded-lg shadow transition duration-200 flex items-center"
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
              Añadir Tarjeta
            </button>
          </div>

          <div
            v-if="cardStore.cards.length === 0"
            class="text-center text-gray-500 py-8 mb-4"
          >
            Aún no tienes tarjetas vinculadas.
          </div>

          <div class="flex flex-row gap-4 overflow-x-auto pb-4">
            <div
              v-for="(card, index) in cardStore.cards"
              :key="card.id"
              @click="viewCardDetails(card)"
              @mouseenter="handleMouseEnter(index)"
              @mouseleave="handleMouseLeave"
              class="text-white p-6 rounded-lg shadow cursor-pointer transform transition-all duration-300 hover:scale-105 relative flex-shrink-0 w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%]"
              :class="getCardBackground(card.type)"
              :style="{ zIndex: calculatedZIndex(index) }"
            >
              <div class="flex flex-col h-full">
                <div class="flex-1">
                  <p class="text-lg font-semibold truncate">
                    {{ card.type }} **** **** **** {{ card.number.slice(-4) }}
                  </p>
                  <p class="text-sm opacity-80 mt-2 truncate">
                    Titular: {{ card.fullName }}
                  </p>
                  <p class="text-sm opacity-80 truncate">
                    Expira: {{ card.expirationDate }}
                  </p>
                  <p class="text-sm opacity-80 mt-2">
                    Tipo: {{ getCardBrand(card.number) }}
                  </p>
                </div>
                <div class="mt-auto flex justify-end">
                  <img
                    :src="getCardLogo(card.number)"
                    alt="Card Logo"
                    class="h-8 w-12 object-contain"
                  />
                </div>
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
        <div
          v-if="showCardDetailModal && selectedCard"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <div
            class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative"
          >
            <button
              @click="closeCardDetailModal"
              class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">
              Detalles de Tarjeta
            </h2>
            <div
              class="text-white p-4 rounded-lg shadow mb-6"
              :class="getCardBackground(selectedCard.type)"
            >
              <div class="flex items-center mb-2">
                <img
                  :src="getCardLogo(selectedCard.number)"
                  alt="Card Logo"
                  class="h-8 w-12 mr-2 object-contain"
                />
                <p class="text-xl font-semibold mb-2">
                  {{ selectedCard.type }} **** **** {{ selectedCard.number.slice(-4) }}
                </p>
              </div>
              <p class="text-sm opacity-80 mt-2">
                Titular: {{ selectedCard.fullName }}
              </p>
              <p class="text-sm opacity-80">
                Expira: {{ selectedCard.expirationDate }}
              </p>
              <p class="text-sm opacity-80 mt-2">
                Tipo: {{ getCardBrand(selectedCard.number) }}
              </p>
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
        <div
          v-if="showRemoveConfirmModal"
          class="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4"
        >
          <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full m-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Confirmar Desvinculación
            </h3>
            <p class="text-gray-600 mb-6">
              ¿Estás seguro de que quieres desvincular esta tarjeta?
            </p>
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
import { ref, onMounted } from "vue";
import BarraLateral from "../BarraLateral.vue";
import AddCardForm from "./AgregarTarjeta.vue";
import { useCardStore } from "../store/TarjetasStore.js";

const cardStore = useCardStore();


onMounted(async () => {
  try {
    await cardStore.getAll();
  } catch (error) {
    console.error("Error al cargar tarjetas desde la API:", error);
  }
});

const activeButton = ref("tarjetas");

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
    return cardStore.cards.length + 1;
  }
  return cardStore.cards.length - index;
};

const getCardBrand = (number) => {
  if (!number) return "Otro";
  const sanitized = number.replace(/[\s-]/g, "");

  if (/^4\d{12}(\d{3})?(\d{3})?$/.test(sanitized)) {
    return "Visa";
  }

  if (/^(5[1-5]\d{14}|2(2[2-9][1-9]|2[3-9]\d|[3-6]\d\d|7[01]\d|720)\d{12})$/.test(sanitized)) {
    return "Mastercard";
  }

  if (/^3[47]\d{13}$/.test(sanitized)) {
    return "American Express";
  }

  if (/^(6011\d{12}|65\d{14}|64[4-9]\d{13}|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5])\d{10})$/.test(sanitized)) {
    return "Discover";
  }

  return "Otro";
};


const getCardLogo = (number) => {
  if (!number) return "https://upload.wikimedia.org/wikipedia/commons/3/39/Generic_Credit_Card_Icon.png";
  const brand = getCardBrand(number);
  switch (brand.toLowerCase()) {
    case "visa":
      return "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png";
    case "mastercard":
      return "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png";
    case "american express":
      return "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg";
    case "discover":
      return "https://upload.wikimedia.org/wikipedia/commons/5/53/Discover_Card_logo.svg";
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/3/39/Generic_Credit_Card_Icon.png";
  }
};

const getCardBackground = (type) => {
  switch (type.toLowerCase()) {
    case "visa":
      return "bg-gradient-to-br from-blue-600 to-gray-300";
    case "mastercard":
      return "bg-gradient-to-br from-red-500 to-yellow-400";
    case "american express":
      return "bg-gradient-to-br from-blue-500 to-green-400";
    default:
      return "bg-gradient-to-br from-orange-500 to-gray-500";
  }
};

const handleAddCard = async (card) => {
  try {
    await cardStore.add(card);
    showAddCardForm.value = false;
  } catch (error) {
    console.error("Error al agregar tarjeta:", error);
  }
};

const viewCardDetails = (card) => {
  selectedCard.value = card;
  showCardDetailModal.value = true;
};

const closeCardDetailModal = () => {
  showCardDetailModal.value = false;
  selectedCard.value = null; // Limpiar la tarjeta seleccionada al cerrar el modal
};

const requestRemoveCard = (cardId) => {
  cardIdToRemove.value = cardId;
  showCardDetailModal.value = false;
  showRemoveConfirmModal.value = true;
};

const confirmRemoveCard = async () => {
  if (cardIdToRemove.value !== null) {
    try {
      await cardStore.remove(cardIdToRemove.value);
    } catch (error) {
      console.error("Error al desvincular tarjeta:", error);
    }
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

<style scoped>
/* Puedes añadir tus estilos aquí si es necesario */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
