<template>
  <div class="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-2xl">
    <BotonRetroceder />
    <!-- Indicador de pasos -->
    <div class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm">
      Paso 2 de 4
    </div>
    <!-- Datos del contacto -->
    <div v-if="contacto" class="flex items-center gap-4 mb-6">
      <img :src="contacto.avatar" alt="Avatar" class="w-12 h-12 rounded-full" />
      <div>
        <p class="text-lg font-semibold">{{ contacto.nombre }}</p>
        <p class="text-sm text-gray-500">CBU/CVU: {{ contacto.cbu }}</p>
      </div>
    </div>

    <!-- Método de pago -->
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
          <img src="/images/backComplete.png" alt="Siguiente" class="w-6 h-6" />
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
          <img src="/images/forward.png" alt="Siguiente" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Dinero en cuenta -->
    <div v-if="metodo === 'cuenta'" class="mb-6">
      <div class="bg-gradient-to-br from-[#243219] to-[#558B2F] p-4 rounded-xl text-white shadow">
        <p class="text-sm">Dinero disponible en cuenta</p>
        <p class="text-xl font-bold tracking-widest mt-2">$100,000</p>
      </div>
    </div>

    <!-- Monto -->
    <div class="mb-6">
      <label for="monto" class="block text-sm font-medium mb-1">Monto</label>
      <input
        v-model="monto"
        id="monto"
        type="text"
        placeholder="100,000"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        :class="{ 'border-red-500': errorMonto }"
      />
      <p v-if="errorMonto" class="text-red-500 text-sm mt-1">Ingresar monto a transferir</p>
    </div>

    <!-- Botones -->
    <div class="flex justify-between">
      <button @click="volver" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
        Cancelar
      </button>
      <button
        class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
        @click="validarMonto"
      >
        Transferir
      </button>
    </div>

    <!-- Popup de confirmación -->
    <ConfirmacionPopup
      v-if="mostrarPopup"
      :monto="monto"
      :contacto="contacto"
      @cancelar="mostrarPopup = false"
      @confirmar="confirmarTransferencia"
    />
  </div>
</template>

<script>
import ConfirmacionPopup from './ConfirmacionPopup.vue';
import BotonRetroceder from '../BotonRetroceder.vue';
import { contactStore } from '../tienda.js';

export default {
  components: {
    ConfirmacionPopup,
    BotonRetroceder,
  },
  data() {
    return {
      metodo: 'tarjeta',
      monto: '',
      mostrarPopup: false,
      errorMonto: false,
      cargo: 1.0,
      tarjetas: [
        { nombre: 'Tarjeta de Juliana Márquez', numero: '•••• •••• •••• 9987' },
        { nombre: 'Tarjeta de Carlos Pérez', numero: '•••• •••• •••• 1234' },
        { nombre: 'Tarjeta de Lucía Torres', numero: '•••• •••• •••• 5678' },
      ],
      tarjetaSeleccionada: 0,
    };
  },
  computed: {
    contacto() {
      const nombreParam = decodeURIComponent(this.$route.params.contactoNombre);
      return contactStore.contactos.find(c => c.nombre === nombreParam);
    },
    tarjetaAnterior() {
      return (this.tarjetaSeleccionada - 1 + this.tarjetas.length) % this.tarjetas.length;
    },
    tarjetaSiguiente() {
      return (this.tarjetaSeleccionada + 1) % this.tarjetas.length;
    },
    fechaActual() {
      const fecha = new Date();
      return fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
    ordenGenerada() {
      return Math.floor(Math.random() * 1000000000).toString();
    },
  },
  methods: {
    setMetodo(metodo) {
      this.metodo = metodo;
    },
    rotarTarjeta(direccion) {
      if (direccion === 'anterior') {
        this.tarjetaSeleccionada =
          (this.tarjetaSeleccionada - 1 + this.tarjetas.length) % this.tarjetas.length;
      } else if (direccion === 'siguiente') {
        this.tarjetaSeleccionada = (this.tarjetaSeleccionada + 1) % this.tarjetas.length;
      }
    },
    validarMonto() {
      if (!this.monto.trim()) {
        this.errorMonto = true;
        return;
      }
      this.errorMonto = false;
      this.mostrarPopup = true;
    },
    confirmarTransferencia() {
      const transferencia = {
        fecha: this.fechaActual,
        orden: this.ordenGenerada,
        metodo: this.metodo,
        destinatario: this.contacto?.nombre || '',
        monto: parseFloat(this.monto),
        cargo: this.cargo,
      };
      this.mostrarPopup = false;
      this.$router.push({
        name: 'ComprobanteTransferencia',
        params: { destinatario: encodeURIComponent(this.contacto?.nombre || 'destinatario') },
        query: {
          monto: this.monto,
          metodo: this.metodo,
          fecha: this.fechaActual,
          orden: this.ordenGenerada,
        },
      });
    },
    volver() {
      this.$router.push('/transferir');
    },
  },
};
</script>