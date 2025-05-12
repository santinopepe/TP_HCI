<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nombre del Activo</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        required
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: Acciones Apple (AAPL)"
      />
    </div>

    <div>
      <label for="type" class="block text-sm font-medium text-gray-700">Tipo de Activo</label>
      <select
        v-model="form.type"
        id="type"
        required
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
      >
        <option value="" disabled>Selecciona un tipo</option>
        <option value="Acciones EEUU">Acciones EEUU</option>
        <option value="Bonos Corporativos">Bonos Corporativos</option>
        <option value="FCI Renta Variable">FCI Renta Variable</option>
        <option value="Criptomonedas">Criptomonedas</option>
        <option value="ETFs">ETFs</option>
        <option value="Renta Fija">Renta Fija</option>
      </select>
    </div>

    <div>
      <label for="quantity" class="block text-sm font-medium text-gray-700">Cantidad</label>
      <input
        v-model.number="form.quantity"
        type="number"
        id="quantity"
        required
        min="1"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: 50"
      />
    </div>

    <div>
      <label for="purchasePricePerUnit" class="block text-sm font-medium text-gray-700">Precio de Compra por Unidad</label>
      <input
        v-model.number="form.purchasePricePerUnit"
        type="number"
        id="purchasePricePerUnit"
        required
        min="0"
        step="0.01"
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Ej: 150.00"
      />
    </div>

    <div>
      <label for="acquisitionDate" class="block text-sm font-medium text-gray-700">Fecha de Adquisición</label>
      <input
        v-model="form.acquisitionDate"
        type="date"
        id="acquisitionDate"
        required
        class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
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
        Guardar
      </button>
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FormularioAgregarInversion',
  emits: ['submit', 'cancel'],
  setup(_, { emit }) {
    const form = ref({
      name: '',
      type: '',
      quantity: null,
      purchasePricePerUnit: null,
      acquisitionDate: '',
    });

    const handleSubmit = () => {
      // Emit the form data to the parent component
      emit('submit', { ...form.value });
      // Reset form after submission
      form.value = {
        name: '',
        type: '',
        quantity: null,
        purchasePricePerUnit: null,
        acquisitionDate: '',
      };
    };

    return {
      form,
      handleSubmit,
    };
  },
});
</script>

