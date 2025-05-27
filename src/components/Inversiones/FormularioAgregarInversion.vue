<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Agregar Nueva Inversión
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nombre del Activo</label
          >
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Ej: Acciones Apple (AAPL)"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <div>
          <label for="type" class="block text-sm font-medium text-gray-700"
            >Tipo de Activo</label
          >
          <select
            v-model="form.type"
            id="type"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
            :class="{ 'border-red-500': errors.type }"
          >
            <option value="" disabled>Selecciona un tipo</option>
            <option value="Acciones EEUU">Acciones EEUU</option>
            <option value="Bonos Corporativos">Bonos Corporativos</option>
            <option value="FCI Renta Variable">FCI Renta Variable</option>
            <option value="Criptomonedas">Criptomonedas</option>
            <option value="ETFs">ETFs</option>
            <option value="Renta Fija">Renta Fija</option>
          </select>
          <p v-if="errors.type" class="text-red-500 text-sm mt-1">
            {{ errors.type }}
          </p>
        </div>

        <div>
          <label for="quantity" class="block text-sm font-medium text-gray-700"
            >Cantidad</label
          >
          <input
            v-model.number="form.quantity"
            type="number"
            min="0"
            id="quantity"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Ej: 50"
            :class="{ 'border-red-500': errors.quantity }"
          />
          <p v-if="errors.quantity" class="text-red-500 text-sm mt-1">
            {{ errors.quantity }}
          </p>
        </div>

        <div>
          <label
            for="purchasePricePerUnit"
            class="block text-sm font-medium text-gray-700"
            >Precio de Compra por Unidad</label
          >
          <input
            v-model.number="form.purchasePricePerUnit"
            type="number"
            min="0"
            step="0.01"
            id="purchasePricePerUnit"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Ej: 150.00"
            :class="{ 'border-red-500': errors.purchasePricePerUnit }"
          />
          <p
            v-if="errors.purchasePricePerUnit"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.purchasePricePerUnit }}
          </p>
        </div>

        <div>
          <label
            for="acquisitionDate"
            class="block text-sm font-medium text-gray-700"
            >Fecha de Adquisición</label
          >
          <input
            v-model="form.acquisitionDate"
            type="date"
            id="acquisitionDate"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-green-500 focus:border-green-500"
            :class="{ 'border-red-500': errors.acquisitionDate }"
          />
          <p v-if="errors.acquisitionDate" class="text-red-500 text-sm mt-1">
            {{ errors.acquisitionDate }}
          </p>
        </div>

        <!-- Aquí se muestra el error general del backend -->
        <p v-if="errors.general" class="text-red-500 text-sm mt-2 text-center">
          {{ errors.general }}
        </p>

        <div class="mt-4 flex justify-between">
          <button
            type="button"
            @click="$emit('cancel')"
            class="bg-gray-200 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md shadow transition duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-[#5D8C39] hover:bg-[#5D8C39]/80 text-white font-bold py-2 px-4 rounded-md shadow transition duration-200"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useInvestmentStore } from "../store/investmentStore";
import { useAccountStore } from "../store/accountStore";

export default defineComponent({
  name: "FormularioAgregarInversion",
  emits: ["cancel", "success"],
  setup(_, { emit }) {
    const form = ref({
      name: "",
      type: "",
      quantity: null,
      purchasePricePerUnit: null,
      acquisitionDate: "",
    });

    const errors = ref({
      name: "",
      type: "",
      quantity: "",
      purchasePricePerUnit: "",
      acquisitionDate: "",
      general: "",
    });

    const investmentStore = useInvestmentStore();
    const accountStore = useAccountStore();

    const validateForm = () => {
      let isValid = true;
      errors.value.general = "";
      if (!form.value.name.trim()) {
        errors.value.name = "El nombre del activo es obligatorio.";
        isValid = false;
      } else {
        errors.value.name = "";
      }
      if (!form.value.type) {
        errors.value.type = "Selecciona un tipo de activo.";
        isValid = false;
      } else {
        errors.value.type = "";
      }
      if (!form.value.quantity || form.value.quantity <= 0) {
        errors.value.quantity = "La cantidad debe ser mayor a 0.";
        isValid = false;
      } else {
        errors.value.quantity = "";
      }
      if (
        !form.value.purchasePricePerUnit ||
        form.value.purchasePricePerUnit < 0
      ) {
        errors.value.purchasePricePerUnit =
          "El precio debe ser mayor o igual a 0.";
        isValid = false;
      } else {
        errors.value.purchasePricePerUnit = "";
      }
      if (!form.value.acquisitionDate) {
        errors.value.acquisitionDate =
          "La fecha de adquisición es obligatoria.";
        isValid = false;
      } else {
        errors.value.acquisitionDate = "";
      }
      return isValid;
    };

  const handleSubmit = async () => {
    if (validateForm()) {
      const quantity = Number(form.value.quantity);
      const price = Number(form.value.purchasePricePerUnit);
      const amount = quantity * price;

      const investmentData = { amount };

      try {
        await investmentStore.invest(investmentData);
        await accountStore.getCurrentAccount();
        emit("success");
        // Limpiar formulario solo si fue exitoso
        form.value = {
          name: "",
          type: "",
          quantity: null,
          purchasePricePerUnit: null,
          acquisitionDate: "",
        };
        errors.value = {
          name: "",
          type: "",
          quantity: "",
          purchasePricePerUnit: "",
          acquisitionDate: "",
          general: "",
        };
      } catch (errMsg) {
        errors.value.general = errMsg || "Error al invertir. Intenta nuevamente.";
      }
    }
  };

    return {
      form,
      errors,
      handleSubmit,
    };
  },
});
</script>