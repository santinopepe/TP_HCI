import { defineStore } from 'pinia';

export const useLinkDePagoStore = defineStore('linkDePago', {
  state: () => ({
    paymentLink: '',
    metodo: 'tarjeta', // Default payment method
    tarjetas: [
      { nombre: 'Visa **** 1234', numero: '**** **** **** 1234' },
      { nombre: 'Mastercard **** 5678', numero: '**** **** **** 5678' },
      { nombre: 'Amex **** 9012', numero: '**** **** **** 9012' },
    ],
    tarjetaSeleccionada: 0,
    accountBalance: 1500.00,
    amount: 100.00,
    cargo: 5.00, // Example service fee
    total: 105.00, // amount + cargo
    serviceName: 'Servicio de Electricidad', // New field for service name
    serviceId: '12345', // New field for service ID
    errors: {
      paymentLink: null,
    },
  }),

  getters: {
    selectedCard: (state) => state.tarjetas[state.tarjetaSeleccionada],
  },
  actions: {
    setPaymentLink(link) {
      this.paymentLink = link;
      if (!link || !link.startsWith('https://')) {
        this.errors.paymentLink = 'Por favor, ingrese un link de pago válido';
      } else {
        this.errors.paymentLink = null;
      }
    },

    setPaymentMethod(method) {
      this.metodo = method;
    },

    rotateCard(direction) {
      if (direction === 'siguiente') {
        this.tarjetaSeleccionada = (this.tarjetaSeleccionada + 1) % this.tarjetas.length;
      } else if (direction === 'anterior') {
        this.tarjetaSeleccionada = (this.tarjetaSeleccionada - 1 + this.tarjetas.length) % this.tarjetas.length;
      }
    },

    confirmPayment() {
      this.total = this.amount + this.cargo;
    },

    resetPayment() {
      this.paymentLink = '';
      this.metodo = 'tarjeta';
      this.tarjetaSeleccionada = 0;
      this.errors.paymentLink = null;
      this.amount = 0;
      this.cargo = 0;
      this.total = 0;
      this.serviceName = '';
      this.serviceId = '';
    },

    setServiceDetails({ serviceName, serviceId, amount, cargo }) {
      this.serviceName = serviceName;
      this.serviceId = serviceId;
      this.amount = amount;
      this.cargo = cargo;
      this.total = amount + cargo;
    },
  },
});