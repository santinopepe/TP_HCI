<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />
    <div class="p-8 bg-gray-50 min-h-screen flex-1 overflow-y-auto">
      <!-- Encabezado -->
      <div class="max-w-2xl mx-auto text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Elegí un contacto</h1>
        <p class="text-gray-500 text-lg">
          Seleccioná un contacto reciente para transferirle dinero.
        </p>
      </div>

      <!-- Barra de búsqueda -->
      <div class="max-w-md mx-auto mb-6">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar contacto..."
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Lista de contactos -->
      <div class="max-w-md mx-auto">
        <ul class="space-y-4">
          <li
            v-for="contacto in contactosFiltrados"
            :key="contacto.id"
            @click="seleccionarContacto(contacto)"
            class="bg-white p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer flex items-center gap-4"
          >
            <img :src="contacto.avatar" class="w-10 h-10 rounded-full" />
            <div>
              <p class="font-semibold">{{ contacto.nombre }}</p>
              <p class="text-sm text-gray-500">CBU/CVU: {{ contacto.cbu }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Botón para transferir a un nuevo contacto -->
      <div class="max-w-md mx-auto mt-6 text-center">
        <router-link
          to="/transferirNuevoContacto"
          class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
        >
          Nuevo contacto
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BarraLateral from './../BarraLateral.vue';
import { contactStore } from '../tienda.js'; // Adjust path as needed

export default {
  components: {
    BarraLateral,
  },
  data() {
    return {
      activeButton: 'transferir',
      busqueda: '',
    };
  },
  computed: {
    contactosFiltrados() {
      return contactStore.contactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    },
  },
  methods: {
    seleccionarContacto(contacto) {
      this.$router.push({
        name: 'TransferenciaFormulario',
        params: { contactoNombre: encodeURIComponent(contacto.nombre) },
      });
    },
    mostrarFormularioNuevoContacto() {
      this.$router.push('/transferirNuevoContacto');
    },
    agregarNuevoContacto(nuevoContacto) {
      contactStore.addContacto(nuevoContacto);
      this.$router.push('/transferir');
    },
  },
};
</script>