<template>
    <div class="flex h-screen font-sans overflow-hidden">
      <!-- Barra lateral -->
      <BarraLateral :active-button="metodo" @update:activeButton="setMetodo" />
  
      <!-- Contenido principal -->
      <div class="p-8 bg-gray-50 min-h-screen flex-1">
        <div class="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
          <div class="flex items-center gap-4 mb-6">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Avatar"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <p class="text-lg font-semibold">Julio Hernández</p>
              <p class="text-sm text-gray-500">CBU/CVU: 00000465291004589312</p>
            </div>
          </div>
  
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
  
          <div v-if="metodo === 'tarjeta'" class="mb-6">
            <div class="bg-gradient-to-r from-green-300 to-pink-300 p-4 rounded-xl text-white shadow">
              <p class="text-sm">Tarjeta de Juliana Márquez</p>
              <p class="text-xl font-bold tracking-widest mt-2">•••• •••• •••• 9987</p>
            </div>
          </div>
  
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
  
          <div class="flex justify-between">
            <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
              Cancelar
            </button>
            <button
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              @click="transferir"
            >
              Transferir
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BarraLateral from './BarraLateral.vue';

  export default {
  name: "Transferencias",
  components: {
    BarraLateral,
  },
  data() {
    return {
      metodo: 'tarjeta',
      monto: '',
      activo: 'bg-white border border-gray-400 px-4 py-2 rounded-lg shadow',
      inactivo: 'bg-gray-100 text-gray-500 px-4 py-2 rounded-lg',
    };
  },
  methods: {
    transferir() {
      alert(`Transferencia de $${this.monto} usando ${this.metodo}`);
    },
    setMetodo(metodo) {
      this.metodo = metodo;
    },
  },
};
  </script>
  