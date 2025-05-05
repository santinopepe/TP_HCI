<template>
    <div class="flex h-screen font-sans overflow-hidden">
      <div class="flex-1 p-6 overflow-y-auto bg-gray-50">
        <!-- Header -->
        <div class="text-center mb-4">
          <h1 class="text-2xl font-bold">{{ serviceTitle }}</h1>
        </div>  
        <!-- Payment Details -->
        <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          <div class="flex flex-col items-center space-y-4">
            <div class="w-20 h-20 bg-[#7E9E66] rounded-full flex items-center justify-center">
              <img :src="`/images/${serviceImage}`" :alt="serviceTitle" class="w-12 h-12" />
            </div>
            <p class="text-lg font-medium">Monto a pagar:</p>
            <p class="text-3xl font-bold text-green-600">$450.00</p>
            <!-- Input para el número de cliente -->
            <div class="w-full">
              <label for="customerNumber" class="block text-sm font-medium text-gray-700 mb-2">Número de Cliente</label>
              <input
                id="customerNumber"
                v-model="customerNumber"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                placeholder="Ingrese su número de cliente"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                @input="validateCustomerNumber"
              />
              <!-- Mensaje de error -->
              <p v-if="errorMessage" class="text-sm text-red-500 mt-2">{{ errorMessage }}</p>
            </div>
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
    data() {
      return {
        customerNumber: '', // Campo para almacenar el número de cliente
        errorMessage: '', // Mensaje de error dinámico
      };
    },
    computed: {
      serviceTitle() {
        return `Pago de ${this.serviceName}`;
      },
    },
    methods: {
      validateCustomerNumber() {
        // Elimina cualquier carácter no numérico y actualiza el valor
        this.customerNumber = this.customerNumber.replace(/\D/g, '');
      },
      confirmPayment() {
        if (!this.customerNumber) {
          this.errorMessage = 'Por favor, ingrese su número de cliente.';
          return;
        }
        this.errorMessage = ''; // Limpia el mensaje de error si el campo es válido
        this.$router.push('/pagoServicios');
      },
    },
  };
  </script>