<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />
    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            Cobro de Servicios
          </h1>
        </div>
        <button
          @click="showAddLinkModal = true"
          class="bg-[#5D8C39] hover:bg-[#4A7030] text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
        >
          + Crear Link de Pago
        </button>
      </div>

      <div v-if="cobrosStore.loading" class="text-center text-blue-600 mb-4">
        Cargando pagos...
      </div>
      <div v-if="cobrosStore.error" class="text-center text-red-600 mb-4">
        Error: {{ cobrosStore.error.message }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Total Cobrado</h2>
          <p class="text-3xl font-bold mt-2">
            {{ formatCurrency(totalCollected) }}
          </p>
        </div>
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Links Activos</h2>
          <p class="text-3xl font-bold mt-2">{{ activeLinks }}</p>
        </div>
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Total Links Generados</h2>
          <p class="text-3xl font-bold mt-2">{{ totalLinks }}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-700">Links de Pago</h2>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por descripción..."
            class="border border-gray-300 rounded-lg p-2 w-64 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <table class="w-full text-left min-w-[900px]">
          <thead>
            <tr class="border-b border-gray-200">
              <th
                class="p-3 font-semibold text-gray-600 cursor-pointer hover:bg-gray-50"
                @click="sortBy('description')"
              >
                Título / Descripción ↓↑
              </th>
              <th class="p-3 font-semibold text-gray-600">Receptor</th>
              <th
                class="p-3 font-semibold text-gray-600 text-right cursor-pointer hover:bg-gray-50"
                @click="sortBy('amount')"
              >
                Monto ↓↑
              </th>
              <th class="p-3 font-semibold text-gray-600 text-center">
                Estado
              </th>
              <th class="p-3 font-semibold text-gray-600 text-center">UUID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!mappedPagos || mappedPagos.length === 0">
              <td colspan="6" class="p-3 text-center text-gray-500">
                No se encontraron links de pago.
              </td>
            </tr>
            <tr
              v-for="link in mappedPagos"
              :key="link.id"
              class="border-b border-gray-100 hover:bg-gray-50"
            >
              <td class="p-3">{{ link.description }}</td>
              <td class="p-3 truncate max-w-xs">
                {{ link.receiverName || "-" }}
              </td>
              <td class="p-3 text-right">{{ formatCurrency(link.amount) }}</td>
              <td class="p-3 text-center">
                <span
                  :class="{
                    'text-green-600': link.status === 'Pagado',
                    'text-yellow-600': link.status === 'Pendiente',
                  }"
                >
                  {{ link.status }}
                </span>
              </td>
              <td class="p-3 text-center">
                <button
                  @click="openUuidModal(link.uuid)"
                  class="text-blue-600 hover:underline font-medium break-all"
                  :title="link.uuid"
                >
                  {{ truncateUuid(link.uuid) }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="showAddLinkModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
        @click.self="showAddLinkModal = false"
        @keydown.esc="showAddLinkModal = false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h3
            id="modal-title"
            class="text-2xl font-semibold mb-6 text-gray-800"
          >
            Crear Nuevo Link de Pago
          </h3>
          <AddPaymentLinkForm
            @submit="handleAddLink"
            @cancel="showAddLinkModal = false"
          />
        </div>
      </div>

      <div
        v-if="showUuidModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
        @click.self="showUuidModal = false"
        @keydown.esc="showUuidModal = false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="uuid-modal-title"
      >
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
          <h3
            id="uuid-modal-title"
            class="text-2xl font-semibold mb-6 text-gray-800"
          >
            Detalles del UUID
          </h3>
          <p class="text-lg font-mono text-gray-800 mb-4 break-all">{{ currentUuid }}</p>
          <div class="flex justify-between items-center ">
            <button
              @click="copyUuidToClipboard"
              class="bg-[#5D8C39]  hover:bg-[#5D8C39]/80 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Copiar UUID
            </button>
            <button
              @click="showUuidModal = false"
              class="bg-gray-200 text-gray-700 hover:bg-gray-400 font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Cerrar
            </button>
          </div>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useCobrosStore } from "../store/CobrosStore.js";
