<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />
    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Inversiones</h1>
        </div>
        <button
          @click="showAddInvestmentModal = true"
          class="bg-[#5D8C39] hover:bg-[#4A7030] text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
        >
          + Agregar Inversión
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Cambiado: Muestra la cantidad invertida desde account -->
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Cantidad Invertida</h2>
          <p class="text-3xl font-bold mt-2">
            {{ formatCurrency(activeInvestments) }}
          </p>
        </div>
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Tasa diaria</h2>
          <p class="text-3xl font-bold mt-2">
            {{ formatPercentage(dailyRate) }}
          </p>
        </div>
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Retorno diario</h2>
          <p class="text-3xl font-bold mt-2">
            {{ dailyReturns !== null ? formatCurrency(dailyReturns) : '-' }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          class="lg:col-span-2 bg-white p-4 rounded-lg shadow-lg overflow-x-auto h-full"
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-700">Mis Inversiones</h2>
          </div>
          <table class="w-full text-left min-w-[600px]">
            <thead>
              <tr class="border-b border-gray-200">
                <th
                  class="p-3 font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                  @click="sortBy('name')"
                >
                  Activo ↓↑
                </th>
                <!-- Columna Tipo eliminada -->
                <th class="p-3 font-semibold text-gray-600 text-right">
                  Cantidad
                </th>
                <th class="p-3 font-semibold text-gray-600 text-right">
                  Precio Compra
                </th>
                <th
                  class="p-3 font-semibold text-gray-600 text-right cursor-pointer hover:bg-gray-50 transition-colors"
                  @click="sortBy('currentValueTotal')"
                >
                  Valor Actual ↓↑
                </th>
                <th class="p-3 font-semibold text-gray-600 text-right">
                  G/P No Realizada
                </th>
                <th
                  class="p-3 font-semibold text-gray-600 text-right cursor-pointer hover:bg-gray-50 transition-colors"
                  @click="sortBy('performance')"
                >
                  Rendimiento (%) ↓↑
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="sortedInvestments.length === 0">
                <td colspan="6" class="p-3 text-center text-gray-500">
                  No se encontraron inversiones.
                </td>
              </tr>
              <tr
                v-for="investment in sortedInvestments"
                :key="investment.id"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                @click="openRescueModal(investment)"
              >
                <td class="p-3">{{ investment.name }}</td>
                <!-- Celda Tipo eliminada -->
                <td class="p-3 text-right">
                  {{ investment.quantity.toLocaleString() }}
                </td>
                <td class="p-3 text-right">
                  {{ formatCurrency(investment.purchasePricePerUnit) }}
                </td>
                <td class="p-3 font-medium text-right">
                  {{ formatCurrency(investment.currentValueTotal) }}
                </td>
                <td
                  class="p-3 text-right"
                  :class="
                    investment.unrealizedGainLoss >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  {{ formatCurrency(investment.unrealizedGainLoss) }}
                </td>
                <td
                  :class="[
                    'p-3 font-medium text-right transition-colors',
                    investment.performance >= 0
                      ? 'text-green-500'
                      : 'text-red-500',
                  ]"
                >
                  {{ formatPercentage(investment.performance) }}
                </td>
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

      <div
        v-if="showAddInvestmentModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
        @click.self="showAddInvestmentModal = false"
        @keydown.esc="showAddInvestmentModal = false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h3
            id="modal-title"
            class="text-2xl font-semibold mb-6 text-gray-800"
          >
            Agregar Nueva Inversión
          </h3>
          <AddInvestmentForm
            @success="onInvestmentAdded"
            @cancel="showAddInvestmentModal = false"
          />
        </div>
      </div>

      <!-- Modal de Rescate -->
      <div
        v-if="showRescueModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
        @click.self="showRescueModal = false"
        @keydown.esc="showRescueModal = false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="rescue-modal-title"
      >
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h3
            id="rescue-modal-title"
            class="text-2xl font-semibold mb-6 text-gray-800"
          >
            Rescatar Inversión
          </h3>
          <div class="mb-6">
            <p class="text-gray-600 mb-2">
              ¿Estás seguro que deseas rescatar la siguiente inversión?
            </p>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold">{{ selectedInvestment?.name }}</p>
              <p class="text-sm text-gray-600">
                Valor actual:
                {{ formatCurrency(selectedInvestment?.currentValueTotal) }}
              </p>
            </div>
          </div>
          <div class="flex justify-between space-x-4">
            <button
              @click="showRescueModal = false"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="handleRescueInvestment"
              class="bg-[#5D8C39] hover:bg-[#5D8C39]/80 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Confirmar Rescate
            </button>
          </div>
        </div>
      </div>

      <transition
        enter-active-class="transition-opacity duration-500"
        leave-active-class="transition-opacity duration-500"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showToast"
          class="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center"
        >
          <span>{{ toastMessage }}</span>
          <button
            @click="showToast = false"
            class="ml-4 text-white hover:text-gray-200 text-xl leading-none"
          >
            ×
          </button>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
import BarraLateral from "../BarraLateral.vue";
import AddInvestmentForm from "./FormularioAgregarInversion.vue";
import { defineComponent, ref, computed, onMounted } from "vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useInvestmentStore } from "../store/investmentStore.js";
import { useAccountStore } from "../store/accountStore.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const formatCurrency = (value) => {
  if (typeof value !== "number") return "$0.00";
  return value.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
};

