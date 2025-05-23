<template>
  <div class="flex h-screen font-sans overflow-hidden relative">
    <div
      class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
    >
      Paso 1 de 4
    </div>
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />
    <div class="p-8 bg-gray-50 min-h-screen flex-1 overflow-y-auto">
      <div class="max-w-2xl mx-auto text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Elegí un contacto</h1>
        <p class="text-gray-500 text-lg">
          Seleccioná un contacto reciente para transferirle dinero.
        </p>
      </div>

      <div class="max-w-md mx-auto mb-6">
        <input
          v-model="transferenciaStore.searchQuery"
          type="text"
          placeholder="Buscar contacto..."
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="max-w-md mx-auto">
        <ul class="space-y-4">
          <li
            v-for="contacto in transferenciaStore.filteredContacts"
            :key="contacto.id"
            @click="handleSelectContact(contacto)"
            class="bg-white p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer flex items-center gap-4"
          >
            <img :src="contacto.avatar" class="w-10 h-10 rounded-full" />
            <div>
              <p class="font-semibold">{{ contacto.nombre }}</p>
              <p class="text-sm text-gray-500">CBU/CVU: {{ contacto.cbu }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="max-w-md mx-auto mt-6 text-center">
        <router-link
          to="/transferirNuevoContacto"
          class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
        >
          Nuevo contacto
        </router-link>
      </div>
    </div>

    <TransferenciaModal
      :is-open="showTransferModal"
      @close="showTransferModal = false"
      @transfer-complete="handleTransferComplete"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useTransferenciaStore } from "../store/TransferenciasStore.js";
import BarraLateral from "./../BarraLateral.vue";
import TransferenciaModal from "./TransferenciaModal.vue";

export default defineComponent({
  components: {
    BarraLateral,
    TransferenciaModal,
  },
  setup() {
    const router = useRouter();
    const transferenciaStore = useTransferenciaStore();
    const activeButton = ref("transferir");
    const showTransferModal = ref(false);

    const handleSelectContact = (contacto) => {
      transferenciaStore.selectContact(contacto);
      showTransferModal.value = true;
    };

    const handleTransferComplete = (transferDetails) => {
      showTransferModal.value = false;
    };

    return {
      activeButton,
      transferenciaStore,
      showTransferModal,
      handleSelectContact,
      handleTransferComplete,
    };
  },
});
</script>
