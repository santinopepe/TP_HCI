<template>
  <aside
    class="bg-[url('/images/fondo.png')] text-white w-1/5 p-4 flex flex-col h-full bg-cover bg-center"
  >
    <div class="flex items-center mb-8 hoover:cursor-pointer">
      <img
        src="/images/logo.png"
        alt="Logo SIM SIM"
        class="w-16 h-16 mx-auto cursor-pointer transition-transform duration-300 hover:scale-110"
        @click="goToInicio"
      />
    </div>
    <nav class="menu flex flex-col gap-4">
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{
          'bg-[#3C4F2E]': activeButton === 'inicio',
          'hover:bg-[#3C4F2E]/80': activeButton !== 'inicio',
        }"
        @click.prevent="goToInicio"
      >
        <img src="/images/home.png" alt="Inicio" class="w-6 h-6" />
        <span>Inicio</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{
          'bg-[#3C4F2E]': activeButton === 'actividad',
          'hover:bg-[#3C4F2E]/80': activeButton !== 'actividad',
        }"
        @click.prevent="goToActividad"
      >
        <img src="/images/actividad.png" alt="Actividad" class="w-6 h-6" />
        <span>Actividad</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{
          'bg-[#3C4F2E]': activeButton === 'perfil',
          'hover:bg-[#3C4F2E]/80': activeButton !== 'perfil',
        }"
        @click.prevent="goToPerfil"
      >
        <img src="/images/profile.png" alt="Perfil" class="w-6 h-6" />
        <span>Perfil</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{
          'bg-[#3C4F2E]': activeButton === 'transferir',
          'hover:bg-[#3C4F2E]/80': activeButton !== 'transferir',
        }"
        @click.prevent="goToTransferir"
      >
        <div class="relative top-1">
          <img
            src="/images/flechaArriba.png"
            alt="Flecha Arriba"
            class="w-4 h-4 absolute bottom-5 left-1"
          />
          <img src="/images/transferir.png" alt="Transferir" class="w-6 h-6" />
        </div>
        <span>Transferir</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{
          'bg-[#3C4F2E]': activeButton === 'tarjetas',
          'hover:bg-[#3C4F2E]/80': activeButton !== 'tarjetas',
        }"
        @click.prevent="goToTarjetas"
      >
        <img src="/images/agregarTarjeta.png" alt="Tarjetas" class="w-6 h-6" />
        <span>Tarjetas</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{
          'bg-[#3C4F2E]': activeButton === 'CobroDeServicios',
          'hover:bg-[#3C4F2E]/80': activeButton !== 'CobroDeServicios',
        }"
        @click.prevent="goToCobroDeServicios"
      >
        <img src="/images/cobro.png" alt="Cobro de Servicios" class="w-6 h-6" />
        <span>Cobro de servicios</span>
      </a>
    </nav>
    <div class="mt-auto flex justify-center">
      <button
        class="flex justify-between items-center gap-2 bg-[#5D8C39] hover:bg-[#5D8C39]/80 p-3 rounded-xl w-60 border-none cursor-pointer"
        @click.prevent="goToInicioSesion"
      >
        <span>Cerrar sesión</span>
        <img src="/images/logout.png" alt="Cerrar Sesión" class="w-6 h-6" />
      </button>
    </div>
  </aside>
</template>

<script>
import { useSecurityStore } from "../components/store/securityStore";

export default {
  name: "BarraLateral",
  props: {
    activeButton: {
      type: String,
      default: "inicio",
    },
  },
  methods: {
    setActiveButton(button) {
      this.$emit("update:activeButton", button);
    },
    goToInicio() {
      if (this.$router) this.$router.push("/paginaprincipal");
    },
    async goToInicioSesion() {
      const security = useSecurityStore();
      await security.logout();
      if (this.$router) this.$router.push("/");
    },
    goToActividad() {
      if (this.$router) this.$router.push("/actividad");
    },
    goToPerfil() {
      if (this.$router) this.$router.push("/perfil");
    },
    goToTransferir() {
      if (this.$router) this.$router.push("/transferir");
    },
    goToTarjetas() {
      if (this.$router) this.$router.push("/tarjetas");
    },
    goToNotifiacaciones() {
      if (this.$router) this.$router.push("/notificaciones");
    },
    goToCobroDeServicios() {
      if (this.$router) this.$router.push("/cobrodeservicios");
    },
  },
};
</script>
