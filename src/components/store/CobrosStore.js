import { defineStore } from "pinia";
import { ref } from "vue";

import { PaymentApi } from "../../api/payment.js";

export const useCobrosStore = defineStore("pagos", () => {
  const pagos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Obtener todos los pagos
  async function fetchPagos() {
    loading.value = true;
    error.value = null;
    try {
      pagos.value = await PaymentApi.getAll();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  // Realizar un pago normal
  async function pay(payment) {
    loading.value = true;
    error.value = null;
    try {
      const result = await PaymentApi.pay(payment);
      await fetchPagos(); // Actualiza la lista
      return result;
    } catch (e) {
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
      return await PaymentApi.pull(payment);
    } catch (e) {
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
      return await PaymentApi.push(payment);
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Transferencias
  async function transferByEmail(data) {
    loading.value = true;
    error.value = null;
    try {
      return await PaymentApi.transferByEmail(data);
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function transferByCVU(data) {
    loading.value = true;
    error.value = null;
    try {
      return await PaymentApi.transferByCVU(data);
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function transferByAlias(data) {
    loading.value = true;
    error.value = null;
    try {
      return await PaymentApi.transferByAlias(data);
    } catch (e) {
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
    pay,
    pull,
    push,
    transferByEmail,
    transferByCVU,
    transferByAlias,
  };
});