const formatPercentage = (value) => {
  if (typeof value !== "number") return "0.00%";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export default defineComponent({
  name: "InversionesDashboard",
  components: { BarraLateral, Pie, AddInvestmentForm },
  setup() {
    const activeButton = ref("inversiones");
    const searchQuery = ref("");
    const showAddInvestmentModal = ref(false);
    const showToast = ref(false);
    const toastMessage = ref("");
    const sortKey = ref("");
    const sortOrder = ref("asc");
    const showRescueModal = ref(false);
    const selectedInvestment = ref(null);

    const investmentStore = useInvestmentStore();
    const accountStore = useAccountStore();

    onMounted(() => {
      investmentStore.fetchInvestments();
      accountStore.getCurrentAccount();
    });

    const processedInvestments = computed(() => {
      return investmentStore.investments.map((inv) => {
        const name = inv.assetName || inv.name || "";
        const purchasePricePerUnit = inv.unitPrice ?? inv.purchasePricePerUnit ?? 0;
        const currentValuePerUnit = inv.currentValuePerUnit ?? purchasePricePerUnit;
        const costTotal = inv.quantity * purchasePricePerUnit;
        const currentValueTotal = inv.quantity * currentValuePerUnit;
        const performance =
          purchasePricePerUnit === 0
            ? 0
            : ((currentValuePerUnit - purchasePricePerUnit) / purchasePricePerUnit) * 100;
        const unrealizedGainLoss = currentValueTotal - costTotal;
        return {
          ...inv,
          name,
          purchasePricePerUnit,
          currentValuePerUnit,
          costTotal,
          currentValueTotal,
          performance,
          unrealizedGainLoss,
        };
      });
    });

    const totalPortfolioValue = computed(() =>
      processedInvestments.value.reduce((sum, inv) => sum + inv.currentValueTotal, 0)
    );

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
      return processedInvestments.value.filter((investment) =>
        investment.name.toLowerCase().includes(lowerQuery)
      );
    });

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortKey.value = key;
        sortOrder.value = "asc";
      }
    };

    const sortedInvestments = computed(() => {
      if (!sortKey.value) return filteredInvestments.value;
      return [...filteredInvestments.value].sort((a, b) => {
        let valA = a[sortKey.value];
        let valB = b[sortKey.value];
        if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
        return 0;
      });
    }); 

    const activeInvestments = computed(() => {
      if (!accountStore.account || typeof accountStore.account.invested === "undefined") {
        return 0;
      }
      return accountStore.account.invested;
    });

    const dailyRate = computed(() => {
      if (!accountStore.account || typeof accountStore.account.dailyRate === "undefined") {
        return 0;
      }
      return accountStore.account.dailyRate;
    });

    const dailyReturns = computed(() => {
      if (!accountStore.account || typeof accountStore.account.dailyReturns === "undefined") {
        return 0;
      }
      return accountStore.account.dailyReturns;
    });

    const dynamicChartData = computed(() => {
      const distribution = {};
      processedInvestments.value.forEach((inv) => {
        distribution[inv.name] = inv.currentValueTotal;
      });
      const labels = Object.keys(distribution);
      const data = Object.values(distribution);
      const backgroundColors = [
        "#354a2f",
        "#558B2F",
        "#8FBC8F",
        "#B3DDA1",
        "#6B8E23",
        "#A1C9A0",
        "#2E8B57",
        "#3CB371",
        "#90EE90",
        "#C1E1C1",
      ];
      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: labels.map((_, i) => backgroundColors[i % backgroundColors.length]),
            hoverOffset: 4,
          },
        ],
      };
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          text: "Distribución del Portafolio por Activo",
          padding: { bottom: 20 },
          color: "#374151",
          font: { size: 18, weight: "600" },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed !== null) {
                label +=
                  formatCurrency(context.parsed) +
                  ` (${((context.parsed / totalPortfolioValue.value) * 100).toFixed(2)}%)`;
              }
              return label;
            },
          },
        },
      },
    });

    // Solo muestra inversiones, no agrega
    // El formulario se encarga de agregar y emite @success

    const openRescueModal = (investment) => {
      selectedInvestment.value = investment;
      showRescueModal.value = true;
    };

    const handleRescueInvestment = async () => {
      if (selectedInvestment.value) {
        await investmentStore.divest({ id: selectedInvestment.value.id });
        await investmentStore.fetchInvestments();
        await accountStore.getCurrentAccount();
        showRescueModal.value = false;
        selectedInvestment.value = null;
        toastMessage.value = "Inversión rescatada con éxito!";
        showToast.value = true;
        setTimeout(() => {
          showToast.value = false;
        }, 3000);
      }
    };

    // Nuevo: manejar el evento de éxito del formulario
    const onInvestmentAdded = async () => {
      await investmentStore.fetchInvestments();
      await accountStore.getCurrentAccount();
      showAddInvestmentModal.value = false;
      toastMessage.value = "Inversión agregada con éxito!";
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    return {
      activeButton,
      searchQuery,
      sortedInvestments,
      dynamicChartData,
      chartOptions,
      totalPortfolioValue,
      overallPerformance,
      topPerformingAsset,
      sortBy,
      formatCurrency,
      formatPercentage,
      showAddInvestmentModal,
      showToast,
      toastMessage,
      showRescueModal,
      selectedInvestment,
      openRescueModal,
      handleRescueInvestment,
      onInvestmentAdded,
      accountStore,
      activeInvestments,
      dailyRate,
      dailyReturns,
    };
  },
});
</script>