<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700"
        >Título del Servicio</label
      >
      <input
        v-model="form.title"
        type="text"
        id="title"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: Consultoría de Negocios"
        :class="{ 'border-red-500': errors.title }"
      />
      <p v-if="errors.title" class="text-red-500 text-sm mt-1">
        {{ errors.title }}
      </p>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Descripción (Opcional)</label
      >
      <textarea
        v-model="form.description"
        id="description"
        rows="4"
        maxlength="200"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: Sesión de 2 horas sobre estrategia empresarial"
        :class="{ 'border-red-500': errors.description }"
      ></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm mt-1">
        {{ errors.description }}
      </p>
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700"
        >Monto</label
      >
      <input
        v-model="form.price"
        type="text"
        id="price"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: 50000.00"
        :class="{ 'border-red-500': errors.price }"
        @input="validatePrice"
      />
      <p v-if="errors.price" class="text-red-500 text-sm mt-1">
        {{ errors.price }}
      </p>
    </div>

    <div class="flex justify-between items-center">
      <button
        type="button"
        @click="$emit('cancel')"
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-400 transition"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="bg-[#5D8C39] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5D8C39]/80 transition"
      >
        Crear Link
      </button>
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddPaymentLinkForm",
  emits: ["submit", "cancel"],
  setup(_, { emit }) {
    const form = ref({
      title: "",
      description: "",
      price: null,
    });

    const errors = ref({
      title: "",
      description: "",
      price: "",
    });

    const validateForm = () => {
      let isValid = true;

      // Validar título
      if (!form.value.title.trim()) {
        errors.value.title = "El título no puede estar vacío.";
        isValid = false;
      } else {
        errors.value.title = "";
      }

      // Validar descripción (opcional, pero puedes agregar validaciones si es necesario)
      if (form.value.description.length > 200) {
        errors.value.description =
          "La descripción no puede exceder los 200 caracteres.";
        isValid = false;
      } else {
        errors.value.description = "";
      }

      // Validar monto
      if (!form.value.price || form.value.price <= 0) {
        errors.value.price = "El monto debe ser mayor a 0.";
        isValid = false;
      } else {
        errors.value.price = "";
      }

      return isValid;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        emit("submit", { ...form.value });
        form.value = {
          title: "",
          description: "",
          price: null,
        };
      }
    };

    const validatePrice = (event) => {
      // Permitir solo números y un punto decimal
      let value = event.target.value.replace(/[^\d.]/g, "");
      // Solo un punto decimal
      const parts = value.split(".");
      if (parts.length > 2) {
        value = parts[0] + "." + parts.slice(1).join("");
      }
      form.value.price = value;
    };

    return {
      form,
      errors,
      handleSubmit,
      validatePrice,
    };
  },
});
</script>
