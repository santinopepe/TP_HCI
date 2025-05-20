import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardsStore = defineStore('cards', () => {
  // Estado inicial de las tarjetas
  const cards = ref([
    { id: 1, type: 'Visa', last4: '1234', name: 'Juan Perez', expiry: '12/25', bank: 'Mi Banco Principal' },
    { id: 2, type: 'Mastercard', last4: '5678', name: 'Juan Perez', expiry: '08/24', bank: 'Otro Banco' },
    { id: 3, type: 'American Express', last4: '9012', name: 'Juan Perez', expiry: '06/26', bank: 'Banco del Sur' },
  ]);

  // Acciones
  const addCard = (newCard) => {
    // Genera un ID simple para la nueva tarjeta
    const newId = cards.value.length > 0 ? Math.max(...cards.value.map(c => c.id)) + 1 : 1;
    cards.value.unshift({ ...newCard, id: newId });
  };

  const removeCard = (cardId) => {
    cards.value = cards.value.filter(card => card.id !== cardId);
  };

  return {
    cards,
    addCard,
    removeCard,
  };
});