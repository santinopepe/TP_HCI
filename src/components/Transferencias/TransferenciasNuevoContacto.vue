<template>
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Nuevo Contacto</h2>
      <form @submit.prevent="guardarContacto">
        <div class="mb-4">
          <label for="nombre" class="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            v-model="nuevoContacto.nombre"
            type="text"
            id="nombre"
            placeholder="Nombre del contacto"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div class="mb-4">
          <label for="cbu" class="block text-gray-700 font-medium mb-2">CBU/CVU</label>
          <input
            v-model="nuevoContacto.cbu"
            type="text"
            id="cbu"
            placeholder="CBU/CVU del contacto"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div class="flex justify-between">
          <button
            type="button"
            @click="$emit('cancelar')"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nuevoContacto: {
          nombre: '',
          cbu: '',
          avatar: '',
        },
      };
    },
    methods: {
      guardarContacto() {
        if (!this.nuevoContacto.nombre.trim()) {
          alert('El nombre no puede estar vacío.');
          return;
        }
        if (!/^\d{22}$/.test(this.nuevoContacto.cbu)) {
          alert('El CBU/CVU debe tener 22 dígitos.');
          return;
        }
        this.$emit('guardar', { ...this.nuevoContacto });
        this.nuevoContacto = { nombre: '', cbu: '', avatar: '' };
      }
    },
  };
  </script>