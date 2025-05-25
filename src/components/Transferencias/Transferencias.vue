<template>
  <div class="flex h-screen font-sans overflow-hidden relative">
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
          v-model="searchQuery"
          type="text"
          placeholder="Buscar contacto..."
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="max-w-md mx-auto">
        <ul class="space-y-4">
          <li
            v-for="contacto in filteredContacts"
            :key="contacto.id"
            @click="handleSelectContact(contacto)"
            class="bg-white p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer flex items-center gap-4"
          >
            <img class="w-10 h-10 rounded-full" />
            <div>
              <p>{{ contacto.name }}</p>
              <p>CBU/CVU: {{ contacto.cvu }}</p>
              <p v-if="contacto.alias">Alias: {{ contacto.alias }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="max-w-md mx-auto mt-6 text-center">
        <button
          @click="showNewContactModal = true"
          class="bg-[#5D8C39] text-white px-4 py-2 rounded-lg hover:bg-[#5D8C39]/80"
        >
          Nuevo contacto
        </button>
      </div>
    </div>

    <TransferenciaModal
      :is-open="showTransferModal"
      :contacto="selectedContact"
      @close="showTransferModal = false"
    />

    <NuevoContactoModal
      :is-open="showNewContactModal"
      @close="showNewContactModal = false"
      @contact-added="handleNewContact"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCobrosStore } from "../store/CobrosStore.js";
import BarraLateral from "./../BarraLateral.vue";
import TransferenciaModal from "./TransferenciaModal.vue";
import NuevoContactoModal from "./NuevoContactoModal.vue";
import { useContactosStore } from "../store/ContactosStore.js";

export default defineComponent({
  components: {
    BarraLateral,
    TransferenciaModal,
    NuevoContactoModal,
  },
  setup() {
    const selectedContact = ref(null);
    const router = useRouter();
    const cobrosStore = useCobrosStore();
    const contactosStore = useContactosStore();
    const activeButton = ref("transferir");
    const showTransferModal = ref(false);
    const showNewContactModal = ref(false);
    const searchQuery = ref("");

    // Cargar contactos reales al montar
    onMounted(() => {
      cobrosStore.fetchPagos();
    });

    // Filtro de búsqueda
    const filteredContacts = computed(() => {
      if (!searchQuery.value) return contactosStore.contactos;
      return contactosStore.contactos.filter(contacto =>
        (contacto.name || contacto.nombre || "")
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    // Seleccionar contacto para transferir
    const handleSelectContact = (contacto) => {
      selectedContact.value = contacto;
      showTransferModal.value = true;
    };

    // Cuando se completa la transferencia
    const handleTransferComplete = () => {
      showTransferModal.value = false;
    };

    // Cuando se agrega un nuevo contacto, refresca la lista
    function handleNewContact(contacto) {
      selectedContact.value = contacto;
      showTransferModal.value = true;
    }
    
    return {
      activeButton,
      searchQuery,
      filteredContacts,
      showTransferModal,
      showNewContactModal,
      handleSelectContact,
      handleTransferComplete,
      handleNewContact,
      selectedContact,
    };
  },
});
</script>