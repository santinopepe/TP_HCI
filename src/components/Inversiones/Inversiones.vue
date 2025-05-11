<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />

    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Inversiones</h1>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar inversión por nombre o tipo..."
            class="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          @click="showAddInvestmentModal = true"
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
        >
          + Agregar Inversión
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white">
           <h2 class="text-lg font-semibold">Valor Total Portafolio</h2>
           <p class="text-3xl font-bold mt-2">{{ formatCurrency(totalPortfolioValue) }}</p>
         </div>
         <div class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white">
           <h2 class="text-lg font-semibold">Rendimiento Ponderado (YTD)</h2>
           <p class="text-3xl font-bold mt-2" :class="overallPerformance >= 0 ? 'text-green-300' : 'text-red-300'">
             {{ formatPercentage(overallPerformance) }}
           </p>
         </div>
         <div class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white">
           <h2 class="text-lg font-semibold">Activo Estrella</h2>
           <p v-if="topPerformingAsset" class="text-xl font-bold mt-2">
             {{ topPerformingAsset.name }} <span :class="topPerformingAsset.performance >= 0 ? 'text-green-300' : 'text-red-300'">({{ formatPercentage(topPerformingAsset.performance) }})</span>
           </p>
           <p v-else class="text-xl font-bold mt-2">-</p>
         </div>
      </div>

      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-lg overflow-x-auto h-full">
          <h2 class="text-lg font-semibold mb-4 text-gray-700">Mis Inversiones</h2>
          <table class="w-full text-left min-w-[900px]">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="p-3 font-semibold text-gray-600 cursor-pointer hover:bg-gray-50" @click="sortBy('name')">Activo ↓↑</th>
                <th class="p-3 font-semibold text-gray-600">Tipo</th>
                <th class="p-3 font-semibold text-gray-600 text-right">Cantidad</th>
                <th class="p-3 font-semibold text-gray-600 text-right">Precio Compra</th>
                <th class="p-3 font-semibold text-gray-600 text-right cursor-pointer hover:bg-gray-50" @click="sortBy('currentValueTotal')">Valor Actual ↓↑</th>
                <th class="p-3 font-semibold text-gray-600 text-right">G/P No Realizada</th>
                <th class="p-3 font-semibold text-gray-600 text-right cursor-pointer hover:bg-gray-50" @click="sortBy('performance')">Rendimiento (%) ↓↑</th>
                <th class="p-3 font-semibold text-gray-600">Fecha Adq.</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="sortedInvestments.length === 0">
                <td colspan="8" class="p-3 text-center text-gray-500">No se encontraron inversiones.</td>
              </tr>
              <tr v-for="investment in sortedInvestments" :key="investment.id" class="border-b border-gray-100 hover:bg-gray-50">
                <td class="p-3">{{ investment.name }}</td>
                <td class="p-3">{{ investment.type }}</td>
                <td class="p-3 text-right">{{ investment.quantity.toLocaleString() }}</td>
                <td class="p-3 text-right">{{ formatCurrency(investment.purchasePricePerUnit) }}</td>
                <td class="p-3 font-medium text-right">{{ formatCurrency(investment.currentValueTotal) }}</td>
                <td class="p-3 text-right" :class="investment.unrealizedGainLoss >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ formatCurrency(investment.unrealizedGainLoss) }}
                </td>
                <td 
                  :class="[
                    'p-3 font-medium text-right',
                    investment.performance >= 0 ? 'text-green-500' : 'text-red-500'
                  ]"
                >
                  {{ formatPercentage(investment.performance) }}
                </td>
                <td class="p-3 text-sm text-gray-500">{{ investment.acquisitionDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-lg flex flex-col h-full">
          <div class="relative h-full w-full">
            <Pie :data="dynamicChartData" :options="chartOptions" />
          </div>
        </div>
      </div> 

      <div v-if="showAddInvestmentModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" @click.self="showAddInvestmentModal = false">
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h3 class="text-2xl font-semibold mb-6 text-gray-800">Agregar Nueva Inversión</h3>
          <p class="text-gray-600 mb-4">Aquí iría el formulario para agregar una nueva inversión.</p>
          <div class="flex justify-end">
            <button @click="showAddInvestmentModal = false" class="text-gray-600 hover:text-gray-800 font-medium mr-4">Cancelar</button>
            <button @click="handleAddInvestment" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import BarraLateral from '../BarraLateral.vue';
import { defineComponent, ref, computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Helper para formatear moneda
const formatCurrency = (value) => {
  if (typeof value !== 'number') return '$0.00';
  return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }); // Ajusta ARS a tu moneda
};

// Helper para formatear porcentaje
const formatPercentage = (value) => {
  if (typeof value !== 'number') return '0.00%';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};


export default defineComponent({
  name: 'InversionesDashboard',
  components: { BarraLateral, Pie },
  setup() {
    const activeButton = ref('inversiones');
    const searchQuery = ref('');
    const showAddInvestmentModal = ref(false);

    const sortKey = ref('');
    const sortOrder = ref('asc'); // 'asc' o 'desc'

    const investments = ref([
      // Agregamos purchasePricePerUnit y currentValuePerUnit para cálculos más claros
      { id: 1, name: 'Acciones Apple (AAPL)', type: 'Acciones EEUU', quantity: 50, purchasePricePerUnit: 150.00, currentValuePerUnit: 175.50, acquisitionDate: '15 Ene 2023' },
      { id: 2, name: 'Bonos Corp. (MGLO)', type: 'Bonos Corporativos', quantity: 100, purchasePricePerUnit: 980.00, currentValuePerUnit: 1020.00, acquisitionDate: '20 Feb 2023' },
      { id: 3, name: 'Fondo Común "Beta Latam"', type: 'FCI Renta Variable', quantity: 250, purchasePricePerUnit: 100.00, currentValuePerUnit: 95.00, acquisitionDate: '10 Abr 2023' }, // Rendimiento negativo
      { id: 4, name: 'Ethereum (ETH)', type: 'Criptomonedas', quantity: 5, purchasePricePerUnit: 1800.00, currentValuePerUnit: 2100.00, acquisitionDate: '20 May 2023' },
      { id: 5, name: 'ETF S&P 500 (SPY)', type: 'ETFs', quantity: 30, purchasePricePerUnit: 400.00, currentValuePerUnit: 450.00, acquisitionDate: '05 Jun 2023' },
      { id: 6, name: 'Plazo Fijo Banco Z', type: 'Renta Fija', quantity: 1, purchasePricePerUnit: 50000.00, currentValuePerUnit: 52500.00, acquisitionDate: '01 Jul 2023' },
    ]);

    // Cálculos extendidos para cada inversión
    const processedInvestments = computed(() => {
      return investments.value.map(inv => {
        const costTotal = inv.quantity * inv.purchasePricePerUnit;
        const currentValueTotal = inv.quantity * inv.currentValuePerUnit;
        const performance = inv.purchasePricePerUnit === 0 ? 0 : ((inv.currentValuePerUnit - inv.purchasePricePerUnit) / inv.purchasePricePerUnit) * 100;
        const unrealizedGainLoss = currentValueTotal - costTotal;
        return {
          ...inv,
          costTotal,
          currentValueTotal,
          performance,
          unrealizedGainLoss,
        };
      });
    });

    const totalPortfolioValue = computed(() => {
      return processedInvestments.value.reduce((sum, inv) => sum + inv.currentValueTotal, 0);
    });

    const overallPerformance = computed(() => {
      const totalCost = processedInvestments.value.reduce((sum, inv) => sum + inv.costTotal, 0);
      if (totalCost === 0) return 0;
      const currentTotalValue = totalPortfolioValue.value;
      return ((currentTotalValue - totalCost) / totalCost) * 100;
    });

    const topPerformingAsset = computed(() => {
      if (processedInvestments.value.length === 0) return null;
      return [...processedInvestments.value].sort((a, b) => b.performance - a.performance)[0];
    });

    const filteredInvestments = computed(() => {
      if (!searchQuery.value) {
        return processedInvestments.value;
      }
      const lowerQuery = searchQuery.value.toLowerCase();
      return processedInvestments.value.filter(investment =>
        investment.name.toLowerCase().includes(lowerQuery) ||
        investment.type.toLowerCase().includes(lowerQuery)
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

    const sortedInvestments = computed(() => {
      if (!sortKey.value) return filteredInvestments.value;
      return [...filteredInvestments.value].sort((a, b) => {
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


    const dynamicChartData = computed(() => {
      const distribution = {};
      processedInvestments.value.forEach(inv => {
        distribution[inv.type] = (distribution[inv.type] || 0) + inv.currentValueTotal;
      });

      const labels = Object.keys(distribution);
      const data = Object.values(distribution);
      
      // Mantener colores consistentes si es posible, o generar nuevos
      const backgroundColors = [
        '#354a2f', '#558B2F', '#8FBC8F', '#B3DDA1', '#6B8E23', 
        '#A1C9A0', '#2E8B57', '#3CB371', '#90EE90', '#C1E1C1'
      ];

      return {
        labels,
        datasets: [{
          data,
          backgroundColor: labels.map((_, i) => backgroundColors[i % backgroundColors.length]),
          hoverOffset: 4,
        }],
      };
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: 'Distribución del Portafolio por Tipo de Activo',
          padding: { bottom: 20 },
          color: '#374151',
          font: { size: 18, weight: '600' },
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                label += formatCurrency(context.parsed) + ` (${((context.parsed / totalPortfolioValue.value) * 100).toFixed(2)}%)`;
              }
              return label;
            }
          }
        }
      },
    });

    const handleAddInvestment = () => {
      // Lógica para guardar la nueva inversión
      // Por ahora, solo cerramos el modal
      console.log("Guardar inversión...");
      showAddInvestmentModal.value = false;
    };

    return {
      activeButton,
      searchQuery,
      sortedInvestments, // Usar sortedInvestments en el template
      dynamicChartData,
      chartOptions,
      totalPortfolioValue,
      overallPerformance,
      topPerformingAsset,
      sortBy,
      formatCurrency,
      formatPercentage,
      showAddInvestmentModal,
      handleAddInvestment,
    };
  },
});
</script>

<style scoped>
/* Puedes añadir estilos específicos aquí si es necesario */
.cursor-pointer {
  cursor: pointer;
}
</style>