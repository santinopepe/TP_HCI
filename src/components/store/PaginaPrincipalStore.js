import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePaginaPrincipalStore = defineStore('paginaPrincipal', () => {
  const accountBalance = ref(44500.00);
  const isSaldoVisible = ref(true);
  const monthlyTransferSummary = ref(123.44);
  const investments = ref([
    { name: 'SBS pesos plus', amount: 121042.00 },
    { name: 'Renta fija', amount: 504070.00 },
    { name: 'Fondo fima', amount: 1030091.00 },
    { name: 'CEDEARs', amount: 308700.00 },
    { name: 'MAF ahorro pesos', amount: 947700.40 },
  ]);
 

  const formattedBalance = computed(() => (isSaldoVisible.value ? `$${accountBalance.value.toFixed(2)}` : '$*****'));

  function toggleSaldoVisibility() {
    isSaldoVisible.value = !isSaldoVisible.value;
  }


  function updateAccountBalance(amount) {
    accountBalance.value = amount;
  }

  return {
    accountBalance,
    isSaldoVisible,
    monthlyTransferSummary,
    investments,
    formattedBalance,
    toggleSaldoVisibility,
    updateAccountBalance
  };
});