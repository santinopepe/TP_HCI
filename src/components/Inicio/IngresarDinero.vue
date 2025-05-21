<template>
  <div class="flex h-screen font-sans overflow-hidden items-center justify-center bg-gray-100">
    <BotonRetroceder />
    <!-- Contenido principal -->
    <main class="p-6">
      <div class="grid grid-cols-1 gap-6">
        <!-- Header con gradiente -->
        <div class="bg-gradient-to-r bg-[#3C4F2E] p-6 rounded-lg shadow-md text-center text-white relative h-44 flex items-center justify-center w-[32rem]">
          <div class="text-center">
            <h2 class="text-2xl font-bold">Ingresar Dinero</h2>
            <p class="text-lg mt-4">Compartí tu alias o CVU para recibir dinero de cuentas bancarias o digitales</p>
          </div>
        </div>

        <!-- Bloque con Alias y CVU -->
        <div class="bg-white p-6 rounded-lg shadow-md w-[32rem]">
          <div class="flex flex-col gap-4">
            <!-- Alias -->
            <div class="flex justify-between items-center border-b pb-2">
              <div class="flex flex-col">
                <span class="text-gray-500 text-sm">Tu alias</span>
                <span class="text-gray-700 font-semibold text-lg">{{ alias }}</span>
              </div>
            </div>
            <!-- CVU -->
            <div class="flex justify-between items-center border-b pb-2">
              <div class="flex flex-col">
                <span class="text-gray-500 text-sm">Tu CVU</span>
                <span class="text-gray-700 font-semibold text-lg">{{ cvu }}</span>
              </div>
            </div>
            <!-- Botón Compartir -->
            <button
              @click="shareData"
              class="bg-[#5D8C39] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#5D8C39]/80 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <img src="/images/share.png" alt="Compartir" class="w-5 h-5" />
              Compartir datos
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BotonRetroceder from "../BotonRetroceder.vue";

export default {
  name: "IngresarDinero",
  components: {
    BotonRetroceder,
  },
  data() {
    return {
      activeButton: 'ingresar-dinero',
      alias: 'jmarquez01',
      cvu: '00234819282019304576839',
    };
  },
  methods: {
    editAlias() {
      // Lógica para editar el alias (puede ser un modal o redirección)
      alert('Funcionalidad de edición de alias no implementada.');
    },
    copyAlias() {
      navigator.clipboard.writeText(this.alias).then(() => {
        alert('Alias copiado al portapapeles!');
      });
    },
    copyCvu() {
      navigator.clipboard.writeText(this.cvu).then(() => {
        alert('CVU copiado al portapapeles!');
      });
    },
  },
};
</script>