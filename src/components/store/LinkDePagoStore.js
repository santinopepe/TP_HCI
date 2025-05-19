import { defineStore } from 'pinia';

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    paymentDetails: {
      link: '',
      metodo: '',
      card: null,
      amount: 2500.00, // Hardcoded amount
    },
  }),
  actions: {
    setPaymentDetails(details) {
      this.paymentDetails = { ...this.paymentDetails, ...details };
    },
    resetPaymentDetails() {
      this.paymentDetails = {
        link: '',
        metodo: '',
        card: null,
        amount: 2500.00,
      };
    },
  },
});