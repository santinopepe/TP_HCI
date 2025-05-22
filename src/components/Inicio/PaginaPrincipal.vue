<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />

    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="w-[calc(100%+8rem)] overflow-hidden">
          <div
            class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-md text-center text-white relative h-44 flex items-center"
          >
            <button
              class="absolute top-4 right-4 text-white bg-[#5D8C39] font-semibold px-4 py-1 rounded-md shadow hover:bg-[#5D8C39]/80 transition-colors text-sm"
              @click="showCvuPopup = true"
              >
              Tu CVU
            </button>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-left absolute top-4">Saldo</h2>
              <p class="text-3xl font-bold mt-4 text-left">
                {{ paginaPrincipalStore.formattedBalance }}
              </p>
              <button
                class="absolute bottom-[33%] left-[45%] bg-[#3C4F2E]/80 p-2 rounded-full shadow-md hover:bg-[#3C4F2E]/20"
                @click="paginaPrincipalStore.toggleSaldoVisibility"
              >
                <img
                  :src="
                    paginaPrincipalStore.isSaldoVisible
                      ? '/images/visibilityOn.png'
                      : '/images/visibilityOff.png'
                  "
                  alt="Ver saldo"
                  class="w-6 h-6"
                />
              </button>
            </div>
          </div>
          <div class="flex justify-center mt-4 gap-4">
            <router-link
              to="/ingresar-dinero"
              class="text-white font-bold py-3 px-6 rounded-lg shadow-md bg-[#5D8C39] hover:bg-[#5D8C39]/60 transition-colors w-[calc(50%-0.5rem)] flex items-center justify-center"
            >
              Ingresar Dinero
            </router-link>
            <button
              @click="showPayServiceForm = true"
              class="text-white font-bold py-3 px-6 rounded-lg shadow-md bg-[#5D8C39] hover:bg-[#5D8C39]/60 transition-colors w-[calc(50%-0.5rem)] flex items-center justify-center"
            >
              Pagar Servicio
            </button>
          </div>
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-md absolute right-4 w-[calc(100%-58rem)] h-[17rem] flex flex-col justify-end col-span-1 overflow-hidden"
        >
          <h2
            class="text-2xl font-bold text-[#4B5563] text-left absolute top-4 left-6"
          >
            Transferencias Mensuales
          </h2>
          <p
            class="absolute top-6 right-6 text-[#A5A2A1] font-semibold text-sm"
          >
            +${{ paginaPrincipalStore.monthlyTransferSummary.toFixed(2) }} /
            Último mes
          </p>
          <div class="h-48 flex items-end justify-center mt-auto">
            <div class="flex items-end gap-4 w-full justify-between px-4">
              <div
                v-for="item in paginaPrincipalStore.transferChartData"
                :key="item.month"
                class="flex flex-col items-center flex-1"
              >
                <div
                  :style="{
                    backgroundColor: item.color,
                    height: `${item.amount}px`,
                  }"
                  class="w-12 rounded"
                ></div>
                <span class="text-gray-500 text-sm mt-2">{{ item.month }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div
          class="bg-white p-6 rounded-lg shadow-md w-[calc(100%+8rem)] overflow-hidden"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-700">
              Últimas Transacciones
            </h2>
          </div>
          <ul class="mt-4 flex flex-col gap-4">
            <li
              v-for="transaction in paginaPrincipalStore.transactions"
              :key="transaction.id"
              class="flex justify-between items-center border-b pb-2"
            >
              <div class="flex items-center gap-4">
                <img
                  :src="transaction.icon"
                  :alt="transaction.name"
                  class="w-12 h-8"
                />
                <span class="text-gray-700">{{ transaction.name }}</span>
              </div>
              <div class="text-right">
                <span
                  :class="
                    transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                  "
                  class="block"
                >
                  {{ transaction.amount < 0 ? "" : "+" }}${{
                    Math.abs(transaction.amount).toFixed(2)
                  }}
                </span>
                <span class="text-gray-400 text-sm">{{
                  transaction.date
                }}</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="absolute bottom-[12%] right-4 w-[calc(100%-58rem)] promu">
          <div
            class="bg-[#3C4F2E] text-white p-4 rounded-2xl flex justify-between items-center"
          >
            <h2 class="text-lg font-bold">Inversiones Activas</h2>
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-md w-[84%] justify-center mx-auto"
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
        @submit-link="handleLinkSubmit"
        @cancel="closePaymentFlow"
        @click.stop=""
      />

      <SeleccionarMetodoPago
        v-if="currentStep === 2"
        @proceed-to-confirmation="handleMethodSelection"
        @cancel="closePaymentFlow"
        @click.stop=""
      />

      <ConfirmacionPago
        v-if="currentStep === 3"
        :amount="linkDePagoStore.amount"
        @confirm="handlePaymentConfirmation"
        @cancel="closePaymentFlow"
        @click.stop=""
      />

      <ComprobantePago
        v-if="currentStep === 4"
        :amount="linkDePagoStore.amount"
        @make-another-payment="restartPaymentFlow"
        @return-to-home="closePaymentFlow"
        @share-receipt="shareReceipt"
        @click.stop=""
      />
    </div>
    <CvuPopup v-if="showCvuPopup" 
      @close="showCvuPopup = false" 
      />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";
import { usePaginaPrincipalStore } from "../store/PaginaPrincipalStore.js"; // Import the renamed store
import BarraLateral from "../BarraLateral.vue";
import IngresarLinkPago from "../PagoServicios/PagoServicio.vue";
import SeleccionarMetodoPago from "../PagoServicios/MetodoDePago.vue";
import ConfirmacionPago from "../PagoServicios/ConfirmacionDePago.vue";
import ComprobantePago from "../PagoServicios/ComprobantePago.vue";
import CvuPopup from "../Inicio/CVU.vue"; 

export default defineComponent({
  name: "PaginaPrincipal",
  components: {
    BarraLateral,
    IngresarLinkPago,
    SeleccionarMetodoPago,
    ConfirmacionPago,
    ComprobantePago,
    CvuPopup,
  },
  setup() {
    const linkDePagoStore = useLinkDePagoStore();
    const paginaPrincipalStore = usePaginaPrincipalStore(); // Initialize the renamed store
    const activeButton = ref("inicio");
    const showPayServiceForm = ref(false);
    const currentStep = ref(1);
    const showCvuPopup = ref(false);

    const handleLinkSubmit = (link) => {
      linkDePagoStore.setPaymentLink(link);
      if (!linkDePagoStore.errors.paymentLink) {
        currentStep.value = 2;
      }
    };

    const handleMethodSelection = (details) => {
      linkDePagoStore.setPaymentMethod(details.metodo);
      if (details.card) {
        linkDePagoStore.tarjetas[linkDePagoStore.tarjetaSeleccionada] =
          details.card;
      }
      currentStep.value = 3;
    };

    const handlePaymentConfirmation = () => {
      linkDePagoStore.confirmPayment();
      // Update paginaPrincipalStore's balance and add transaction after payment confirmation
      paginaPrincipalStore.updateAccountBalance(linkDePagoStore.accountBalance);
      paginaPrincipalStore.addTransaction({
        id:
          Math.max(...paginaPrincipalStore.transactions.map((t) => t.id), 0) +
          1,
        name: "Pago de Servicio",
        type: "Pago",
        icon: "/images/sube.png", // Or a more generic icon for payments
        date: new Date().toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        amount: -linkDePagoStore.total,
      });
      currentStep.value = 4;
    };

    const restartPaymentFlow = () => {
      linkDePagoStore.resetPayment();
      currentStep.value = 1;
    };

    const closePaymentFlow = () => {
      showPayServiceForm.value = false;
      currentStep.value = 1;
      linkDePagoStore.resetPayment();
    };

    const shareReceipt = () => {
      console.log("Sharing receipt...");
      // Add logic for sharing receipt
    };

    return {
      activeButton,
      showPayServiceForm,
      currentStep,
      linkDePagoStore,
      paginaPrincipalStore, // Expose the new store to the template
      handleLinkSubmit,
      handleMethodSelection,
      handlePaymentConfirmation,
      restartPaymentFlow,
      closePaymentFlow,
      shareReceipt,
      showCvuPopup,
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
