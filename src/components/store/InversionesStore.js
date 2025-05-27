import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInvestmentsStore = defineStore('investments', () => {
  const investments = ref([
    { id: 1, name: 'Acciones Apple (AAPL)', quantity: 50, purchasePricePerUnit: 150.00, currentValuePerUnit: 175.50, acquisitionDate: '15 Ene 2023' },
    { id: 2, name: 'Bonos Corp. (MGLO)', quantity: 100, purchasePricePerUnit: 980.00, currentValuePerUnit: 1020.00, acquisitionDate: '20 Feb 2023' },
    { id: 3, name: 'Fondo Común "Beta Latam"', quantity: 250, purchasePricePerUnit: 100.00, currentValuePerUnit: 95.00, acquisitionDate: '10 Abr 2023' },
    { id: 4, name: 'Ethereum (ETH)', quantity: 5, purchasePricePerUnit: 1800.00, currentValuePerUnit: 2100.00, acquisitionDate: '20 May 2023' },
    { id: 5, name: 'ETF S&P 500 (SPY)', quantity: 30, purchasePricePerUnit: 400.00, currentValuePerUnit: 450.00, acquisitionDate: '05 Jun 2023' },
    { id: 6, name: 'Plazo Fijo Banco Z', quantity: 1, purchasePricePerUnit: 50000.00, currentValuePerUnit: 52500.00, acquisitionDate: '01 Jul 2023' },
  ]);

  


  return {
    investments
  };
});