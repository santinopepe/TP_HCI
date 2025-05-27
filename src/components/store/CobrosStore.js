import { defineStore } from "pinia";
import { ref } from "vue";
import { PaymentApi } from "../../api/payment.js";

export const useCobrosStore = defineStore("pagos", () => {
  const pagos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchPagos() {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.getAll();
      pagos.value = Array.isArray(result?.results) ? result.results : [];
    } catch (e) {
      console.error("fetchPagos error:", e);
      error.value = e;
      pagos.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function fetchCobros() {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.getAll();
      pagos.value = Array.isArray(result?.results)
        ? result.results.filter(payment => !payment.metadata?.transferDate)
        : [];
    } catch (e) {
      console.error("fetchCobros error:", e);
      error.value = e;
      pagos.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function fetchTransfers() {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.getAll();
      pagos.value = Array.isArray(result?.results)
        ? result.results.filter(payment => {
            const hasTransferDate = !!payment.metadata?.transferDate;
            return hasTransferDate;
          })
        : [];
    } catch (e) {
      console.error("fetchTransfers error:", e);
      error.value = e;
      pagos.value = [];
    } finally {
      loading.value = false;
    }
  }


  async function pay(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.pay(payment);
      await fetchPagos(); 
      return result;
    } catch (e) {
      console.error("pay error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function put(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.put(payment);
      await fetchPagos();
      return result;
    } catch (e) {
      console.error("put error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function pull(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.pull(payment);
      return result;
    } catch (e) {
      console.error("pull error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function push(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.push(payment);
      return result;
    } catch (e) {
      console.error("push error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function transferByCVU(params, body, controller) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.transferByCVU(params, body, controller);
      await fetchTransfers(); 
      return result;
    } catch (e) {
      console.error("transferByCVU error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function transferByAlias(params, body, controller) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.transferByAlias(params, body, controller);
      await fetchTransfers(); 
      return result;
    } catch (e) {
      console.error("transferByAlias error:", e);
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function transferByEmail(params, body, controller) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.transferByEmail(params, body, controller);
      await fetchTransfers(); 
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