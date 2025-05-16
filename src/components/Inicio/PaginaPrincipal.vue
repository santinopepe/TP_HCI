<template>
  <div class="flex h-screen font-sans overflow-hidden">
    <!-- Barra lateral -->
    <BarraLateral :active-button="activeButton" @update:activeButton="activeButton = $event" />
    <!-- Contenido principal -->
    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Saldo y Botón Recibir Dinero -->
        <div class="w-[calc(100%+8rem)] overflow-hidden">
          <div class="bg-gradient-to-r from-[#243219] to-[#CBFBA6] p-6 rounded-lg shadow-md text-center text-white relative h-44 flex items-center">
            <router-link
              to="/cvu"
              class="absolute top-4 right-4 bg-white text-[#5D8C39] font-semibold px-4 py-1 rounded-md shadow hover:bg-gray-100 transition-colors text-sm"
            >
              Tu CVU
            </router-link>
            <img src="/images/logo.png" alt="Logo SIM SIM" class="w-16 h-16 mr-4" />
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-left absolute top-4">Saldo</h2>
              <p class="text-3xl font-bold mt-4 text-left">
                {{ isSaldoVisible ? '$44,500.00' : '$*****' }}
              </p>
              <button
                class="absolute bottom-14 left-62 bg-[#3C4F2E]/50 p-2 rounded-full shadow-md hover:bg-[#3C4F2E]/20"
                @click="toggleSaldoVisibility"
              >
                <img :src="isSaldoVisible ? '/images/visibilityOn.png' : '/images/visibilityOff.png'" alt="Ver saldo" class="w-6 h-6" />
              </button>
            </div>
          </div>
          <!-- Botón Recibir Dinero -->
          <div class="flex justify-center mt-4">
            <router-link
              to="/ingresar-dinero"
              class="text-white font-bold py-3 px-6 rounded-lg shadow-md bg-[#5D8C39] hover:bg-[#5D8C39]/60 transition-colors w-[calc(100%+8rem)] justify-center flex items-center"
            >
              Ingresar Dinero
            </router-link>
          </div>
        </div>

        <!-- Transferencias Mensuales -->
        <div class="bg-white p-6 rounded-lg shadow-md absolute right-4 w-[calc(100%-58rem)] h-[17rem] flex flex-col justify-end col-span-1 overflow-hidden">
          <h2 class="text-2xl font-bold text-[#4B5563] text-left absolute top-4 left-6">Transferencias Mensuales</h2>
          <p class="absolute top-6 right-6 text-[#A5A2A1] font-semibold text-sm">
            +$123.44 / Último mes
          </p>
          <div class="h-48 flex items-end justify-center mt-auto">
            <div class="flex items-end gap-4 w-full justify-between px-4">
              <div class="flex flex-col items-center flex-1">
                <div class="bg-[#83A46A] h-28 w-12 rounded"></div>
                <span class="text-gray-500 text-sm mt-2">Feb</span>
              </div>
              <div class="flex flex-col items-center flex-1">
                <div class="bg-[#3C4F2E] h-40 w-12 rounded"></div>
                <span class="text-gray-500 text-sm mt-2">Mar</span>
              </div>
              <div class="flex flex-col items-center flex-1">
                <div class="bg-[#B1DC91] h-20 w-12 rounded"></div>
                <span class="text-gray-500 text-sm mt-2">Abr</span>
              </div>
              <div class="flex flex-col items-center flex-1">
                <div class="bg-[#83A46A] h-28 w-12 rounded"></div>
                <span class="text-gray-500 text-sm mt-2">May</span>
              </div>
              <div class="flex flex-col items-center flex-1">
                <div class="bg-[#CBFBA6] h-12 w-12 rounded"></div>
                <span class="text-gray-500 text-sm mt-2">Jun</span>
              </div>
              <div class="flex flex-col items-center flex-1">
                <div class="bg-[#83A46A] h-28 w-12 rounded"></div>
                <span class="text-gray-500 text-sm mt-2">Jul</span>
              </div>
              <div class="flex flex-col items-center flex-1">
                <div class="bg-[#B1DC91] h-20 w-12 rounded"></div>
                <span class="text-gray-500 text-sm mt-2">Ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Últimas Transacciones e Inversiones Activas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <!-- Últimas Transacciones -->
        <div class="bg-white p-6 rounded-lg shadow-md w-[calc(100%+8rem)] overflow-hidden">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-700">Últimas Transacciones</h2>
          </div>
          <ul class="mt-4 flex flex-col gap-4">
            <li class="flex justify-between items-center border-b pb-2">
              <div class="flex items-center gap-4">
                <img alt="SUBE" src="/images/sube.png" class="w-12 h-8" />
                <span class="text-gray-700">Pago de SUBE</span>
              </div>
              <div class="text-right">
                <span class="text-red-500 block">-230.00</span>
                <span class="text-gray-400 text-sm">20 Mar 2025</span>
              </div>
            </li>
            <li class="flex justify-between items-center border-b pb-2">
              <div class="flex items-center gap-4">
                <img alt="Visa" src="/images/Visa.png" class="w-12 h-4" />
                <span class="text-gray-700">Ingreso de dinero</span>
              </div>
              <div class="text-right">
                <span class="text-green-500 block">+866.00</span>
                <span class="text-gray-400 text-sm">18 Mar 2025</span>
              </div>
            </li>
            <li class="flex justify-between items-center border-b pb-2">
              <div class="flex items-center gap-4">
                <img alt="Tarjeta" src="/images/pagoTarjeta.png" class="w-12 h-10" />
                <span class="text-gray-700">Pago de la tarjeta</span>
              </div>
              <div class="text-right">
                <span class="text-red-500 block">-453.00</span>
                <span class="text-gray-400 text-sm">1 Mar 2025</span>
              </div>
            </li>
            <li class="flex justify-between items-center border-b pb-2">
              <div class="flex items-center gap-4">
                <img alt="hombre" src="/images/fotoHombre.png" class="w-12 h-10" />
                <span class="text-gray-700">Transferencia</span>
              </div>
              <div class="text-right">
                <span class="text-red-500 block">-230.00</span>
                <span class="text-gray-400 text-sm">27 Feb 2025</span>
              </div>
            </li>
          </ul>
        </div>


        <!-- Inversiones Activas -->
        <div class="absolute bottom-[12%] right-4 w-[calc(100%-58rem)] promu">
          <!-- Barra verde de Inversiones Activas -->
          <div class="bg-[#3C4F2E] text-white p-4 rounded-2xl flex justify-between items-center">
            <h2 class="text-lg font-bold">Inversiones Activas</h2>
          </div>

          <!-- Bloque blanco debajo de la barra verde -->
          <div class="bg-white p-6 rounded-lg shadow-md w-[84%] justify-center mx-auto">
            <ul class="mt-4 flex flex-col gap-2">
              <li class="flex justify-between items-center border-b pb-2">
                <span class="text-gray-700 font-bold">SBS pesos plus</span>
                <span class="text-gray-900 font-semibold">$121,042.00</span>
              </li>
              <li class="flex justify-between items-center border-b pb-2">
                <span class="text-gray-700 font-bold">Renta Fija</span>
                <span class="text-gray-900 font-semibold">$504,070.00</span>
              </li>
              <li class="flex justify-between items-center border-b pb-2">
                <span class="text-gray-700 font-bold">Fondo Fima</span>
                <span class="text-gray-900 font-semibold">$1,030,091.00</span>
              </li>
              <li class="flex justify-between items-center border-b pb-2">
                <span class="text-gray-700 font-bold">CEDEARs</span>
                <span class="text-gray-900 font-semibold">$308,700.00</span>
              </li>
              <li class="flex justify-between items-center">
                <span class="text-gray-700 font-bold">MAF Ahorro Pesos</span>
                <span class="text-gray-900 font-semibold">$947,700.40</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BarraLateral from '../BarraLateral.vue'

export default {
  name: "PaginaPrincipal",
  components: {
    BarraLateral,
  },
  data() {
    return {
      activeButton: 'inicio',
      isSaldoVisible: true,
    };
  },
  methods: {
    toggleSaldoVisibility() {
      this.isSaldoVisible = !this.isSaldoVisible;
    },
  },
};
</script>