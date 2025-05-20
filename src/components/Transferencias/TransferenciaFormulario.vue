<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white p-6 rounded-lg shadow flex-izq items-center">
    <BotonRetroceder />
    <div class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm">
      Paso 2 de 4
    </div>
    <div v-if="transferenciaStore.selectedContact" class="flex items-center gap-4 mb-6">
      <img :src="transferenciaStore.selectedContact.avatar" alt="Avatar" class="w-12 h-12 rounded-full" />
      <div>
        <p class="text-lg font-semibold">{{ transferenciaStore.selectedContact.nombre }}</p>
        <p class="text-sm text-gray-500">CBU/CVU: {{ transferenciaStore.selectedContact.cbu }}</p>
      </div>
    </div>

    <div class="mb-4">
      <p class="text-sm font-medium mb-2">Seleccionar método de pago</p>
      <div class="flex gap-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="metodoPago"
            value="tarjeta"
            v-model="transferenciaStore.paymentMethod"
            class="hidden"
          />
          <div
            :class="transferenciaStore.paymentMethod === 'tarjeta' ? 'bg-[#3C4F2E]' : 'bg-gray-300'"
            class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
          >
            <div
              v-if="transferenciaStore.paymentMethod === 'tarjeta'"
              class="w-3 h-3 rounded-full"
            ></div>
          </div>
          <span class="text-sm">Tarjeta</span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="metodoPago"
            value="cuenta"
            v-model="transferenciaStore.paymentMethod"
            class="hidden"
          />
          <div
            :class="transferenciaStore.paymentMethod === 'cuenta' ? 'bg-[#3C4F2E]' : 'bg-gray-300'"
            class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
          >
            <div
              v-if="transferenciaStore.paymentMethod === 'cuenta'"
              class="w-3 h-3 rounded-full"
            ></div>
          </div>
          <span class="text-sm">Dinero en Cuenta</span>
        </label>
      </div>
    </div>

    <div v-if="transferenciaStore.paymentMethod === 'tarjeta'" class="mb-6">
      <p class="text-sm font-medium mb-2">Seleccionar tarjeta</p>
      <div class="flex items-center gap-4">
        <button
          @click="transferenciaStore.rotateCard('anterior')"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-30"
        >
          <img src="/images/backComplete.png" alt="Siguiente" class="w-6 h-6" />
        </button>

        <div
          class="p-4 rounded-xl shadow-lg bg-gradient-to-br from-[#243219] to-[#558B2F] text-white flex-1 text-center z-10"
        >
          <p class="text-sm">{{ transferenciaStore.currentCard.nombre }}</p>
          <p class="text-xl font-bold tracking-widest mt-2">{{ transferenciaStore.currentCard.numero }}</p>
        </div>

        <button
          @click="transferenciaStore.rotateCard('siguiente')"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transform relative z-20"
        >
          <img src="/images/forward.png" alt="Siguiente" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div v-if="transferenciaStore.paymentMethod === 'cuenta'" class="mb-6">
      <div class="bg-gradient-to-br from-[#243219] to-[#558B2F] p-4 rounded-xl text-white shadow">
        <p class="text-sm">Dinero disponible en cuenta</p>
        <p class="text-xl font-bold tracking-widest mt-2">$100,000</p>
      </div>
    </div>

    <div class="mb-6">
      <label for="monto" class="block text-sm font-medium mb-1">Monto</label>
      <input
        v-model="transferenciaStore.amount"
        id="monto"
        type="text"
        placeholder="100,000"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        :class="{ 'border-red-500': transferenciaStore.amountError }"
      />
      <p v-if="transferenciaStore.amountError" class="text-red-500 text-sm mt-1">Ingresar monto a transferir</p>
    </div>

    <div class="flex justify-between">
      <button @click="volver" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
        Cancelar
      </button>
      <button
        class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
        @click="validateAndShowPopup"
      >
        Transferir
      </button>
    </div>

    <ConfirmacionPopup
      v-if="transferenciaStore.showConfirmationPopup"
      :monto="transferenciaStore.amount"
      :contacto="transferenciaStore.selectedContact"
      @cancelar="transferenciaStore.toggleConfirmationPopup(false)"
      @confirmar="handleConfirmTransfer"
    />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTransferenciaStore } from '../store/TransferenciasStore.js';
import ConfirmacionPopup from './ConfirmacionPopup.vue';
import BotonRetroceder from '../BotonRetroceder.vue';

export default defineComponent({
  components: {
    ConfirmacionPopup,
    BotonRetroceder,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const transferenciaStore = useTransferenciaStore();

    onMounted(() => {
      const nombreParam = decodeURIComponent(route.params.contactoNombre);
      if (!transferenciaStore.selectedContact || transferenciaStore.selectedContact.nombre !== nombreParam) {
        const foundContact = transferenciaStore.contacts.find(c => c.nombre === nombreParam);
        if (foundContact) {
          transferenciaStore.selectContact(foundContact);
        } else {
          router.push('/transferir');
        }
      }
    });

    const validateAndShowPopup = () => {
      if (!transferenciaStore.amount.trim()) {
        transferenciaStore.setAmountError(true);
        return;
      }
      transferenciaStore.setAmountError(false);
      transferenciaStore.toggleConfirmationPopup(true);
    };

    const handleConfirmTransfer = () => {
      transferenciaStore.confirmTransfer();
      transferenciaStore.toggleConfirmationPopup(false);

      router.push({
        name: 'ComprobanteTransferencia',
        params: { destinatario: encodeURIComponent(transferenciaStore.receiptDetails.destinatario) },
        query: {
          monto: transferenciaStore.receiptDetails.monto,
          metodo: transferenciaStore.receiptDetails.metodo,
          fecha: transferenciaStore.receiptDetails.fecha,
          orden: transferenciaStore.receiptDetails.orden,
        },
      });
    };

    const volver = () => {
      transferenciaStore.resetTransferForm();
      router.push('/transferir');
    };

    return {
      transferenciaStore,
      validateAndShowPopup,
      handleConfirmTransfer,
      volver,
    };
  },
});
</script>