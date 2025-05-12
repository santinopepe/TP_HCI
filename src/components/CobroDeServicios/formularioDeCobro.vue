<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Título del Servicio</label>
      <input
        v-model="form.title"
        type="text"
        id="title"
        required
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: Consultoría de Negocios"
      />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Descripción (Opcional)</label>
      <textarea
        v-model="form.description"
        id="description"
        rows="4"
        maxlength="200"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: Sesión de 2 horas sobre estrategia empresarial"
      ></textarea>
      <p class="text-sm text-gray-500 mt-1">{{ form.description.length }} / 200 caracteres</p>
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Monto</label>
      <input
        v-model.number="form.price"
        type="number"
        id="price"
        required
        min="0"
        step="0.01"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: 50000.00"
      />
    </div>

    <div class="flex justify-end space-x-4">
      <button
        type="button"
        @click="$emit('cancel')"
        class="text-gray-600 hover:text-gray-800 font-medium py-2 px-4"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="bg-[#5D8C39] hover:bg-[#4A7030] text-white font-bold py-2 px-4 rounded-lg"
      >
        Crear Link
      </button>
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddPaymentLinkForm',
  emits: ['submit', 'cancel'],
  setup(_, { emit }) {
    const form = ref({
      title: '',
      description: '',
      price: null,
    });

    const handleSubmit = () => {
      emit('submit', { ...form.value });
      form.value = {
        title: '',
        description: '',
        price: null,
      };
    };

    return {
      form,
      handleSubmit,
    };
  },
});
</script>