import BarraLateral from "../BarraLateral.vue";
import AddPaymentLinkForm from "./formularioDeCobro.vue";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "CobrosDashboard",
  components: {
    BarraLateral,
    AddPaymentLinkForm,
  },
  setup() {
    const cobrosStore = useCobrosStore();
    const activeButton = ref("CobroDeServicios");
    const showAddLinkModal = ref(false);
    const showUuidModal = ref(false); 
    const currentUuid = ref(''); 

    onMounted(async () => {
      try {
        await cobrosStore.fetchPagos();
      } catch (e) {
        console.error("Error al cargar pagos en onMounted:", e);
      }
    });

    const formatCurrency = (value) => {
      if (typeof value !== "number" || isNaN(value)) return "$0.00";
      return value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
    };

    const searchQuery = ref('');
    const sortByField = ref(null);
    const sortDirection = ref('asc');

    const handleAddLink = async (formData) => {
      console.log('Datos del formulario recibidos (raw):', formData);

      const apiPayload = {
        description: formData.description || formData.title,
        amount: parseFloat(formData.price),
        metadata: {},
      };

      console.log('Datos del formulario adaptados para la API:', apiPayload);

      try {
        await cobrosStore.pull(apiPayload);
        await cobrosStore.fetchPagos();
        showAddLinkModal.value = false;
      } catch (error) {
        console.error('Error al crear link de pago desde el dashboard:', error);
      }
    };

    const mappedPagos = computed(() => {
        let payments = cobrosStore.pagos.map(pago => ({
            id: pago.id,
            uuid: pago.uuid,
            description: pago.description,
            amount: pago.amount,
            status: pago.pending ? 'Pendiente' : 'Pagado',
            receiverName: pago.receiver ? `${pago.receiver.firstName} ${pago.receiver.lastName}` : 'N/A',
        }));

        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            payments = payments.filter(pago =>
                pago.description?.toLowerCase().includes(query) ||
                pago.receiverName?.toLowerCase().includes(query) ||
                pago.uuid?.toLowerCase().includes(query) // También puedes buscar por UUID
            );
        }

        if (sortByField.value) {
            payments.sort((a, b) => {
                let aValue = a[sortByField.value];
                let bValue = b[sortByField.value];

                if (sortByField.value === 'amount') {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                } else if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return payments;
    });

    const totalCollected = computed(() => {
      return cobrosStore.pagos.filter(pago => !pago.pending).reduce((sum, pago) => sum + (pago.amount || 0), 0);
    });

    const activeLinks = computed(() => {
      return cobrosStore.pagos.filter(pago => pago.pending).length;
    });

    const totalLinks = computed(() => {
      return cobrosStore.pagos.length;
    });

    function sortBy(field) {
        if (sortByField.value === field) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortByField.value = field;
            sortDirection.value = 'asc';
        }
    }

    function openUuidModal(uuid) {
      currentUuid.value = uuid;
      showUuidModal.value = true;
    }

    function truncateUuid(uuid) {
      if (!uuid) return '';
      return `${uuid.substring(0, 8)}...${uuid.substring(uuid.length - 4)}`;
    }

  async function copyUuidToClipboard() {
  const toast = useToast();
  try {
    await navigator.clipboard.writeText(currentUuid.value); 
    toast.success("UUID copiado al portapapeles!");
    showUuidModal.value = false; 
  } catch (err) {
    toast.error("Error al copiar el UUID.");
    console.error("Error al copiar UUID:", err);
  }
}

    return {
      activeButton,
      searchQuery,
      mappedPagos,
      totalCollected,
      activeLinks,
      totalLinks,
      sortBy,
      formatCurrency,
      showAddLinkModal,
      showUuidModal,
      currentUuid, 
      handleAddLink,
      cobrosStore,
      openUuidModal, 
      truncateUuid, 
      copyUuidToClipboard, 
    };
  },
});
</script>