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
      // Refresca los datos de la cuenta después de actualizar el alias
      await getCurrentAccount();
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    account,
    loading,
    error,
    setAccount,
    reset,
    getCurrentAccount,
    updateAlias,
  };
});