<template>
  <aside class="bg-[url('/images/fondo.png')] text-white w-1/5 p-4 flex flex-col h-full bg-cover bg-center">
    <div class="flex items-center mb-8">
      <img src="/images/logo.png" alt="Logo SIM SIM" class="w-16 h-16 mx-auto" />
    </div>
    <nav class="menu flex flex-col gap-4">
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{'bg-[#3C4F2E]': activeButton === 'inicio', 'hover:bg-[#3C4F2E]/50': activeButton !== 'inicio'}"
        @click.prevent="goToInicio"
      >
        <img src="/images/home.png" alt="Inicio" class="w-6 h-6" />
        <span>Inicio</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{'bg-[#3C4F2E]': activeButton === 'actividad', 'hover:bg-[#3C4F2E]/50': activeButton !== 'actividad'}"
        @click.prevent="goToActividad"
      >
        <img src="/images/actividad.png" alt="Actividad" class="w-6 h-6" />
        <span>Actividad</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{'bg-[#3C4F2E]': activeButton === 'perfil', 'hover:bg-[#3C4F2E]/50': activeButton !== 'perfil'}"
        @click.prevent="goToPerfil"
      >
        <img src="/images/profile.png" alt="Perfil" class="w-6 h-6" />
        <span>Perfil</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{'bg-[#3C4F2E]': activeButton === 'transferir', 'hover:bg-[#3C4F2E]/50': activeButton !== 'transferir'}"
        @click.prevent="goToTransferir"
      >
        <div class="relative top-1">
          <img src="/images/flechaArriba.png" alt="Flecha Arriba" class="w-4 h-4 absolute bottom-5 left-1" />
          <img src="/images/transferir.png" alt="Transferir" class="w-6 h-6" />
        </div>
        <span>Transferir</span>
      </a>
      <!-- <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{'bg-[#3C4F2E]': activeButton === 'inversiones', 'hover:bg-[#3C4F2E]/50': activeButton !== 'inversiones'}"
        @click.prevent="goToInversiones"
      >
        <img src="/images/Inversiones.png" alt="Inversiones" class="w-6 h-6" />
        <span>Inversiones</span>
      </a> -->
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{'bg-[#3C4F2E]': activeButton === 'pagoServicios', 'hover:bg-[#3C4F2E]/50': activeButton !== 'pagoServicios'}"
        @click.prevent="goToPagoServicios"
      >
        <img src="/images/pagosDeServicios.png" alt="Pago de Servicios" class="w-6 h-6" />
        <span>Pago de Servicios</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{'bg-[#3C4F2E]': activeButton === 'tarjetas', 'hover:bg-[#3C4F2E]/50': activeButton !== 'tarjetas'}"
        @click.prevent="goToTarjetas"
      >
        <img src="/images/agregarTarjeta.png" alt="Tarjetas" class="w-6 h-6" />
        <span>Tarjetas</span>
      </a>
      <a
        href="#"
        class="flex items-center gap-2 p-2 rounded"
        :class="{'bg-[#3C4F2E]': activeButton === 'notificaciones', 'hover:bg-[#3C4F2E]/50': activeButton !== 'notificaciones'}"
        @click.prevent="setActiveButton('notificaciones')"
      >
        <img src="/images/Notificaciones.png" alt="Notificaciones" class="w-6 h-6" />
        <span>Notificaciones</span>
      </a>
    </nav>
    <div class="mt-auto flex justify-center">
      <button
        class="flex justify-between items-center gap-2 bg-[#5D8C39] hover:bg-[#15803d] p-3 rounded-xl w-60 border-none cursor-pointer"
        @click.prevent="goToInicioSesion"
      >
        <span>Cerrar Sesión</span>
        <img src="/images/logout.png" alt="Cerrar Sesión" class="w-6 h-6" />
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'BarraLateral',
  props: {
    activeButton: {
      type: String,
      default: 'inicio',
    },
  },
  methods: {
    setActiveButton(button) {
      this.$emit('update:activeButton', button);
    },
    goToInicio() {
      if (this.$router) this.$router.push('/paginaprincipal');
    },
    goToInicioSesion() {
      if (this.$router) this.$router.push('/');
    },
    goToActividad() {
      if (this.$router) this.$router.push('/actividad');
    },
    goToPerfil() {
      if (this.$router) this.$router.push('/perfil');
    },
    goToTransferir() {
      if (this.$router) this.$router.push('/transferir');
    },
    goToInversiones() {
      if (this.$router) this.$router.push('/inversiones');
    },
    goToPagoServicios() {
        if (this.$router) this.$router.push('/pagoServicios');
    },
    goToTarjetas() {
      if (this.$router) this.$router.push('/tarjetas');
    },
  },
};

</script>

