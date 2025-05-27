import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { InvestmentApi } from "../../api/investment.js";

export const useInvestmentStore = defineStore("investment", () => {
    const investments = ref([]);
    const dailyRate = ref(null);
    const dailyReturns = ref([]);
    const loading = ref(false);
    const error = ref(null);

    // Obtener todas las inversiones
    async function fetchInvestments() {
        loading.value = true;
        error.value = null;
        try {
            const result = await InvestmentApi.getAll();
            // Soporta tanto array directo como objeto con results
            investments.value = Array.isArray(result?.results) ? result.results : (Array.isArray(result) ? result : []);
        } catch (e) {
            error.value = e;
            investments.value = [];
        } finally {
            loading.value = false;
        }
    }

    // Obtener tasa diaria
    async function fetchDailyRate() {
        loading.value = true;
        error.value = null;
        try {
            dailyRate.value = await InvestmentApi.getDailyRate();
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    // Obtener retornos diarios
    async function fetchDailyReturns() {
        loading.value = true;
        error.value = null;
        try {
            dailyReturns.value = await InvestmentApi.getDailyReturns();
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    // Invertir monto
    async function invest(data) {
        loading.value = true;
        error.value = null;
        try {
            await InvestmentApi.invest(data);
            await fetchInvestments();
        } catch (e) {
            // Intenta extraer el mensaje del backend
            if (e?.message) {
                error.value = e.message;
            } else if (e?.response?.data?.message) {
                error.value = e.response.data.message;
            } else {
                error.value = "Error al invertir. Intenta nuevamente.";
            }
            throw error.value; // Propaga el error para que el formulario lo reciba
        } finally {
            loading.value = false;
        }
    }

    // Desinvertir monto
    async function divest(data) {
        loading.value = true;
        error.value = null;
        try {
            await InvestmentApi.divest(data);
            await fetchInvestments();
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    return {
        investments,
        dailyRate,
        dailyReturns,
        loading,
        error,
        fetchInvestments,
        fetchDailyRate,
        fetchDailyReturns,
        invest,
        divest,
    };
});