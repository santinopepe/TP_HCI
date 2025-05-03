<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <!-- Barra lateral -->
    <aside class="bg-[#166534] text-white w-1/5 p-4 flex flex-col h-full">
      <div class="flex items-center mb-8">
        <img src="/images/logo.png" alt="Logo SIM SIM" class="w-12 h-12 mr-2" />
        <h1 class="text-xl font-bold">SIM SIM</h1>
      </div>
      <nav class="menu flex flex-col gap-4">
        <a href="#" class="flex items-center gap-2 p-2 rounded hover:bg-[#15803d]">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </a>
        <a href="#" class="flex items-center gap-2 p-2 rounded hover:bg-[#15803d]">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </a>
        <a href="#" class="flex items-center gap-2 p-2 rounded hover:bg-[#15803d]">
          <i class="fas fa-exchange-alt"></i>
          <span>Transferir</span>
        </a>
        <a href="#" class="flex items-center gap-2 p-2 rounded hover:bg-[#15803d]">
          <i class="fas fa-chart-line"></i>
          <span>Inversiones</span>
        </a>
        <a href="#" class="flex items-center gap-2 p-2 rounded hover:bg-[#15803d]">
          <i class="fas fa-credit-card"></i>
          <span>Tarjetas</span>
        </a>
        <a href="#" class="flex items-center gap-2 p-2 rounded hover:bg-[#15803d]">
          <i class="fas fa-bell"></i>
          <span>Notificaciones</span>
        </a>
      </nav>
      <button
        class="flex items-center gap-2 mt-auto bg-[#14532d] hover:bg-[#15803d] p-2 rounded w-full border-none cursor-pointer"
      >
        <i class="fas fa-sign-out-alt"></i>
        <span>Cerrar Sesión</span>
      </button>
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
};
</script>