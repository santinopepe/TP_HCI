<template>
  <div class="main-container flex h-screen">
    <!-- Barra lateral -->
    <aside class="sidebar bg-green-700 text-white w-1/5 p-4">
      <div class="logo flex items-center mb-8">
        <img src="/images/logo.png" alt="Logo SIM SIM" class="w-12 h-12 mr-2" />
        <h1 class="text-xl font-bold">SIM SIM</h1>
      </div>
      <nav class="menu space-y-4">
        <a href="#" class="menu-item flex items-center space-x-2 hover:bg-green-600 p-2 rounded">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </a>
        <a href="#" class="menu-item flex items-center space-x-2 hover:bg-green-600 p-2 rounded">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </a>
        <a href="#" class="menu-item flex items-center space-x-2 hover:bg-green-600 p-2 rounded">
          <i class="fas fa-exchange-alt"></i>
          <span>Transferir</span>
        </a>
        <a href="#" class="menu-item flex items-center space-x-2 hover:bg-green-600 p-2 rounded">
          <i class="fas fa-chart-line"></i>
          <span>Inversiones</span>
        </a>
        <a href="#" class="menu-item flex items-center space-x-2 hover:bg-green-600 p-2 rounded">
          <i class="fas fa-credit-card"></i>
          <span>Tarjetas</span>
        </a>
        <a href="#" class="menu-item flex items-center space-x-2 hover:bg-green-600 p-2 rounded">
          <i class="fas fa-bell"></i>
          <span>Notificaciones</span>
        </a>
      </nav>
      <button class="logout-btn flex items-center space-x-2 mt-auto bg-green-800 hover:bg-green-600 p-2 rounded w-full">
        <i class="fas fa-sign-out-alt"></i>
        <span>Cerrar Sesión</span>
      </button>
    </aside>

    <!-- Contenido principal -->
    <main class="content bg-gray-100 flex-1 p-6">
      <!-- Saldo y Transacciones -->
      <div class="grid grid-cols-3 gap-6">
        <!-- Saldo -->
        <div class="saldo bg-green-100 p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-bold text-green-700">Saldo</h2>
          <p class="text-4xl font-bold text-green-900 mt-4">$44,500.00</p>
          <button class="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            Ver detalles
          </button>
        </div>

        <!-- Transferencias Mensuales -->
        <div class="transferencias bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 class="text-lg font-bold text-gray-700">Transferencias Mensuales</h2>
          <div class="chart mt-4">
            <p>Gráfico de transferencias</p>
          </div>
        </div>
      </div>

      <!-- Últimas Transacciones e Inversiones Activas -->
      <div class="grid grid-cols-3 gap-6 mt-6">
        <!-- Últimas Transacciones -->
        <div class="transacciones bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 class="text-lg font-bold text-gray-700">Últimas Transacciones</h2>
          <ul class="mt-4 space-y-4">
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
        <div class="inversiones bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-bold text-gray-700">Inversiones Activas</h2>
          <ul class="mt-4 space-y-2">
            <li class="flex justify-between">
              <span>SBS pesos plus</span>
              <span>$121,042.00</span>
            </li>
            <li class="flex justify-between">
              <span>Renta Fija</span>
              <span>$504,070.00</span>
            </li>
            <li class="flex justify-between">
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