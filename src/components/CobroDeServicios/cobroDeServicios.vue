<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />
    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Cobro de Servicios</h1>
        </div>
        <button
          @click="showAddLinkModal = true"
          class="bg-[#5D8C39] hover:bg-[#4A7030] text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
        >
          + Crear Link de Pago
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white">
          <h2 class="text-lg font-semibold">Total Cobrado</h2>
          <p class="text-3xl font-bold mt-2">{{ formatCurrency(totalCollected) }}</p>
        </div>
        <div class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white">
          <h2 class="text-lg font-semibold">Links Activos</h2>
          <p class="text-3xl font-bold mt-2">{{ activeLinks }}</p>
        </div>
        <div class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white">
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
            placeholder="Buscar por título o descripción..."
            class="border border-gray-300 rounded-lg p-2 w-64 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <table class="w-full text-left min-w-[900px]">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="p-3 font-semibold text-gray-600 cursor-pointer hover:bg-gray-50" @click="sortBy('title')">Título ↓↑</th>
              <th class="p-3 font-semibold text-gray-600">Descripción</th>
              <th class="p-3 font-semibold text-gray-600 text-right cursor-pointer hover:bg-gray-50" @click="sortBy('price')">Monto ↓↑</th>
              <th class="p-3 font-semibold text-gray-600">Fecha Creación</th>
              <th class="p-3 font-semibold text-gray-600 text-center">Estado</th>
              <th class="p-3 font-semibold text-gray-600 text-center">Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="sortedLinks.length === 0">
              <td colspan="6" class="p-3 text-center text-gray-500">No se encontraron links de pago.</td>
            </tr>
            <tr v-for="link in sortedLinks" :key="link.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="p-3">{{ link.title }}</td>
              <td class="p-3 truncate max-w-xs">{{ link.description || '-' }}</td>
              <td class="p-3 text-right">{{ formatCurrency(link.price) }}</td>
              <td class="p-3 text-sm text-gray-500">{{ link.creationDate }}</td>
              <td class="p-3 text-center">
                <span
                  :class="{
                    'text-green-600': link.status === 'Pagado',
                    'text-yellow-600': link.status === 'Pendiente',
                    'text-red-600': link.status === 'Expirado'
                  }"
                >
                  {{ link.status }}
                </span>
              </td>
              <td class="p-3 text-center flex items-center justify-center space-x-2">
                <button
                  class="text-blue-600 hover:underline font-medium"
                >
                  Ver Link
                </button>
                <button
                  class="bg-[#5D8C39] hover:bg-[#4A7030] text-white p-2 rounded-full"
                  title="Compartir Link"
                >
                  <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal for creating new payment link -->
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
          <h3 id="modal-title" class="text-2xl font-semibold mb-6 text-gray-800">Crear Nuevo Link de Pago</h3>
          <AddPaymentLinkForm @submit="handleAddLink" @cancel="showAddLinkModal = false" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BarraLateral from '../BarraLateral.vue';
import AddPaymentLinkForm from './formularioDeCobro.vue';
import { defineComponent, ref, computed } from 'vue';

const formatCurrency = (value) => {
  if (typeof value !== 'number') return '$0.00';
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

export default defineComponent({
  name: 'CobrosDashboard',
  components: { 
    BarraLateral, 
    AddPaymentLinkForm 
  },
  setup() {
    const activeButton = ref('CobroDeServicios');
    const searchQuery = ref('');
    const showAddLinkModal = ref(false);
    const sortKey = ref('');
    const sortOrder = ref('asc');

    const paymentLinks = ref([
      {
        id: 1,
        title: 'Consultoría de Negocios',
        description: 'Sesión de 2 horas sobre estrategia empresarial',
        price: 50000,
        creationDate: '15 Ene 2025',
        status: 'Pagado',
      },
      {
        id: 2,
        title: 'Mantenimiento Web',
        description: 'Actualización mensual del sitio web',
        price: 25000,
        creationDate: '20 Feb 2025',
        status: 'Pendiente',
      },
      {
        id: 3,
        title: 'Desarrollo de App',
        description: 'Desarrollo de aplicación móvil personalizada',
        price: 100000,
        creationDate: '10 Mar 2025',
        status: 'Expirado',
      },
      {
        id: 4,
        title: 'Capacitación Personal',
        description: '',
        price: 35000,
        creationDate: '05 Abr 2025',
        status: 'Pagado',
      },
    ]);

    const handleAddLink = (newLink) => {
      const newId = Math.max(...paymentLinks.value.map(l => l.id), 0) + 1;
      const date = new Date();
      const formattedDate = date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
      paymentLinks.value.push({
        id: newId,
        ...newLink,
        creationDate: formattedDate,
        status: 'Pendiente',
      });
      showAddLinkModal.value = false;
    };

    const totalCollected = computed(() => {
      return paymentLinks.value
        .filter(l => l.status === 'Pagado')
        .reduce((sum, l) => sum + l.price, 0);
    });

    const activeLinks = computed(() => {
      return paymentLinks.value.filter(l => l.status === 'Pendiente').length;
    });

    const totalLinks = computed(() => {
      return paymentLinks.value.length;
    });

    const filteredLinks = computed(() => {
      if (!searchQuery.value) {
        return paymentLinks.value;
      }
      const lowerQuery = searchQuery.value.toLowerCase();
      return paymentLinks.value.filter(link =>
        link.title.toLowerCase().includes(lowerQuery) ||
        (link.description && link.description.toLowerCase().includes(lowerQuery))
      );
    });

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
      }
    };

    const sortedLinks = computed(() => {
      if (!sortKey.value) return filteredLinks.value;
      return [...filteredLinks.value].sort((a, b) => {
        let valA = a[sortKey.value];
        let valB = b[sortKey.value];
        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
      });
    });

    return {
      activeButton,
      searchQuery,
      sortedLinks,
      totalCollected,
      activeLinks,
      totalLinks,
      sortBy,
      formatCurrency,
      showAddLinkModal,
      handleAddLink,
    };
  },
});
</script>