import { defineStore } from "pinia";
import { ref } from "vue";
import { PaymentApi } from "../../api/payment.js";

export const useCobrosStore = defineStore("pagos", () => {
  const pagos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fetch all payments
  async function fetchPagos() {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.getAll();
      console.log("fetchPagos result:", result); // Debug: Log API response
      pagos.value = Array.isArray(result?.results) ? result.results : [];
      console.log("pagos after fetchPagos:", pagos.value); // Debug: Log stored payments
    } catch (e) {
      console.error("fetchPagos error:", e);
      error.value = e;
      pagos.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Fetch non-transfer payments (excluding those with transferDate)
  async function fetchCobros() {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.getAll();
      console.log("fetchCobros result:", result); // Debug: Log API response
      pagos.value = Array.isArray(result?.results)
        ? result.results.filter(payment => !payment.metadata?.transferDate)
        : [];
      console.log("pagos after fetchCobros:", pagos.value); // Debug: Log filtered non-transfers
    } catch (e) {
      console.error("fetchCobros error:", e);
      error.value = e;
      pagos.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Fetch transfers (payments with transferDate)
  async function fetchTransfers() {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.getAll();
      console.log("fetchTransfers result:", result); // Debug: Log API response
      pagos.value = Array.isArray(result?.results)
        ? result.results.filter(payment => {
            const hasTransferDate = !!payment.metadata?.transferDate;
            console.log("Payment:", payment, "Has transferDate:", hasTransferDate); // Debug: Log each payment
            return hasTransferDate;
          })
        : [];
      console.log("Filtered transfers in pagos:", pagos.value); // Debug: Log filtered transfers
    } catch (e) {
      console.error("fetchTransfers error:", e);
      error.value = e;
      pagos.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Perform a regular payment
  async function pay(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.pay(payment);
      console.log("pay result:", result); // Debug: Log payment result
      await fetchPagos(); // Refresh all payments
      return result;
    } catch (e) {
      console.error("pay error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Update a payment
  async function put(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.put(payment);
      console.log("put result:", result); // Debug: Log put result
      await fetchPagos(); // Refresh all payments
      return result;
    } catch (e) {
      console.error("put error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Pull payment
  async function pull(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.pull(payment);
      console.log("pull result:", result); // Debug: Log pull result
      return result;
    } catch (e) {
      console.error("pull error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Push payment
  async function push(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.push(payment);
      console.log("push result:", result); // Debug: Log push result
      return result;
    } catch (e) {
      console.error("push error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Transfer by CVU
  async function transferByCVU(params, body, controller) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.transferByCVU(params, body, controller);
      console.log("transferByCVU result:", result); // Debug: Log transfer result
      await fetchTransfers(); // Refresh transfers after a new transfer
      return result;
    } catch (e) {
      console.error("transferByCVU error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Transfer by Alias
  async function transferByAlias(params, body, controller) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.transferByAlias(params, body, controller);
      console.log("transferByAlias result:", result); // Debug: Log transfer result
      await fetchTransfers(); // Refresh transfers after a new transfer
      return result;
    } catch (e) {
      console.error("transferByAlias error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Transfer by Email
  async function transferByEmail(params, body, controller) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.transferByEmail(params, body, controller);
      console.log("transferByEmail result:", result); // Debug: Log transfer result
      await fetchTransfers(); // Refresh transfers after a new transfer
      return result;
    } catch (e) {
      console.error("transferByEmail error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    pagos,
    loading,
    error,
    fetchPagos,
    fetchCobros,
    fetchTransfers,
    pay,
    pull,
    push,
    transferByEmail,
    transferByCVU,
    transferByAlias,
    put,
  };
});