import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCobrosStore = defineStore("cobros", () => {
  const paymentLinks = ref([
    {
      id: 1,
      title: "Consultoría de Negocios",
      description: "Sesión de 2 horas sobre estrategia empresarial",
      price: 50000,
      creationDate: "15 Ene 2025",
      status: "Pagado",
    },
    {
      id: 2,
      title: "Mantenimiento Web",
      description: "Actualización mensual del sitio web",
      price: 25000,
      creationDate: "20 Feb 2025",
      status: "Pendiente",
    },
    {
      id: 3,
      title: "Desarrollo de App",
      description: "Desarrollo de aplicación móvil personalizada",
      price: 100000,
      creationDate: "10 Mar 2025",
      status: "Expirado",
    },
    {
      id: 4,
      title: "Capacitación Personal",
      description: "",
      price: 35000,
      creationDate: "05 Abr 2025",
      status: "Pagado",
    },
  ]);
  const searchQuery = ref("");
  const sortKey = ref("");
  const sortOrder = ref("asc");

  const totalCollected = computed(() => {
    return paymentLinks.value
      .filter((l) => l.status === "Pagado")
      .reduce((sum, l) => sum + l.price, 0);
  });

  const activeLinks = computed(() => {
    return paymentLinks.value.filter((l) => l.status === "Pendiente").length;
  });

  const totalLinks = computed(() => {
    return paymentLinks.value.length;
  });

  const filteredLinks = computed(() => {
    if (!searchQuery.value) {
      return paymentLinks.value;
    }
    return paymentLinks.value.filter((link) =>
      link.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const sortedLinks = computed(() => {
    if (!sortKey.value) return filteredLinks.value;
    return [...filteredLinks.value].sort((a, b) => {
      let valA = a[sortKey.value];
      let valB = b[sortKey.value];
      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  });

  function setSearchQuery(query) {
    searchQuery.value = query;
  }

  function sortBy(key) {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      sortOrder.value = "asc";
    }
  }

  function handleAddLink(newLink) {
    const newId = Math.max(...paymentLinks.value.map((l) => l.id), 0) + 1;
    const date = new Date();
    const formattedDate = date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    paymentLinks.value.push({
      id: newId,
      ...newLink,
      creationDate: formattedDate,
      status: "Pendiente",
    });
  }

  return {
    paymentLinks,
    searchQuery,
    sortKey,
    sortOrder,
    totalCollected,
    activeLinks,
    totalLinks,
    filteredLinks,
    sortedLinks,
    setSearchQuery,
    sortBy,
    handleAddLink,
  };
});
