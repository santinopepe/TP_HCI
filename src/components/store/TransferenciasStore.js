import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTransferenciaStore = defineStore('transferencia', () => {
  const contacts = ref([
    { id: 2, nombre: 'María García', cbu: '0009876543210987654321', avatar: '/images/mujer.png' },
    { id: 3, nombre: 'Carlos Ruiz', cbu: '0001122334455667788990', avatar: '/images/fotoHombre.png' },
  ]);
  const searchQuery = ref('');
  const selectedContact = ref(null);


  const paymentMethod = ref('tarjeta');
  const amount = ref('');
  const amountError = ref(false);
  const cards = ref([
    { nombre: 'Tarjeta de Juliana Márquez', numero: '•••• •••• •••• 9987' },
    { nombre: 'Tarjeta de Juliana Márquez', numero: '•••• •••• •••• 1234' },
    { nombre: 'Tarjeta de Juliana Márquez', numero: '•••• •••• •••• 5678' },
  ]);
  const selectedCardIndex = ref(0);
  const transactionCargo = ref(1.00); 
  const showConfirmationPopup = ref(false);

  const receiptDetails = ref({
    destinatario: '',
    monto: 0,
    metodo: '',
    fecha: '',
    orden: '',
  });


  const filteredContacts = computed(() => {
    if (!searchQuery.value) {
      return contacts.value;
    }
    const lowerQuery = searchQuery.value.toLowerCase();
    return contacts.value.filter(contact =>
      contact.nombre.toLowerCase().includes(lowerQuery)
    );
  });

  const totalAmount = computed(() => {
    const parsedAmount = parseFloat(amount.value);
    return isNaN(parsedAmount) ? 0 : parsedAmount + transactionCargo.value;
  });

  const currentCard = computed(() => cards.value[selectedCardIndex.value]);

  const formattedCurrentDate = computed(() => {
    const fecha = new Date();
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  const generatedOrderId = computed(() => {
    return Math.floor(Math.random() * 1000000000).toString();
  });


  function setSearchQuery(query) {
    searchQuery.value = query;
  }

  function selectContact(contact) {
    selectedContact.value = contact;
  }

  function addContact(newContact) {
    const newId = Math.max(...contacts.value.map(c => c.id), 0) + 1;
    contacts.value.push({ ...newContact, id: newId });
  }

  function setPaymentMethod(method) {
    paymentMethod.value = method;
  }

  function setAmount(value) {
    amount.value = value;
  }

  function setAmountError(hasError) {
    amountError.value = hasError;
  }

  function rotateCard(direction) {
    if (direction === 'anterior') {
      selectedCardIndex.value =
        (selectedCardIndex.value - 1 + cards.value.length) % cards.value.length;
    } else if (direction === 'siguiente') {
      selectedCardIndex.value = (selectedCardIndex.value + 1) % cards.value.length;
    }
  }

  function toggleConfirmationPopup(show) {
    showConfirmationPopup.value = show;
  }

  function confirmTransfer() {
    receiptDetails.value = {
      destinatario: selectedContact.value?.nombre || 'Desconocido',
      monto: parseFloat(amount.value),
      metodo: paymentMethod.value,
      fecha: formattedCurrentDate.value,
      orden: generatedOrderId.value,
    };
    resetTransferForm();
  }

  function resetTransferForm() {
    amount.value = '';
    amountError.value = false;
    showConfirmationPopup.value = false;
  
  }

  function setReceiptDetailsFromRoute(params, query) {
    receiptDetails.value.destinatario = decodeURIComponent(params.destinatario || '');
    receiptDetails.value.monto = Number(query.monto) || 0;
    receiptDetails.value.metodo = query.metodo || '';
    receiptDetails.value.fecha = query.fecha || '';
    receiptDetails.value.orden = query.orden || '';
  }

  function resetTransferenciaFlow() {
    searchQuery.value = '';
    selectedContact.value = null;
    resetTransferForm();
    receiptDetails.value = {
      destinatario: '',
      monto: 0,
      metodo: '',
      fecha: '',
      orden: '',
    };
  }


  return {
    contacts,
    searchQuery,
    selectedContact,
    paymentMethod,
    amount,
    amountError,
    cards,
    selectedCardIndex,
    transactionCargo,
    showConfirmationPopup,
    receiptDetails,

    filteredContacts,
    totalAmount,
    currentCard,
    formattedCurrentDate,
    generatedOrderId,

    
    setSearchQuery,
    selectContact,
    addContact,
    setPaymentMethod,
    setAmount,
    setAmountError,
    rotateCard,
    toggleConfirmationPopup,
    confirmTransfer,
    resetTransferForm,
    setReceiptDetailsFromRoute,
    resetTransferenciaFlow,
  };
});