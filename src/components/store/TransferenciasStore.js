import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTransferenciaStore = defineStore("transferencia", () => {
  const contacts = ref([
    {
      id: 2,
      nombre: "María García",
      cbu: "0009876543210987654321",
      avatar: "/images/mujer.png",
    },
    {
      id: 3,
      nombre: "Carlos Ruiz",
      cbu: "0001122334455667788990",
      avatar: "/images/fotoHombre.png",
    },
  ]);
  const searchQuery = ref("");
  const selectedContact = ref(null);

  const paymentMethod = ref("tarjeta");
  const amount = ref("");
  const amountError = ref(false);
  const selectedCardIndex = ref(0);
  const transactionCargo = ref(1.0);
  const accountBalance = ref(100000.0);

  const receiptDetails = ref({
    destinatario: "",
    monto: 0,
    metodo: "",
    fecha: "",
    orden: "",
  });

  const filteredContacts = computed(() => {
    if (!searchQuery.value) {
      return contacts.value;
    }
    const lowerQuery = searchQuery.value.toLowerCase();
    return contacts.value.filter((contact) =>
      contact.nombre.toLowerCase().includes(lowerQuery)
    );
  });

  const totalAmount = computed(() => {
    const parsedAmount = parseFloat(amount.value);
    return isNaN(parsedAmount) ? 0 : parsedAmount + transactionCargo.value;
  });

  const currentCard = computed(() => cardStore.cards[selectedCardIndex.value]);

  const formattedCurrentDate = computed(() => {
    const fecha = new Date();
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
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
    const newId = Math.max(...contacts.value.map((c) => c.id), 0) + 1;
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


  function confirmTransfer() {
    receiptDetails.value = {
      destinatario: selectedContact.value?.nombre || "Desconocido",
      monto: parseFloat(amount.value),
      metodo: paymentMethod.value,
      fecha: formattedCurrentDate.value,
      orden: generatedOrderId.value,
    };
    resetTransferForm();
  }

  function resetTransferForm() {
    amount.value = "";
    amountError.value = false;
  }

  function resetTransferenciaFlow() {
    searchQuery.value = "";
    selectedContact.value = null;
    resetTransferForm();
    receiptDetails.value = {
      destinatario: "",
      monto: 0,
      metodo: "",
      fecha: "",
      orden: "",
    };
  }

  return {
    contacts,
    searchQuery,
    selectedContact,
    paymentMethod,
    amount,
    amountError,
    selectedCardIndex,
    transactionCargo,
    accountBalance,
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
    confirmTransfer,
    resetTransferForm,
    resetTransferenciaFlow,
  };
});
