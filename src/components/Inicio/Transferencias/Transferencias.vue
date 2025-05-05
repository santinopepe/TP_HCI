<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <!-- Barra lateral -->
    <BarraLateral />

    <!-- Contenido principal -->
    <div class="p-8 bg-gray-50 min-h-screen flex-1 overflow-y-auto">
      <div v-if="!contactoSeleccionado && !mostrandoNuevoContacto">
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
          <button
            @click="mostrarFormularioNuevoContacto"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Transferir a un nuevo contacto
          </button>
        </div>
      </div>

      <!-- Formulario de transferencia -->
      <div v-else-if="contactoSeleccionado">
        <TransferenciaFormulario
          :contacto="contactoSeleccionado"
          @volver="contactoSeleccionado = null"
        />
      </div>

      <!-- Formulario para nuevo contacto -->
      <div v-else-if="mostrandoNuevoContacto">
        <NuevoContactoFormulario
          @guardar="agregarNuevoContacto"
          @cancelar="mostrandoNuevoContacto = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BarraLateral from './../BarraLateral.vue';
import TransferenciaFormulario from './TransferenciaFormulario.vue';
import NuevoContactoFormulario from './TransferenciasNuevoContacto.vue';

export default {
  components: {
    BarraLateral,
    TransferenciaFormulario,
    NuevoContactoFormulario,
  },
  data() {
    return {
      contactoSeleccionado: null,
      mostrandoNuevoContacto: false,
      busqueda: '',
      contactos: [
        {
          id: 1,
          nombre: 'Laura Martínez',
          cbu: '000002233445566778899',
          avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
        {
          id: 2,
          nombre: 'Carlos Pérez',
          cbu: '00000111222333445566',
          avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
        },
        {
          id: 3,
          nombre: 'Lucía Torres',
          cbu: '00000998887776665544',
          avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
        },
      ],
    };
  },
  computed: {
    contactosFiltrados() {
      return this.contactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    },
  },
  methods: {
    seleccionarContacto(contacto) {
      this.contactoSeleccionado = contacto;
    },
    mostrarFormularioNuevoContacto() {
      this.mostrandoNuevoContacto = true;
    },
    agregarNuevoContacto(nuevoContacto) {
      nuevoContacto.id = this.contactos.length + 1; // Generar un ID único
      this.contactos.push(nuevoContacto);
      this.mostrandoNuevoContacto = false;
    },
  },
};
</script>