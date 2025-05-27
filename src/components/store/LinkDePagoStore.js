import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCobrosStore } from "./CobrosStore";
import { useCardStore } from "./TarjetasStore";
import { useAccountStore } from "./accountStore";

export const useLinkDePagoStore = defineStore("linkDePago", () => {
  const paymentLink = ref("");
  const paymentDetails = ref(null);
  const metodo = ref(null);
  const tarjetaSeleccionada = ref(0);
  const accountBalance = ref(0);
  const accountCvu = ref("");
  const errors = ref({ paymentLink: null, api: null });
  const loading = ref(false);
  const cobrosStore = useCobrosStore();
  const cardStore = useCardStore();
  const accountStore = useAccountStore();

  const serviceName = computed(() => paymentDetails.value?.description || "Servicio desconocido");
  const amount = computed(() => paymentDetails.value?.amount || 0);
  const cargo = computed(() => amount.value * 0.05);
  const total = computed(() => amount.value + cargo.value);
  const selectedCard = computed(() =>
    metodo.value === "tarjeta" && cardStore.cards.length > 0
      ? cardStore.cards[tarjetaSeleccionada.value]
      : null
  );

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const formatCurrency = (value) => {
    if (typeof value !== "number" || isNaN(value)) return "$0.00";
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  async function fetchAccountBalance() {
    loading.value = true;
    errors.value.api = null;

    try {
      const account = await accountStore.getCurrentAccount();
      accountBalance.value = account.balance || 0;
      accountCvu.value = account.cvu || "";
      return true;
    } catch (e) {
      errors.value.api = {
        message: e.message || "Error al obtener el saldo de la cuenta",
        status: e.status || 500,
      };
      if (e.status === 401) {
        errors.value.api.message = "No autorizado. Por favor, inicie sesión nuevamente.";
      }
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function fetchPaymentDetailsByUuid(uuid) {
    if (!uuidRegex.test(uuid)) {
      errors.value.paymentLink = "El código de pago no tiene un formato UUID válido.";
      return false;
    }

    loading.value = true;
    errors.value.paymentLink = null;
    errors.value.api = null;

    try {
      let payment = null;
      let page = 1;
      const pageSize = 10;
      let hasMorePages = true;

      while (hasMorePages) {
        await cobrosStore.fetchPagos({ page, pageSize });
        payment = cobrosStore.pagos.find((pago) => pago.uuid === uuid);

        if (payment) {
          paymentDetails.value = payment;
          await fetchAccountBalance();
          return true;
        }

        const totalCount = cobrosStore.pagos?.paging?.totalCount || 0;
        const currentPageSize = cobrosStore.pagos?.results?.length || 0;
        hasMorePages = currentPageSize === pageSize && page * pageSize < totalCount;
        page++;
      }

      errors.value.api = {
        message: "El código de pago no existe. Verifique el UUID ingresado.",
        status: 404,
      };
      return false;
    } catch (e) {
      errors.value.api = {
        message: e.message || "Error al obtener los detalles del pago",
        status: e.status || 500,
      };
      if (e.status === 401) {
        errors.value.api.message = "No autorizado. Por favor, inicie sesión nuevamente.";
      } else if (e.status === 404) {
        errors.value.api.message = "El código de pago no existe o no está disponible.";
      }
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function confirmPayment() {
    loading.value = true;
    errors.value.api = null;
  
    try {
      const paymentData = {
        id: paymentDetails.value?.id,
        uuid: paymentLink.value,
        amount: total.value,
        method: metodo.value === "tarjeta" ? "CARD" : "ACCOUNT",
        ...(metodo.value === "tarjeta" && selectedCard.value
          ? { cardId: selectedCard.value.id }
          : {}),
        ...(metodo.value === "cuenta" && accountCvu.value
          ? { cvu: accountCvu.value }
          : {}),
      };
  
    
      const result = await cobrosStore.put(paymentData);


      if (result) {
        if (metodo.value === "cuenta") {
          accountBalance.value -= total.value;
        }
        return true;
      } else {
        errors.value.api = {
          message: "Error al procesar el pago. Intente nuevamente.",
          status: 500,
        };
        return false;
      }
    } catch (e) {
      errors.value.api = {
        message: e.message || "Error desconocido al procesar el pago",
        status: e.status || 500,
      };
      if (e.status === 401) {
        errors.value.api.message = "No autorizado. Por favor, inicie sesión nuevamente.";
      } else if (e.status === 400) {
        errors.value.api.message = "Datos de pago inválidos. Verifique la información.";
      } else if (e.status === 404) {
        errors.value.api.message = "El pago no existe o la solicitud es inválida.";
      }
      return false;
    } finally {
      loading.value = false;
    }
  }
  
  function resetPayment() {
    paymentLink.value = "";
    paymentDetails.value = null;
    metodo.value = null;
    tarjetaSeleccionada.value = 0;
    errors.value = { paymentLink: null, api: null };
    loading.value = false;
  }

  return {
    paymentLink,
    paymentDetails,
    metodo,
    tarjetaSeleccionada,
    accountBalance,
    accountCvu,
    errors,
    loading,
    serviceName,
    amount,
    cargo,
    total,
    selectedCard,
    fetchPaymentDetailsByUuid,
    fetchAccountBalance,
    confirmPayment,
    resetPayment,
    formatCurrency,
  };
});