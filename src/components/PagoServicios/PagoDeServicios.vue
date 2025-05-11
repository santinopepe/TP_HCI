<template>
    <div class="flex h-screen font-sans overflow-hidden">
      <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />
      <div class="flex-1 p-6 overflow-y-auto">
        <!-- Header -->
        <h1 class="text-2xl font-bold mb-4">Pago de servicios</h1>
  
        <!-- Search Bar -->
        <div class="relative mb-6">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar"
            class="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span class="absolute inset-y-0 left-3 flex items-center">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
  
        <!-- Service Categories (Centered Horizontal Bar) -->
        <div class="flex justify-center mb-6">
          <div class="inline-flex space-x-4 overflow-x-auto bg-white rounded-lg shadow h-20 items-center px-4">
            <button
              v-for="service in services"
              :key="service.name"
              @click="goToPayment(service.name, service.image)"
              class="flex flex-col items-center justify-center w-20"
            >
              <div class="w-12 h-12 bg-[#7E9E66] rounded-full flex items-center justify-center hover:bg-[#7E9E66]/50">
                <img :src="`/images/${service.image}`" :alt="service.name" class="w-8 h-8" />
              </div>
              <span class="mt-1 text-xs text-center">{{ service.name }}</span>
            </button>
          </div>
        </div>
  
        <!-- Recent Payments -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Últimos Pagos de Servicios</h2>
        </div>
  
        <!-- Payment List (Single Block) -->
        <div class="bg-white rounded-lg shadow">
          <div
            v-for="(payment, index) in filteredPayments"
            :key="payment.id"
            class="flex items-center p-4"
            :class="{ 'border-b border-gray-200': index !== filteredPayments.length - 1 }"
          >
            <div class="w-10 h-10 flex items-center justify-center mr-4">
              <img :src="`/images/${payment.image}`" :alt="payment.name" class="w-8 h-8" />
            </div>
            <div class="flex-1">
              <p class="font-medium">{{ payment.name }}</p>
              <p class="text-sm text-gray-500">{{ payment.date }}</p>
            </div>
            <p class="text-red-500 font-medium">{{ payment.amount }}.00</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BarraLateral from './BarraLateral.vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: "PagoDeServicios",
    components: {
      BarraLateral,
    },
    setup() {
      const router = useRouter();
  
      const goToPayment = (serviceName, serviceImage) => {
        router.push({
          name: 'PagoServicio',
          params: { serviceName, serviceImage },
        });
      };
  
      return { goToPayment };
    },
    data() {
      return {
        activeButton: 'pagoServicios',
        searchQuery: '',
        services: [
          { name: 'WiFi', image: 'wifi.png' },
          { name: 'Luz', image: 'electricidad.png' },
          { name: 'Gas', image: 'gas.png' },
          { name: 'Transporte', image: 'transporte.png' },
          { name: 'Televisión', image: 'television.png' },
          { name: 'Teléfono', image: 'lineaTelefonica.png' },
        ],
        payments: [
          { id: 1, name: 'Pago de SUBE', image: 'sube.png', amount: '-230', date: '20 Mar 2025' },
          { id: 2, name: 'Pago de Agua', image: 'aysa.png', amount: '-866', date: '18 Mar 2025' },
          { id: 3, name: 'Pago de la Línea Móvil', image: 'movistar.png', amount: '-453', date: '1 Mar 2025' },
          { id: 4, name: 'Pago de CABLE', image: 'flow.png', amount: '-230', date: '27 Feb 2025' },
          { id: 5, name: 'Pago de LUZ', image: 'edesur.png', amount: '-866', date: '20 Feb 2025' },
        ],
      };
    },
    computed: {
      filteredPayments() {
        if (!this.searchQuery) return this.payments;
        return this.payments.filter(payment =>
          payment.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
  };
  </script>