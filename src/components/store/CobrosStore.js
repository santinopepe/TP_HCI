import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCobrosStore = defineStore('cobros', {
  state: () => ({
    paymentLinks: [
      {
        id: 1,
        title: 'Consultoría de Negocios',
        description: 'Sesión de 2 horas sobre estrategia empresarial',
        price: 50000,
        creationDate: '15 Ene 2025',
        status: 'Pagado',
      },
      {
        id: 2,
        title: 'Mantenimiento Web',
        description: 'Actualización mensual del sitio web',
        price: 25000,
        creationDate: '20 Feb 2025',
        status: 'Pendiente',
      },
      {
        id: 3,
        title: 'Desarrollo de App',
        description: 'Desarrollo de aplicación móvil personalizada',
        price: 100000,
        creationDate: '10 Mar 2025',
        status: 'Expirado',
      },
      {
        id: 4,
        title: 'Capacitación Personal',
        description: '',
        price: 35000,
        creationDate: '05 Abr 2025',
        status: 'Pagado',
      },
    ],
    searchQuery: '',
    sortKey: '',
    sortOrder: 'asc',
  }),
  getters: {
    totalCollected: (state) => {
      return state.paymentLinks
        .filter(l => l.status === 'Pagado')
        .reduce((sum, l) => sum + l.price, 0);
    },
    activeLinks: (state) => {
      return state.paymentLinks.filter(l => l.status === 'Pendiente').length;
    },
    totalLinks: (state) => {
      return state.paymentLinks.length;
    },
    filteredLinks: (state) => {
      if (!state.searchQuery) {
        return state.paymentLinks;
      }
      const lowerQuery = state.searchQuery.toLowerCase();
      return state.paymentLinks.filter(link =>
        link.title.toLowerCase().includes(lowerQuery) ||
        (link.description && link.description.toLowerCase().includes(lowerQuery))
      );
    },
    sortedLinks: (state) => {
      if (!state.sortKey) return state.filteredLinks;
      return [...state.filteredLinks].sort((a, b) => {
        let valA = a[state.sortKey];
        let valB = b[state.sortKey];
        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        if (valA < valB) return state.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return state.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    },
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    handleAddLink(newLink) {
      const newId = Math.max(...this.paymentLinks.map(l => l.id), 0) + 1;
      const date = new Date();
      const formattedDate = date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
      this.paymentLinks.push({
        id: newId,
        ...newLink,
        creationDate: formattedDate,
        status: 'Pendiente',
      });
    },
  },
});