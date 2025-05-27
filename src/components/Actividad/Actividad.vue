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
          <h2 class="text-lg font-semibold">Ingresos</h2>
          <p class="text-3xl font-bold mt-2">
            {{ formatCurrency(income) || 0 }}
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
                <!---<th class="p-3 font-semibold text-gray-600">Fecha</th>-->
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
                class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                @click="verDetalle(payment)"
              >
                <td class="p-3">
                  <span v-if="payment.payer?.id === userId">
                    {{ payment.receiver?.firstName }} {{ payment.receiver?.lastName }}
                  </span>
                  <span v-else>
                    {{ payment.payer?.firstName }} {{ payment.payer?.lastName }}
                  </span>
                </td>
                <td class="p-3">
                  {{ payment.method === "ACCOUNT" ? "Transferencia Bancaria" : "Pago con Tarjeta" }}
                </td>
                <td
                  :class="payment.receiver?.id === userId ? 'text-green-600' : 'text-red-500'"
                  class="p-3 text-right"
                >
                  {{ formatCurrency(Math.abs(payment.amount)) }}
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

    <!-- Modal de Detalle de Transacción -->
    <div
      v-if="showDetalle"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          @click="showDetalle = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >&times;</button>
        <h3 class="text-xl font-bold mb-4">Detalle de la Transacción</h3>
        <div v-if="detalleSeleccionado">
          <p><strong>Nombre:</strong> {{ detalleSeleccionado.payer?.firstName }} {{ detalleSeleccionado.payer?.lastName }}</p>
          <p><strong>Monto:</strong> {{ formatCurrency(detalleSeleccionado.amount) }}</p>
          <p><strong>Tipo:</strong> {{ detalleSeleccionado.method === "ACCOUNT" ? "Transferencia Bancaria" : "Pago con Tarjeta" }}</p>
          <p><strong>CBU/CVU:</strong> {{ detalleSeleccionado.cvu || '-' }}</p>
          <p><strong>ID de transacción:</strong> {{ detalleSeleccionado.id }}</p>
          <p><strong>UUID:</strong>{{ detalleSeleccionado.uuid }}</p>
          <!-- Agrega aquí más campos si tu objeto payment los tiene -->
        </div>
      </div>
    </div>
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

    const userId = computed(() => accountStore.account?.id);
    

    // Estado y función para el detalle de la transacción
    const showDetalle = ref(false);
    const detalleSeleccionado = ref(null);

    // Traer el saldo principal desde el store de cuenta
    const mainAccountBalance = computed(() => {
      if (!accountStore.account || typeof accountStore.account.balance === "undefined") {
        return 0;
      }
      return accountStore.account.balance;
    });

   const gastosPorDestinatario = computed(() => {
      const map = {};
      cobrosStore.pagos.forEach(pago => {
        // Solo egresos: el usuario es el payer
        if (pago.payer?.id === userId.value) {
          // Usar el nombre completo del destinatario (receiver)
          const destinatario = ((pago.receiver?.firstName || "") + " " + (pago.receiver?.lastName || "")).trim() || "Desconocido";
          if (!map[destinatario]) map[destinatario] = 0;
          if (typeof pago.amount === "number") map[destinatario] += pago.amount;
        }
      });
      return map;
    });

    function getColors(count) {
      const palette = [
        "#5D8C39", "#CBFBA6", "#243219", "#A3E635", "#84CC16", "#FACC15", "#F87171", "#60A5FA", "#A78BFA", "#F472B6"
      ];
      // Si hay más destinatarios que colores, repetir la paleta
      return Array.from({length: count}, (_, i) => palette[i % palette.length]);
    }

    const chartData = computed(() => {
      const labels = Object.keys(gastosPorDestinatario.value);
      const data = Object.values(gastosPorDestinatario.value);
      return {
        labels: labels.length ? labels : ["Sin datos"],
        datasets: [
          {
            data: data.length ? data : [1],
            backgroundColor: getColors(labels.length || 1),
            hoverOffset: 4,
          },
        ],
      };
    });

    // Cargar la cuenta y los pagos al montar
    onMounted(() => {
      accountStore.getCurrentAccount();
      cobrosStore.fetchPagos();
    });

    const filteredTransactions = computed(() => {
      const pagosValidos = cobrosStore.pagos.filter(p => p && typeof p.amount === "number");
      if (!searchQuery.value) return pagosValidos;
      return pagosValidos.filter(payment => {
        const payerName = ((payment.payer?.firstName || "") + " " + (payment.payer?.lastName || "")).toLowerCase();
        const receiverName = ((payment.receiver?.firstName || "") + " " + (payment.receiver?.lastName || "")).toLowerCase();
        return payerName.includes(searchQuery.value.toLowerCase()) ||
              receiverName.includes(searchQuery.value.toLowerCase());
      });
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
      const safeValue = typeof value === "number" && !isNaN(value) ? value : 0;
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(safeValue);
    };

    function verDetalle(payment) {
      detalleSeleccionado.value = payment;
      showDetalle.value = true;
    }

    const expenses = computed(() => {
      return cobrosStore.pagos.reduce((total, pago) => {
        // Solo suma si el usuario es el payer (envió el pago)
        if (pago.payer?.id === userId.value && typeof pago.amount === "number") {
          return total + pago.amount;
        }
        return total;
      }, 0);
    });

    const income = computed(() => {
      const total = cobrosStore.pagos.reduce((total, pago) => {
        if (
          pago &&
          pago.receiver &&
          pago.receiver.id === userId.value &&
          typeof pago.amount === "number" &&
          !isNaN(pago.amount)
        ) {
          return total + pago.amount;
        }
        return total;
      }, 0);
      return isNaN(total) ? 0 : total;
    });

    return {
      activeButton,
      searchQuery,
      filteredTransactions,
      chartOptions,
      chartData,
      userId,
      mainAccountBalance,
      expenses, 
      formatCurrency,
      showDetalle,            
      detalleSeleccionado,    
      verDetalle,       
      income,      
    };
  },
});
</script>