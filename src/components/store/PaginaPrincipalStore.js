// stores/usePaginaPrincipalStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePaginaPrincipalStore = defineStore('paginaPrincipal', () => {
  // State
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
  const transactions = ref([
    { id: 1, name: 'Pago de SUBE', type: 'Pago', icon: '/images/sube.png', date: '20 Mar 2025', amount: -230.00 },
    { id: 2, name: 'Ingreso de dinero', type: 'Ingreso', icon: '/images/Visa.png', date: '18 Mar 2025', amount: 866.00 },
    { id: 3, name: 'Pago de la tarjeta', type: 'Pago', icon: '/images/pagoTarjeta.png', date: '01 Mar 2025', amount: -453.00 },
    { id: 4, name: 'Transferencia', type: 'Transferencia', icon: '/images/fotoHombre.png', date: '27 Feb 2025', amount: -230.00 },
  ]);
  const transferChartData = ref([
    { month: 'Feb', amount: 100, color: '#83A46A' },
    { month: 'Mar', amount: 160, color: '#3C4F2E' },
    { month: 'Abr', amount: 80, color: '#B1DC91' },
    { month: 'May', amount: 100, color: '#83A46A' },
    { month: 'Jun', amount: 50, color: '#CBFBA6' },
    { month: 'Jul', amount: 100, color: '#83A46A' },
    { month: 'Ago', amount: 80, color: '#B1DC91' },
  ]);

  // Getters
  const formattedBalance = computed(() => (isSaldoVisible.value ? `$${accountBalance.value.toFixed(2)}` : '$*****'));

  // Actions
  function toggleSaldoVisibility() {
    isSaldoVisible.value = !isSaldoVisible.value;
  }

  function addTransaction(transaction) {
    transactions.value.push(transaction);
  }

  function updateAccountBalance(amount) {
    accountBalance.value = amount;
  }

  return {
    accountBalance,
    isSaldoVisible,
    monthlyTransferSummary,
    investments,
    transactions,
    transferChartData,
    formattedBalance,
    toggleSaldoVisibility,
    addTransaction,
    updateAccountBalance
  };
});