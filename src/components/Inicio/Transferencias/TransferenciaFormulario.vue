<template>
  <div>
    <!-- Mostrar el formulario o el comprobante según el estado -->
    <div v-if="!mostrarComprobante" class="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
      <!-- Volver -->
      <button @click="$emit('volver')" class="text-sm text-gray-500 mb-4 hover:underline">
        ← Volver a contactos
      </button>

      <!-- Datos del contacto -->
      <div class="flex items-center gap-4 mb-6">
        <img :src="contacto.avatar" alt="Avatar" class="w-12 h-12 rounded-full" />
        <div>
          <p class="text-lg font-semibold">{{ contacto.nombre }}</p>
          <p class="text-sm text-gray-500">CBU/CVU: {{ contacto.cbu }}</p>
        </div>
      </div>

      <!-- Método de pago -->
      <div class="mb-4">
        <p class="text-sm font-medium mb-2">Seleccionar método de pago</p>
        <div class="flex gap-2">
          <button
            @click="setMetodo('tarjeta')"
            :class="metodo === 'tarjeta' ? activo : inactivo"
          >
            💳 Tarjeta
          </button>
          <button
            @click="setMetodo('cuenta')"
            :class="metodo === 'cuenta' ? activo : inactivo"
          >
            💰 Dinero en Cuenta
          </button>
        </div>
      </div>

      <!-- Tarjeta -->
      <div v-if="metodo === 'tarjeta'" class="mb-6">
        <div class="bg-gradient-to-r from-green-300 to-pink-300 p-4 rounded-xl text-white shadow">
          <p class="text-sm">Tarjeta de Juliana Márquez</p>
          <p class="text-xl font-bold tracking-widest mt-2">•••• •••• •••• 9987</p>
        </div>
      </div>

      <!-- Dinero en cuenta -->
      <div v-if="metodo === 'cuenta'" class="mb-6">
        <div class="bg-gradient-to-r from-blue-300 to-blue-500 p-4 rounded-xl text-white shadow">
          <p class="text-sm">Dinero disponible en cuenta</p>
          <p class="text-xl font-bold tracking-widest mt-2">$100,000</p>
        </div>
      </div>

      <!-- Monto -->
      <div class="mb-6">
        <label for="monto" class="block text-sm font-medium mb-1">Monto</label>
        <input
          v-model="monto"
          id="monto"
          type="text"
          placeholder="100,000"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <!-- Botones -->
      <div class="flex justify-between">
        <button @click="$emit('volver')" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
          Cancelar
        </button>
        <button
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          @click="mostrarPopup = true"
        >
          Transferir
        </button>
      </div>

      <!-- Popup de confirmación -->
      <ConfirmacionPopup
        v-if="mostrarPopup"
        :monto="monto"
        :contacto="contacto"
        @cancelar="mostrarPopup = false"
        @confirmar="mostrarComprobante = true"
      />
    </div>

    <!-- Comprobante de transferencia -->
    <ComprobanteTransferencia
      v-else
      :fecha="fechaActual"
      :orden="ordenGenerada"
      :metodo="metodo"
      :destinatario="contacto.nombre"
      :monto="parseFloat(monto)"
      :cargo="cargo"
      @volver="reiniciarFormulario"
    />
  </div>
</template>

<script>
import ConfirmacionPopup from './ConfirmacionPopup.vue';
import ComprobanteTransferencia from './ComprobanteTransferencia.vue';

export default {
  components: {
    ConfirmacionPopup,
    ComprobanteTransferencia,
  },
  props: {
    contacto: Object,
  },
  data() {
    return {
      metodo: 'tarjeta',
      monto: '',
      mostrarPopup: false,
      mostrarComprobante: false,
      activo: 'bg-white border border-gray-400 px-4 py-2 rounded-lg shadow',
      inactivo: 'bg-gray-100 text-gray-500 px-4 py-2 rounded-lg',
      cargo: 1.5, // Cargo fijo por transferencia
    };
  },
  computed: {
    fechaActual() {
      const fecha = new Date();
      return fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
    ordenGenerada() {
      return Math.floor(Math.random() * 1000000000).toString(); // Generar un número de orden aleatorio
    },
  },
  methods: {
    setMetodo(metodo) {
      this.metodo = metodo;
    },
    reiniciarFormulario() {
      this.mostrarComprobante = false;
      this.monto = '';
      this.metodo = 'tarjeta';
      this.mostrarPopup = false;
    },
  },
};
</script>