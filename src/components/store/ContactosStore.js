import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCobrosStore } from "./CobrosStore.js";

export const useContactosStore = defineStore("contactos", () => {
  const cobrosStore = useCobrosStore();
  const userId = 1; // Reemplaza por el id real del usuario logueado

  const contactos = computed(() => {
    const receivers = cobrosStore.pagos
      .map(p => p.receiver)
      .filter(r => r && r.id !== userId);

    const unique = [];
    const ids = new Set();
    for (const r of receivers) {
      if (!ids.has(r.id)) {
        ids.add(r.id);
        unique.push(r);
      }
    }
    return unique;
  });

  return { contactos };
});