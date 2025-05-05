<template>
    <div class="flex h-screen font-sans overflow-hidden">
      <div class="flex-1 p-6 overflow-y-auto bg-gray-50">
        <!-- Header -->
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold">{{ serviceTitle }}</h1>
        </div>  
        <!-- Payment Details -->
        <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          <div class="flex flex-col items-center space-y-6">
            <div class="w-20 h-20 bg-[#7E9E66] rounded-full flex items-center justify-center">
              <img :src="`/images/${serviceImage}`" :alt="serviceTitle" class="w-12 h-12" />
            </div>
            <p class="text-lg font-medium">Monto a pagar:</p>
            <p class="text-3xl font-bold text-green-600">$450.00</p>
            <button
              class="w-full bg-[#5D8C39] text-white py-2 rounded-lg hover:bg-[#5D8C39]/80 transition-colors"
              @click="confirmPayment"
            >
              Confirmar Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PagoServicio",
    props: {
      serviceName: {
        type: String,
        required: true,
      },
      serviceImage: {
        type: String,
        required: true,
      },
    },
    computed: {
      serviceTitle() {
        return `Pago de ${this.serviceName}`;
      },
    },
    methods: {
      confirmPayment() {
        this.$router.push('/pagoServicios');
      },
    },
  };
  </script>