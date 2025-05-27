import { ref } from "vue";
import { defineStore } from "pinia";
import { AccountApi } from "../../api/account.js";

export const useAccountStore = defineStore("account", () => {
  const account = ref(null);
  const loading = ref(false);
  const error = ref(null);

  function setAccount(value) {
    account.value = value;
  }

  function reset() {
    account.value = null;
    loading.value = false;
    error.value = null;
  }

  async function getCurrentAccount() {
    loading.value = true;
    error.value = null;
    try {
      const result = await AccountApi.get();
      setAccount(result);
      return result;
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function updateAlias(newAlias) {
    loading.value = true;
    error.value = null;
    try {
      await AccountApi.updateAlias({ alias: newAlias });
      
      await getCurrentAccount();
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deposit(amount) {
    loading.value = true;
    error.value = null;
    try {
      const numericAmount = Number(amount);
      if (!numericAmount || numericAmount <= 0) {
        throw new Error("El monto debe ser mayor a 0.");
      }
      await AccountApi.recharge(numericAmount);
      await getCurrentAccount();
      return account.value;
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  const validateCVU = async (alias) => {
    try {
      await AccountApi.verifyCVU(alias);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateAlias = async (alias) => {
    try {
      await AccountApi.verifyAlias(alias);
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    account,
    loading,
    error,
    setAccount,
    reset,
    getCurrentAccount,
    updateAlias,
    deposit,
    validateCVU,
    validateAlias
  };
});