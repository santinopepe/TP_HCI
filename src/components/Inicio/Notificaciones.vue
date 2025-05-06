<template>
    <div class="flex h-screen font-sans overflow-hidden">
      <!-- Barra lateral -->
      <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />
  
      <!-- Contenido principal -->
      <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">Notificaciones</h1>
        </div>
  
        <!-- Lista de notificaciones -->
        <div class="space-y-4">
          <div
            v-for="(notification, index) in notifications"
            :key="index"
            class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <p class="text-lg font-semibold text-gray-800">{{ notification.title }}</p>
              <p class="text-sm text-gray-600">{{ notification.message }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ notification.date }}</p>
            </div>
            <div>
              <span
                class="text-sm font-semibold px-3 py-1 rounded-full"
                :class="notification.type === 'transfer' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'"
              >
                {{ notification.type === 'transfer' ? 'Transferencia' : 'Pago' }}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import BarraLateral from './BarraLateral.vue';
  
  export default {
    name: 'Notificaciones',
    components: {
      BarraLateral,
    },
    data() {
      return {
        activeButton: 'notificaciones',
        notifications: [
          {
            title: 'Pago de Luz',
            message: 'Se realizó el pago del servicio de luz por $1,200.00.',
            date: '06 May 2025 - 10:30 AM',
            type: 'payment',
          },
          {
            title: 'Transferencia Recibida',
            message: 'Recibiste una transferencia de $5,000.00 de Juan Pérez.',
            date: '05 May 2025 - 3:45 PM',
            type: 'transfer',
          },
          {
            title: 'Pago de Internet',
            message: 'Se realizó el pago del servicio de internet por $800.00.',
            date: '04 May 2025 - 9:15 AM',
            type: 'payment',
          },
          {
            title: 'Transferencia Recibida',
            message: 'Recibiste una transferencia de $2,500.00 de María López.',
            date: '03 May 2025 - 1:20 PM',
            type: 'transfer',
          },
          {
            title: 'Pago de Gas',
            message: 'Se realizó el pago del servicio de gas por $600.00.',
            date: '02 May 2025 - 11:00 AM',
            type: 'payment',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para las notificaciones */
  </style>