import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useActividadStore = defineStore('finance', {
  state: () => ({
    mainAccountBalance: 44500.00,
    activeInvestments: 2911804.00,
    expenses: 1204880.00,
    transactions: [
      { id: 1, name: 'Claudio Jamin', type: 'Transferencia Bancaria', date: '06 May 2023 - 09:30', amount: '-$8,000.00' },
      { id: 2, name: 'Jorge Herrera', type: 'Pago Directo', date: '06 May 2023 - 09:30', amount: '-$8,000.00' },
      { id: 3, name: 'Bernardo Gutierrez', type: 'Transferencia Bancaria', date: '06 May 2023 - 09:30', amount: '-$8,000.00' },
      { id: 4, name: 'Carlos Gomez', type: 'Transferencia Bancaria', date: '06 May 2023 - 09:30', amount: '-$8,000.00' },
      { id: 5, name: 'Gaston Gonzalez', type: 'Transferencia Bancaria', date: '06 May 2023 - 09:30', amount: '-$8,000.00' },
      { id: 6, name: 'Raul Garcia Blanco', type: 'Pago Directo', date: '06 May 2023 - 09:30', amount: '-$8,000.00' },
    ],
    chartData: {
      labels: ['Cornisa', 'Expensas', 'Otro', 'Ocio'],
      datasets: [
        {
          data: [20, 25, 10, 45],
          backgroundColor: ['#354a2f', '#558B2F', '#8FBC8F', '#B3DDA1'],
          hoverOffset: 4,
        },
      ],
    },
    searchQuery: '',
  }),
  getters: {
    filteredTransactions: (state) => {
      if (!state.searchQuery) {
        return state.transactions;
      }
      return state.transactions.filter(transaction =>
        transaction.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    getChartData: (state) => state.chartData,
    getMainAccountBalance: (state) => state.mainAccountBalance,
    getActiveInvestments: (state) => state.activeInvestments,
    getExpenses: (state) => state.expenses,
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    // Optional: Add actions to update financial summary values
    updateMainAccountBalance(amount) {
      this.mainAccountBalance = amount;
    },
    updateActiveInvestments(amount) {
      this.activeInvestments = amount;
    },
    updateExpenses(amount) {
      this.expenses = amount;
    },
  },
});