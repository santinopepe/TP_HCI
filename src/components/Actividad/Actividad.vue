<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />

    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Actividad</h1>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar transacción por nombre..."
          class="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Saldo en Cuenta Principal</h2>
          <p class="text-3xl font-bold mt-2">
            {{ formatCurrency(mainAccountBalance) }}
          </p>
        </div>
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Inversiones Activas</h2>
          <p class="text-3xl font-bold mt-2">
            {{ formatCurrency(activeInvestments) }}
          </p>
        </div>
        <div
          class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-lg text-center text-white"
        >
          <h2 class="text-lg font-semibold">Gastos</h2>
          <p class="text-3xl font-bold mt-2">{{ formatCurrency(expenses) }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Últimas Transacciones -->
        <div
          class="lg:col-span-2 bg-white p-4 rounded-lg shadow-lg overflow-x-auto h-full"
        >
          <h2 class="text-lg font-semibold mb-4 text-gray-700">
            Últimas Transacciones
          </h2>
          <table class="w-full text-left min-w-[600px]">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="p-3 font-semibold text-gray-600">Nombre</th>
                <th class="p-3 font-semibold text-gray-600">Tipo</th>
                <th class="p-3 font-semibold text-gray-600">Fecha</th>
                <th class="p-3 font-semibold text-gray-600 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="4" class="p-3 text-center text-gray-500">
                  No se encontraron transacciones.
                </td>
              </tr>
              <tr
                v-for="payment in filteredTransactions"
                :key="payment.id"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="p-3">
                  {{ payment.payer?.firstName }} {{ payment.payer?.lastName }}
                </td>
                <td class="p-3">
                  {{ payment.method === "ACCOUNT" ? "Transferencia Bancaria" : "Pago con Tarjeta" }}
                </td>
                <td class="p-3 text-red-500 font-medium text-right">
                  {{ formatCurrency(payment.amount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Gráfico de Distribución -->
        <div class="bg-white p-4 rounded-lg shadow-lg flex flex-col h-full">
          <div class="relative h-full w-full">
            <Pie :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useCobrosStore } from "../store/CobrosStore.js";
import { useAccountStore } from "../store/accountStore.js";
import BarraLateral from "../BarraLateral.vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default defineComponent({
  name: "ActividadDashboard",
  components: {
    BarraLateral,
    Pie,
  },
  setup() {
    const cobrosStore = useCobrosStore();
    const accountStore = useAccountStore();
    const activeButton = ref("actividad");
    const searchQuery = ref("");

    // Traer el saldo principal desde el store de cuenta
    const mainAccountBalance = computed(() => {
      if (!accountStore.account || typeof accountStore.account.balance === "undefined") {
        return 0;
      }
      return accountStore.account.balance;
    });

    const chartData = computed(() => ({
      labels: ['Sin datos'],
      datasets: [
        {
          data: [1],
          backgroundColor: ['#e5e7eb'],
          hoverOffset: 4,
        },
      ],
    }));

    // Cargar la cuenta y los pagos al montar
    onMounted(() => {
      accountStore.getCurrentAccount();
      cobrosStore.fetchPagos();
    });

    // Filtro de búsqueda sobre pagos
    const filteredTransactions = computed(() => {
      const pagosValidos = cobrosStore.pagos.filter(p => p && typeof p.amount === "number");
      if (!searchQuery.value) return pagosValidos;
      return pagosValidos.filter(payment =>
        ((payment.payer?.firstName || "") + " " + (payment.payer?.lastName || ""))
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Distribución de Gastos",
          padding: {
            bottom: 20,
          },
          color: "#374151",
          font: {
            size: 18,
            weight: "600",
          },
        },
      },
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(value);
    };

    const activeInvestments = computed(() => {
      if (!accountStore.account || typeof accountStore.account.invested === "undefined") {
        return 0;
      }
      return accountStore.account.invested;
    });

    return {
      activeButton,
      searchQuery,
      filteredTransactions,
      chartOptions,
      chartData,
      mainAccountBalance,
      activeInvestments,
      expenses: accountStore.expenses, // o usa tu store de gastos
      formatCurrency,
    };
  },
});
</script>