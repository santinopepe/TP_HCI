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
            @input="validateCBU"
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
import { useTransferenciaStore } from "../store/TransferenciasStore.js";

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
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      },
      errores: {
        nombre: "",
        cbu: "",
      },
    };
  },
  methods: {
    validateCBU(event) {
      // Remove any non-digit characters
      this.nuevoContacto.cbu = event.target.value.replace(/\D/g, "");
    },
    closeModal() {
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      this.nuevoContacto = {
        nombre: "",
        cbu: "",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      };
      this.errores = {
        nombre: "",
        cbu: "",
      };
    },
    guardarContacto() {
      // Reiniciar errores
      this.errores.nombre = "";
      this.errores.cbu = "";

      // Validar nombre
      if (!this.nuevoContacto.nombre.trim()) {
        this.errores.nombre = "El nombre no puede estar vacío.";
      }

      // Validar CBU/CVU
      if (!/^\d{22}$/.test(this.nuevoContacto.cbu)) {
        this.errores.cbu = "El CBU/CVU debe tener 22 dígitos.";
      }

      // Si hay errores, no continuar
      if (this.errores.nombre || this.errores.cbu) {
        return;
      }

      // Emitir evento para guardar el contacto
      this.$emit("contact-added", { ...this.nuevoContacto });

      // Cerrar el modal y resetear el formulario
      this.closeModal();
    },
  },
};
</script>
