<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />

    <main class="flex-1 p-6 bg-[#FAFAFA] overflow-y-auto flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md" style="min-height: 500px;">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-simsim-green-dark">Perfil</h1>
          <p class="text-sm text-simsim-green-dark font-semibold">CVU: {{ user.cvu }}</p>
        </header>
        <div class="flex items-center mb-8">
          <div class="relative">
            <img src="https://via.placeholder.com/80" alt="Profile Picture" class="w-20 h-20 rounded-full border-2 border-simsim-green-dark">
            <span class="absolute bottom-0 right-0 bg-simsim-green-darker text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">✎</span>
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold text-simsim-green-dark">{{ user.name }}</h2>
          </div>
        </div>
        <div class="space-y-4">
          <p class="text-gray-700"><span class="font-semibold text-simsim-green-dark">N° de Documento:</span> {{ user.accountNumber }}</p>
          <p class="text-gray-700"><span class="font-semibold text-simsim-green-dark">Email:</span> {{ user.email }}</p>
          <p class="text-gray-700"><span class="font-semibold text-simsim-green-dark">Número teléfono:</span> {{ user.phone }}</p>
          <p class="text-gray-700"><span class="font-semibold text-simsim-green-dark">Alias:</span> {{ user.alias }}</p>
          <p class="text-gray-700"><span class="font-semibold text-simsim-green-dark">Género:</span> {{ user.gender }}</p>
        </div>
        <div class="flex justify-center mt-8">
          <button class="bg-simsim-green-dark text-white py-2 px-6 rounded-lg hover:bg-simsim-green-darker transition duration-200">
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BarraLateral from './BarraLateral.vue';

export default {
  name: 'Perfil',
  components: {
    BarraLateral,
  },
  data() {
    return {
      activeButton: 'perfil',
      user: {
        cvu: '0023481928201930457639',
        name: 'Juliana Márquez',
        accountNumber: '44.887.744',
        email: 'jmarquez01@gmail.com',
        phone: '+54 9 11 5325-6201',
        alias: 'jmarquez01',
        gender: 'Mujer',
      },
    };
  },
  methods: {
    setActiveButton(button) {
      this.activeButton = button;
    },
  },
};
</script>