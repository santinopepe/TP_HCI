import { defineStore } from "pinia";

export const useLinkDePagoStore = defineStore("linkDePago", {
  state: () => ({
    paymentLink: "",
    metodo: "tarjeta", // Default payment method
    tarjetaSeleccionada: 0,
    accountBalance: 1500.0,
    amount: 100.0,
    cargo: 5.0,
    total: 105.0,
    serviceName: "",
    serviceId: "",
    errors: {
      paymentLink: null,
    },
  }),
  actions: {
    setPaymentLink(link) {
      console.log("Setting payment link:", link);
      this.paymentLink = link;
      if (!link || !link.startsWith("https://")) {
        this.errors.paymentLink = "Por favor, ingrese un link de pago válido";
      } else {
        this.errors.paymentLink = null;
      }
    },

    setPaymentMethod(method) {
      console.log("Setting payment method:", method);
      this.metodo = method;
    },

    confirmPayment() {
      this.total = this.amount + this.cargo;
    },

    resetPayment() {
      this.paymentLink = "";
      this.metodo = "tarjeta";
      this.tarjetaSeleccionada = 0;
      this.errors.paymentLink = null;
      this.amount = 0;
      this.cargo = 0;
      this.total = 0;
      this.serviceName = "";
      this.serviceId = "";
    },

    setServiceDetails(details) {
      console.log("Setting service details:", details);
      this.serviceName = details.serviceName;
      this.serviceId = details.serviceId;
      this.amount = details.amount;
      this.cargo = details.cargo;
      this.total = details.amount + details.cargo;
    },
  },
});
