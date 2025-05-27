<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />

    <main class="flex-1 p-6 bg-gray-100 overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="w-[calc(100%+8rem)] md:h-[calc(100vh-36rem)]">
          <div
            class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-4 rounded-lg shadow-md text-center text-white relative h-44 flex items-center"
          >
            <button
              class="absolute top-4 right-4 text-white bg-[#5D8C39] font-semibold px-4 py-1 rounded-md shadow hover:bg-[#5D8C39]/80 transition-colors text-sm"
              @click="showCvuPopup = true"
            >
              Tu CVU
            </button>
            <div class="flex-1 relative">
              <h2 class="text-2xl font-bold text-left">Saldo</h2>
              <div class="flex items-center mt-4">
                <p class="text-3xl font-bold text-left">
                  {{ formattedAccountBalance }}
                </p>
                <button
                  class="ml-2 bg-[#3C4F2E]/80 p-2 rounded-full shadow-md hover:bg-[#3C4F2E]/20"
                  @click="toggleSaldoVisibility"
                  style="position: static"
                >
                  <img
                    :src="
                      isSaldoVisible
                        ? '/images/visibilityOn.png'
                        : '/images/visibilityOff.png'
                    "
                    alt="Ver saldo"
                    class="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-4 gap-4">
            <button
              @click="showIngresarDineroModal = true"
              class="text-white font-bold py-3 px-6 rounded-lg shadow-md bg-[#5D8C39] hover:bg-[#5D8C39]/60 transition-colors w-[calc(50%-0.5rem)] flex items-center justify-center"
            >
              Ingresar Dinero
            </button>
            <button
              @click="openPaymentFlow"
              class="text-white font-bold py-3 px-6 rounded-lg shadow-md bg-[#5D8C39] hover:bg-[#5D8C39]/60 transition-colors w-[calc(50%-0.5rem)] flex items-center justify-center"
            >
              Pagar Servicio
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="w-full md:col-span-2 overflow-hidden">
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-md flex flex-col col-span-1 overflow-hidden mt-6 md:mt-0 w-auto md:-ml-16 md:w-[calc(100%+27rem)]"
          >
            <h2 class="text-2xl font-bold text-[#4B5563] text-left mb-2">
              Transferencias en la última semana
            </h2>
            <div class="h-48 flex items-center justify-center mt-auto">
              <canvas id="transfersChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3">
        <div
          class="bg-white p-4 rounded-lg shadow-md w-[calc(100%+7rem)] overflow-hidden mb-4"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-700">
              Últimas Transacciones
            </h2>
          </div>
          <ul class="mt-4 flex flex-col gap-4">
            <li
              v-for="transaction in ultimasTransferencias"
              :key="transaction.id"
              class="flex justify-between items-center border-b pb-2"
            >
              <div class="flex items-center gap-4">
                <img
                  :src="
                    transaction.method === 'ACCOUNT'
                      ? '/images/transfer.png'
                      : '/images/card.png'
                  "
                  alt="icono"
                  class="w-10 h-10 object-contain flex-shrink-0"
                  style="display: inline-block"
                />
                <span class="text-gray-700">
                  {{
                    userId === transaction.payer?.id
                      ? "Enviada a"
                      : "Recibida de"
                  }}
                  {{
                    userId === transaction.payer?.id
                      ? transaction.receiver?.firstName +
                        " " +
                        transaction.receiver?.lastName
                      : transaction.payer?.firstName +
                        " " +
                        transaction.payer?.lastName
                  }}
                </span>
              </div>
              <div class="text-right">
                <span
                  :class="
                    userId === transaction.payer?.id
                      ? 'text-red-500'
                      : 'text-green-500'
                  "
                  class="block"
                >
                 ${{
                    Math.abs(transaction.amount).toFixed(2)
                  }}
                </span>
                <span class="text-gray-400 text-sm">
                  {{
                    transaction.date
                      ? new Date(transaction.date).toLocaleDateString("es-AR")
                      : ""
                  }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="p-4 rounded-lg flex flex-col justify-between col-span-2 overflow-hidden mt-6 mr-4 ml-48"
        >
          <div
            class="bg-[#3C4F2E] text-white p-4 rounded-2xl flex justify-between items-center mb-4"
          >
            <h2 class="text-lg font-bold">Inversiones Activas</h2>
          </div>
          <div
            class="bg-white p-6 rounded-lg shadow-md w-full justify-center mx-auto"
          >
            <ul class="mt-4 flex flex-col gap-2">
              <li
                v-for="investment in paginaPrincipalStore.investments"
                :key="investment.name"
                class="flex justify-between items-center border-b pb-2"
              >
                <span class="text-gray-700 font-bold">{{
                  investment.name
                }}</span>
                <span class="text-gray-900 font-semibold"
                  >${{ investment.amount.toFixed(2) }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    <div
      v-if="showPayServiceForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closePaymentFlow"
    >
      <IngresarLinkPago
        v-if="currentStep === 1"
        @submit-link="currentStep = 2"
        @cancel="closePaymentFlow"
        @click.stop=""
      />

      <SeleccionarMetodoPago
        v-else-if="currentStep === 2"
        @proceed-to-confirmation="currentStep = 3"
        @go-to-step-1="currentStep = 1"
        @click.stop=""
      />

      <ConfirmacionPago
        v-else-if="currentStep === 3"
        @confirm="handlePaymentConfirmation"
        @go-to-step-2="currentStep = 2"
        @click.stop=""
      />

      <ComprobantePago
        v-else-if="currentStep === 4"
        @make-another-payment="restartPaymentFlow"
        @return-to-home="closePaymentFlow"
        @click.stop=""
      />
    </div>

    <IngresarDinero
      v-if="showIngresarDineroModal"
      :is-open="showIngresarDineroModal"
      @close="showIngresarDineroModal = false"
    />
    <CvuPopup v-if="showCvuPopup" @close="showCvuPopup = false" />
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";
import { usePaginaPrincipalStore } from "../store/PaginaPrincipalStore.js";
import { useAccountStore } from "../store/accountStore.js";
import { useCobrosStore } from "../store/CobrosStore.js";
import BarraLateral from "../BarraLateral.vue";
import IngresarLinkPago from "../PagoServicios/PagoServicio.vue";
import SeleccionarMetodoPago from "../PagoServicios/MetodoDePago.vue";
import ConfirmacionPago from "../PagoServicios/ConfirmacionDePago.vue";
import ComprobantePago from "../PagoServicios/ComprobantePago.vue";
import CvuPopup from "../Inicio/CVU.vue";
import IngresarDinero from "../Inicio/IngresarDinero.vue";
import Chart from "chart.js/auto";

export default defineComponent({
  name: "PaginaPrincipal",
  components: {
    BarraLateral,
    IngresarLinkPago,
    SeleccionarMetodoPago,
    ConfirmacionPago,
    ComprobantePago,
    CvuPopup,
    IngresarDinero,
  },
  setup() {
    const linkDePagoStore = useLinkDePagoStore();
    const paginaPrincipalStore = usePaginaPrincipalStore();
    const accountStore = useAccountStore();
    const cobrosStore = useCobrosStore();
    const activeButton = ref("inicio");
    const showPayServiceForm = ref(false);
    const currentStep = ref(1);
    const showCvuPopup = ref(false);
    const showIngresarDineroModal = ref(false);
    const isSaldoVisible = ref(true);
    let chartInstance = null; 

    function toggleSaldoVisibility() {
      isSaldoVisible.value = !isSaldoVisible.value;
    }

    const formattedAccountBalance = computed(() => {
      if (!isSaldoVisible.value) return "••••••";
      if (
        !accountStore.account ||
        typeof accountStore.account.balance === "undefined"
      ) {
        return "Cargando...";
      }
      return `$${Number(accountStore.account.balance).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    });

    const userId = computed(() => accountStore.account?.id);

    const lastSevenDaysData = computed(() => {
      const days = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const formattedDate = date.toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
        });

        const transfersForDay = cobrosStore.pagos.filter((payment) => {
          if (!payment.metadata?.transferDate || !userId.value) return false;
          const transferDate = new Date(payment.metadata.transferDate);
          transferDate.setHours(0, 0, 0, 0);
          const isSameDay = transferDate.getTime() === date.getTime();
          const isOutgoing = payment.payer?.id === userId.value;
        
          return isSameDay && isOutgoing;
        });

        const totalAmount = transfersForDay.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );

        days.push({
          date: date.toISOString(),
          formattedDate,
          amount: totalAmount,
        });
      }
      return days;
    });

    const ultimasTransferencias = computed(() => {
      const transfers = cobrosStore.pagos
        .filter((payment) => payment.metadata?.transferDate)
        .slice()
        .sort((a, b) => new Date(b.metadata.transferDate) - new Date(a.metadata.transferDate))
        .slice(0, 5)
        .map((tx) => ({
          ...tx,
          date: tx.metadata.transferDate,
          tipo: userId.value === tx.payer?.id ? "saliente" : "entrante",
        }));
      return transfers;
    });

    // Initialize or update Chart.js
    const updateChart = () => {
      const ctx = document.getElementById("transfersChart")?.getContext("2d");
      if (!ctx) {
        console.error("Canvas context not found for transfersChart");
        return;
      }

      if (chartInstance) {
        chartInstance.destroy(); // Destroy existing chart to prevent memory leaks
      }

      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: lastSevenDaysData.value.map((item) => item.formattedDate),
          datasets: [
            {
              label: "Transferencias Enviadas ($)",
              data: lastSevenDaysData.value.map((item) => item.amount),
              backgroundColor: "#5D8C39",
              borderColor: "#3C4F2E",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Monto ($)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Fecha",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    };

    onMounted(() => {
      accountStore.getCurrentAccount();
      cobrosStore.fetchTransfers().then(() => {
        updateChart(); 
      });
    });

    watch(lastSevenDaysData, () => {
      updateChart();
    });

    const openPaymentFlow = () => {
      linkDePagoStore.resetPayment(); 
      currentStep.value = 1; 
      showPayServiceForm.value = true; 
    };

    const handlePaymentConfirmation = () => {
      currentStep.value = 4; 


      accountStore.getCurrentAccount();

    };

    const restartPaymentFlow = () => {
      linkDePagoStore.resetPayment();
      currentStep.value = 1;
    };

    const closePaymentFlow = () => {
      showPayServiceForm.value = false;
      currentStep.value = 1;
      linkDePagoStore.resetPayment();
      accountStore.getCurrentAccount();
    };

   

    return {
      activeButton,
      showPayServiceForm,
      currentStep,
      linkDePagoStore,
      paginaPrincipalStore,
      handlePaymentConfirmation,
      restartPaymentFlow,
      closePaymentFlow,
      openPaymentFlow,
      showCvuPopup,
      showIngresarDineroModal,
      formattedAccountBalance,
      isSaldoVisible,
      toggleSaldoVisibility,
      ultimasTransferencias,
      userId,
      lastSevenDaysData,
    };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>