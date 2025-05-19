<template>
  <div class="bg-white p-6 rounded-xl shadow-xl max-w-md w-full m-4 relative">
    <!-- Indicador de pasos -->
    <div class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm">
      Paso 2 de 4
    </div>
    <!-- Datos del servicio -->
    <div class="flex items-center gap-4 mb-6">
      <div>
        <p class="text-lg font-semibold">Servicio de Electricidad</p>
        <p class="text-sm text-gray-500">ID: 12345</p>
      </div>
    </div>

    <div class="mb-4">
      <p class="text-sm font-medium mb-2">Seleccionar método de pago</p>
      <div class="flex gap-4">
        <!-- Opción Tarjeta -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="metodoPago"
            value="tarjeta"
            v-model="metodo"
            class="hidden"
          />
          <div
            :class="metodo === 'tarjeta' ? 'bg-[#3C4F2E]' : 'bg-gray-300'"
            class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
          >
            <div
              v-if="metodo === 'tarjeta'"
              class="w-3 h-3 rounded-full"
            ></div>
          </div>
          <span class="text-sm">Tarjeta</span>
        </label>

        <!-- Opción Dinero en Cuenta -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="metodoPago"
            value="cuenta"
            v-model="metodo"
            class="hidden"
          />
          <div
            :class="metodo === 'cuenta' ? 'bg-[#3C4F2E]' : 'bg-gray-300'"
            class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
          >
            <div
              v-if="metodo === 'cuenta'"
              class="w-3 h-3 rounded-full"
            ></div>
          </div>
          <span class="text-sm">Dinero en Cuenta</span>
        </label>
      </div>
    </div>

    <!-- Tarjetas -->
    <div v-if="metodo === 'tarjeta'" class="mb-6">
      <p class="text-sm font-medium mb-2">Seleccionar tarjeta</p>
      <div class="flex items-center gap-4">
        <!-- Botón anterior -->
        <button
          @click="rotarTarjeta('anterior')"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-30"
        >
          <img src="/public/images/backComplete.png" alt="Anterior" class="w-6 h-6" />
        </button>

        <!-- Tarjeta seleccionada -->
        <div
          class="p-4 rounded-xl shadow-lg bg-gradient-to-br from-[#243219] to-[#558B2F] text-white flex-1 text-center z-10"
        >
          <p class="text-sm">{{ tarjetas[tarjetaSeleccionada].nombre }}</p>
          <p class="text-xl font-bold tracking-widest mt-2">{{ tarjetas[tarjetaSeleccionada].numero }}</p>
        </div>

        <!-- Botón siguiente -->
        <button
          @click="rotarTarjeta('siguiente')"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-20"
        >
          <img src="/public/images/forward.png" alt="Siguiente" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Dinero en cuenta -->
    <div v-if="metodo === 'cuenta'" class="mb-6">
      <div class="bg-gradient-to-br from-[#243219] to-[#558B2F] p-4 rounded-xl text-white shadow">
        <p class="text-sm">Dinero disponible en cuenta</p>
        <p class="text-xl font-bold tracking-widest mt-2">$44,500.00</p>
      </div>
    </div>

    <!-- Botones -->
    <div class="flex justify-between">
      <button
        @click="$emit('cancel')"
        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 font-semibold"
      >
        Cancelar
      </button>
      <button
        @click="proceedToConfirmation"
        class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80 font-semibold"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['proceed-to-confirmation', 'cancel']);

const metodo = ref('tarjeta');
const tarjetaSeleccionada = ref(0);
const tarjetas = ref([
  { nombre: 'Visa de Juan Perez', numero: '**** **** **** 1234' },
  { nombre: 'Mastercard de Juan Perez', numero: '**** **** **** 5678' },
]);

const rotarTarjeta = (direccion) => {
  if (direccion === 'anterior') {
    tarjetaSeleccionada.value =
      (tarjetaSeleccionada.value - 1 + tarjetas.value.length) % tarjetas.value.length;
  } else if (direccion === 'siguiente') {
    tarjetaSeleccionada.value = (tarjetaSeleccionada.value + 1) % tarjetas.value.length;
  }
};

const proceedToConfirmation = () => {
  const paymentDetails = {
    metodo: metodo.value,
    card: metodo.value === 'tarjeta' ? tarjetas.value[tarjetaSeleccionada.value] : null,
  };
  emit('proceed-to-confirmation', paymentDetails);
};
</script>