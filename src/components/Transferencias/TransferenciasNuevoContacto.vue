<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <BotonRetroceder />
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Nuevo Contacto</h2>
      <form @submit.prevent="guardarContacto" class="w-full">
        <div class="mb-4">
          <label for="nombre" class="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            v-model="nuevoContacto.nombre"
            type="text"
            id="nombre"
            placeholder="Nombre del contacto"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            :class="{ 'border-red-500': errores.nombre }"
          />
          <p v-if="errores.nombre" class="text-red-500 text-sm mt-1">{{ errores.nombre }}</p>
        </div>
        <div class="mb-4">
          <label for="cbu" class="block text-gray-700 font-medium mb-2">CBU/CVU</label>
          <input
            v-model="nuevoContacto.cbu"
            type="text"
            id="cbu"
            placeholder="CBU/CVU del contacto"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            :class="{ 'border-red-500': errores.cbu }"
          />
          <p v-if="errores.cbu" class="text-red-500 text-sm mt-1">{{ errores.cbu }}</p>
        </div>
        <div class="flex justify-center items-center">
          <button
            type="submit"
            class="bg-[#5D8C39] text-white px-12 py-2 rounded-lg hover:bg-[#5D8C39]/80"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BotonRetroceder from './../BotonRetroceder.vue';

export default {
  components: {
    BotonRetroceder,
  },
  data() {
    return {
      nuevoContacto: {
        nombre: '',
        cbu: '',
        avatar: '',
      },
      errores: {
        nombre: '',
        cbu: '',
      },
    };
  },
  methods: {
    guardarContacto() {
      // Reiniciar errores
      this.errores.nombre = '';
      this.errores.cbu = '';

      // Validar nombre
      if (!this.nuevoContacto.nombre.trim()) {
        this.errores.nombre = 'El nombre no puede estar vacío.';
      }

      // Validar CBU/CVU
      if (!/^\d{22}$/.test(this.nuevoContacto.cbu)) {
        this.errores.cbu = 'El CBU/CVU debe tener 22 dígitos.';
      }

      // Si hay errores, no continuar
      if (this.errores.nombre || this.errores.cbu) {
        return;
      }

      // Emitir evento para guardar el contacto
      this.$emit('guardar', { ...this.nuevoContacto });

      // Limpiar los datos del formulario
      this.nuevoContacto = { nombre: '', cbu: '', avatar: '' };

      // Redirigir a la pantalla de transferencias
      this.$router.push('/transferir');
    },
  },
};
</script>