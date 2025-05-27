import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePaginaPrincipalStore = defineStore('paginaPrincipal', () => {
  const accountBalance = ref(44500.00);
  const isSaldoVisible = ref(true);
  const monthlyTransferSummary = ref(123.44);
  const investments = ref([
    { name: 'SBS pesos plus', amount: 121042.00 },
    { name: 'Renta Fija', amount: 504070.00 },
    { name: 'Fondo Fima', amount: 1030091.00 },
    { name: 'CEDEARs', amount: 308700.00 },
    { name: 'MAF Ahorro Pesos', amount: 947700.40 },
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