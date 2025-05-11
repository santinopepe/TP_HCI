<template>
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 font-sans">
      <div class="bg-white max-w-sm w-full rounded-3xl p-6 shadow-md text-center relative">
       
  
        <!-- Logo -->
        <img src="/images/logo.png" alt="Logo" class="w-20 mx-auto mb-4" />
  
        <!-- Título -->
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Comprobante De Pago</h2>
  
        <!-- Datos -->
        <div class="text-left text-sm text-gray-700 space-y-2 border-t border-dashed border-gray-300 pt-4">
          <div class="flex justify-between">
            <span>Fecha:</span>
            <span>{{ fecha }}</span>
          </div>
          <div class="flex justify-between">
            <span>Número de orden:</span>
            <span class="font-medium">#{{ orden }}</span>
          </div>
          <div class="flex justify-between">
            <span>Pagado con:</span>
            <span>{{ metodo }}</span>
          </div>
          <div class="flex justify-between">
            <span>Para:</span>
            <span>{{ destinatario }}</span>
          </div>
          <div class="flex justify-between">
            <span>Total de la transferencia:</span>
            <span>${{ monto.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Cargo:</span>
            <span>${{ cargo.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-green-600 border-t border-dashed pt-2">
            <span>Pago final</span>
            <span>${{ (monto + cargo).toFixed(2) }}</span>
          </div>
        </div>
        
        <!-- Botones -->
        <div class="mt-6 flex-col justify-center gap-4">
          <!-- Botón compartir -->
          <button
            class="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full"
          >
            Compartir comprobante
          </button>
          
          <!-- Botón volver -->
          <button
            @click="volverAlInicio"
            class="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ComprobanteTransferencia',
    props: {
      fecha: { type: String, default: '9 Diciembre 2018' },
      orden: { type: String, default: '54463873456' },
      metodo: { type: String, default: 'Dinero de la cuenta' },
      destinatario: { type: String, default: 'Ramón Díaz' },
      monto: { type: Number, default: 6198 },
      cargo: { type: Number, default: 1 },
    },
    methods: {
        volverAlInicio() {
        this.$router.push({ name: 'Paginaprincipal' }); 
        },
    },
  };
  </script>
  