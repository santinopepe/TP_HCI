<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
      <!-- Close button -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">
        Nuevo Contacto
      </h2>
      <form @submit.prevent="guardarContacto" class="w-full">
        <div class="mb-4">
          <label for="nombre" class="block text-gray-700 font-medium mb-2"
            >Nombre</label
          >
          <input
            v-model="nuevoContacto.nombre"
            type="text"
            id="nombre"
            placeholder="Nombre del contacto"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            :class="{ 'border-red-500': errores.nombre }"
          />
          <p v-if="errores.nombre" class="text-red-500 text-sm mt-1">
            {{ errores.nombre }}
          </p>
        </div>
        <div class="mb-4">
          <label for="cbu" class="block text-gray-700 font-medium mb-2"
            >CBU/CVU</label
          >
          <input
            v-model="nuevoContacto.cbu"
            type="text"
            id="cbu"
            placeholder="CBU/CVU del contacto"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            :class="{ 'border-red-500': errores.cbu }"
            maxlength="22"
          />
          <p v-if="errores.cbu" class="text-red-500 text-sm mt-1">
            {{ errores.cbu }}
          </p>
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
import { ContactsApi } from "../../api/contacts.js";

export default {
  name: "NuevoContactoModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close", "contact-added"],
  data() {
    return {
      nuevoContacto: {
        nombre: "",
        cbu: "",
      },
      errores: {
        nombre: "",
        cbu: "",
      },
    };
  },
  methods: {

    closeModal() {
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      this.nuevoContacto = {
        nombre: "",
        cbu: "",
      };
      this.errores = {
        nombre: "",
        cbu: "",
      };
    },
    async guardarContacto() {
      // Reiniciar errores
      this.errores.nombre = "";
      this.errores.cbu = "";

      // Validar nombre
      if (!this.nuevoContacto.nombre.trim()) {
        this.errores.nombre = "El nombre no puede estar vacío.";
      }

      // Validar CBU/CVU
      if (!/^[a-zA-Z0-9]{6,22}$/.test(this.nuevoContacto.cbu)) {
        this.errores.cbu = "El CBU/CVU o alias debe tener entre 6 y 22 caracteres, solo letras y números.";
      }

      // Si hay errores, no continuar
      if (this.errores.nombre || this.errores.cbu) {
        return;
      }

      this.$emit("contact-added", {
        name: this.nuevoContacto.nombre,
        cvu: this.nuevoContacto.cbu,
      });
      this.closeModal();
      
    },
  },
};
</script>
