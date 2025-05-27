<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <BarraLateral
      :active-button="activeButton"
      @update:activeButton="activeButton = $event"
    />

    <main class="flex-1 p-6 bg-gray-100 overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="w-[calc(100%+8rem)] md:h-[calc(100vh-36rem)] ">
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
                  style="position: static;"
                >
                  <img
                    :src="isSaldoVisible ? '/images/visibilityOn.png' : '/images/visibilityOff.png'"
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
            <!-- ...saldo y botones... -->
          </div>

          <!-- Transferencias Mensuales responsivo -->
          <div
            class="bg-white p-6 rounded-lg shadow-md flex flex-col col-span-1 overflow-hidden mt-6 md:mt-0 w-auto md:-ml-16 md:w-[calc(100%+27rem)]"
          >
            <h2
              class="text-2xl font-bold text-[#4B5563] text-left mb-2"
            >
              Transferencias Mensuales
            </h2>
            <p
              class="text-[#A5A2A1] font-semibold text-sm mb-4"
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
                :src="transaction.method === 'ACCOUNT' ? '/images/transfer.png' : '/images/card.png'"
                alt="icono"
                class="w-10 h-10 object-contain flex-shrink-0"
                style="display: inline-block;"
              />
                <span class="text-gray-700">
                  {{ userId === transaction.payer?.id ? 'Enviada a' : 'Recibida de' }}
                  {{ userId === transaction.payer?.id
                    ? (transaction.receiver?.firstName + ' ' + transaction.receiver?.lastName)
                    : (transaction.payer?.firstName + ' ' + transaction.payer?.lastName)
                  }}
                </span>
              </div>
              <div class="text-right">
                <span
                  :class="userId === transaction.payer?.id ? 'text-red-500' : 'text-green-500'"
                  class="block"
                >
                  {{ userId === transaction.payer?.id ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                </span>
                <span class="text-gray-400 text-sm">
                  {{ transaction.date ? new Date(transaction.date).toLocaleDateString("es-AR") : '' }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="p-4 rounded-lg flex flex-col justify-between col-span-2 overflow-hidden mt-6 mr-4 ml-48  "
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
        @share-receipt="shareReceipt"
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
import { defineComponent, ref, computed, onMounted } from "vue";
import { useLinkDePagoStore } from "../store/LinkDePagoStore.js";
import { usePaginaPrincipalStore } from "../store/PaginaPrincipalStore.js";
import { useAccountStore } from "../store/accountStore.js"; // Asegúrate de que esta ruta sea correcta
import BarraLateral from "../BarraLateral.vue";
import { useCobrosStore } from "../store/CobrosStore.js";

// Componentes de Pago de Servicios (ajusta las rutas si es necesario)
import IngresarLinkPago from "../PagoServicios/PagoServicio.vue";
import SeleccionarMetodoPago from "../PagoServicios/MetodoDePago.vue";
import ConfirmacionPago from "../PagoServicios/ConfirmacionDePago.vue";
import ComprobantePago from "../PagoServicios/ComprobantePago.vue"; // Usar el nombre de archivo consistente

import CvuPopup from "../Inicio/CVU.vue";
import IngresarDinero from "../Inicio/IngresarDinero.vue";

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

    // Control de visibilidad del saldo
    const isSaldoVisible = ref(true);
    function toggleSaldoVisibility() {
      isSaldoVisible.value = !isSaldoVisible.value;
    }

    // Sincronizar el balance con el store de cuenta
    const formattedAccountBalance = computed(() => {
      if (!isSaldoVisible.value) return "••••••";
      // Asegúrate de que `accountStore.account` y `accountStore.account.balance` existan.
      if (!accountStore.account || typeof accountStore.account.balance === "undefined") {
        return "Cargando..."; // O un valor predeterminado como "$0.00"
      }
      return `$${Number(accountStore.account.balance).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    });

    // Cargar la cuenta y los pagos al montar
    onMounted(() => {
      accountStore.getCurrentAccount();
      // Opcional: Cargar los datos de transacciones/inversiones aquí también si no se hacen en un router view
      // paginaPrincipalStore.fetchTransactions();
      // paginaPrincipalStore.fetchInvestments();
      // paginaPrincipalStore.fetchMonthlyTransferSummary();
    });

    const openPaymentFlow = () => {
      linkDePagoStore.resetPayment(); // Limpiar el estado del store de pago al iniciar un nuevo flujo
      currentStep.value = 1; // Volver al primer paso
      showPayServiceForm.value = true; // Mostrar el modal
    };

    // `handleLinkSubmit` ya no es necesario aquí, IngresarLinkPago.vue lo maneja internamente.
    // Simplemente avanzamos al siguiente paso cuando IngresarLinkPago emite `submit-link`.
    // const handleLinkSubmit = () => {
    //   currentStep.value = 2;
    // };

    // `handleMethodSelection` ya no es necesario aquí, SeleccionarMetodoPago.vue lo maneja internamente.
    // Simplemente avanzamos al siguiente paso cuando SeleccionarMetodoPago emite `proceed-to-confirmation`.
    // const handleMethodSelection = () => {
    //   currentStep.value = 3;
    // };

    const handlePaymentConfirmation = async () => {
      // La acción confirmPayment del store ya no necesita parámetros, toma la información del estado.
      const success = await linkDePagoStore.confirmPayment();
      if (success) {
        // Actualizar el saldo de la cuenta principal después de un pago exitoso
        // En un caso real, esto debería venir de una API que actualice el saldo.
        // Aquí actualizamos el accountStore si el linkDePagoStore.accountBalance se actualizó.
        // Asegúrate de que accountStore.updateAccountBalance acepte el nuevo saldo.
        accountStore.getCurrentAccount(); // Mejor: volver a obtener el saldo desde la API

        // Agregar la transacción a la lista de transacciones
        paginaPrincipalStore.addTransaction({
          id: Date.now(), // Un ID único simple, en producción usarías un ID del backend
          name: linkDePagoStore.serviceName, // Nombre del servicio pagado
          type: "Pago de Servicio",
          icon: "/images/payment_icon.png", // Icono genérico para pagos
          date: new Date().toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          amount: -linkDePagoStore.total, // El monto es negativo porque es una salida
        });
        currentStep.value = 4; // Avanzar al comprobante
      }
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

    const shareReceipt = () => {
      alert("Función de compartir comprobante no implementada aún.");
    };

    const userId = computed(() => accountStore.account?.id);


    const ultimasTransferencias = computed(() => {
  // Tomamos las 5 más recientes
  return cobrosStore.pagos
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map(tx => {
      // Si el usuario es el receiver, es entrante; si es el payer, es saliente
      let tipo = "entrante";
      if (userId.value === tx.payer?.id) tipo = "saliente";
      return { ...tx, tipo };
    });
});

    return {
      activeButton,
      showPayServiceForm,
      currentStep,
      linkDePagoStore,
      paginaPrincipalStore,
      handlePaymentConfirmation,
      restartPaymentFlow,
      closePaymentFlow,
      shareReceipt,
      openPaymentFlow, 
      showCvuPopup,
      showIngresarDineroModal,
      formattedAccountBalance,
      isSaldoVisible,
      toggleSaldoVisibility,
      ultimasTransferencias,
      userId,
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