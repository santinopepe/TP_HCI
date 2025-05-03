<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <!-- Barra lateral -->
    <aside class="bg-[url('/images/fondo.png')] text-white w-1/5 p-4 flex flex-col h-full bg-cover bg-center">
      <div class="flex items-center mb-8">
        <img src="/images/logo.png" alt="Logo SIM SIM" class="w-16 h-16 mx-auto" />
      </div>
      <nav class="menu flex flex-col gap-4">
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded"
            :class="{'bg-[#3C4F2E]': activeButton === 'inicio', 'hover:bg-[#3C4F2E]/50': activeButton !== 'inicio'}"
          @click="setActiveButton('inicio')"
        >
          <img src="/images/home.png" alt="Inicio" class="w-6 h-6" />
          <span>Inicio</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded"
          :class="{'bg-[#3C4F2E]': activeButton === 'actividad', 'hover:bg-[#3C4F2E]/50': activeButton !== 'actividad'}"
          @click="setActiveButton('actividad')"
        >
          <img src="/images/actividad.png" alt="Actividad" class="w-6 h-6" />
          <span>Actividad</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded"
          :class="{'bg-[#3C4F2E]': activeButton === 'perfil', 'hover:bg-[#3C4F2E]/50': activeButton !== 'perfil'}"
          @click="setActiveButton('perfil')"
        >
          <img src="/images/profile.png" alt="Perfil" class="w-6 h-6" />
          <span>Perfil</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded"
          :class="{'bg-[#3C4F2E]': activeButton === 'transferir', 'hover:bg-[#3C4F2E]/50': activeButton !== 'transferir'}"
          @click="setActiveButton('transferir')"
        >
          <div class="relative top-1">
            <img src="/images/flechaArriba.png" alt="Flecha Arriba" class="w-4 h-4 absolute bottom-5 left-1" />
            <img src="/images/transferir.png" alt="Transferir" class="w-6 h-6" />
          </div>
          <span>Transferir</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded"
          :class="{'bg-[#3C4F2E]': activeButton === 'inversiones', 'hover:bg-[#3C4F2E]/50': activeButton !== 'inversiones'}"
          @click="setActiveButton('inversiones')"
        >
          <img src="/images/Inversiones.png" alt="Inversiones" class="w-6 h-6" />
          <span>Inversiones</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded"
          :class="{'bg-[#3C4F2E]': activeButton === 'pagoServicios', 'hover:bg-[#3C4F2E]/50': activeButton !== 'pagoServicios'}"
          @click="setActiveButton('pagoServicios')"
        >
          <img src="/images/pagosDeServicios.png" alt="Pago de Servicios" class="w-6 h-6" />
          <span>Pago de Servicios</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded"
          :class="{'bg-[#3C4F2E]': activeButton === 'tarjetas', 'hover:bg-[#3C4F2E]/50': activeButton !== 'tarjetas'}"
          @click="setActiveButton('tarjetas')"
        >
          <img src="/images/agregarTarjeta.png" alt="Tarjetas" class="w-6 h-6" />
          <span>Tarjetas</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded"
          :class="{'bg-[#3C4F2E]': activeButton === 'notificaciones', 'hover:bg-[#3C4F2E]/50': activeButton !== 'notificaciones'}"
          @click="setActiveButton('notificaciones')"
        >
          <img src="/images/Notificaciones.png" alt="Notificaciones" class="w-6 h-6" />
          <span>Notificaciones</span>
        </a>
      </nav>
      <div class="mt-auto flex justify-center">
        <button
          class="flex justify-between items-center gap-2 bg-[#5D8C39] hover:bg-[#15803d] p-3 rounded-xl w-60 border-none cursor-pointer"
          @click="goToInicioSesion"
        >
          <span>Cerrar Sesión</span>
          <img src="/images/logout.png" alt="Cerrar Sesión" class="w-6 h-6" />
        </button>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <!-- Saldo y Transacciones -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Saldo -->
        <div class="bg-[#c6e8c9] p-6 rounded-lg shadow-md text-center">
          <h2 class="text-lg font-bold text-[#166534]">Saldo</h2>
          <p class="text-4xl font-bold text-[#14532d] mt-4">$44,500.00</p>
          <button
            class="mt-4 bg-[#166534] text-white px-4 py-2 rounded hover:bg-[#15803d] border-none cursor-pointer"
          >
            Ver detalles
          </button>
        </div>

        <!-- Transferencias Mensuales -->
        <div class="bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 class="text-lg font-bold text-gray-700">Transferencias Mensuales</h2>
          <div class="h-48 bg-gray-200 flex items-center justify-center rounded mt-4">
            <p>Gráfico de transferencias</p>
          </div>
        </div>
      </div>

      <!-- Últimas Transacciones e Inversiones Activas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <!-- Últimas Transacciones -->
        <div class="bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 class="text-lg font-bold text-gray-700">Últimas Transacciones</h2>
          <ul class="mt-4 flex flex-col gap-4">
            <li class="flex justify-between">
              <span>Pago de SUBE</span>
              <span class="text-red-500">-230.00</span>
            </li>
            <li class="flex justify-between">
              <span>Ingreso de dinero</span>
              <span class="text-green-500">+866.00</span>
            </li>
            <li class="flex justify-between">
              <span>Pago de la tarjeta</span>
              <span class="text-red-500">-453.00</span>
            </li>
          </ul>
        </div>

        <!-- Inversiones Activas -->
        <div class="bg-white p-6 rounded-lg shadow-md text-right">
          <h2 class="text-lg font-bold text-gray-700">Inversiones Activas</h2>
          <ul class="mt-4 flex flex-col gap-2">
            <li class="flex justify-between py-1">
              <span>SBS pesos plus</span>
              <span>$121,042.00</span>
            </li>
            <li class="flex justify-between py-1">
              <span>Renta Fija</span>
              <span>$504,070.00</span>
            </li>
            <li class="flex justify-between py-1">
              <span>Fondo Fima</span>
              <span>$1,030,091.00</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "PaginaPrincipal",
  data() {
    return {
      activeButton: 'inicio', // Botón activo inicial
    };
  },
  methods: {
    setActiveButton(button) {
      this.activeButton = button; // Cambia el botón activo
    },
    goToInicioSesion() {
      this.$router.push("/");
    },
  },
};
</script>