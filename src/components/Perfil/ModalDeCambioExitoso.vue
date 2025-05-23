<template>
  <transition name="fade">
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative min-h-[400px] flex flex-col">
        <div
          class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
        >
          Paso 3 de 3
        </div>

        <div class="flex flex-col items-center flex-grow justify-center">
          <svg class="w-14 h-14 mb-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="#e6fbe6"/>
            <path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M8 12l3 3 5-5"/>
          </svg>
          <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">Contraseña actualizada</h2>
          <p class="text-gray-600 mb-6 text-center">Tu contraseña fue actualizada exitosamente.</p>
        </div>

        <div class="flex justify-center mt-auto">
          <button
            @click="$emit('close')"
            class="bg-[#5D8C39] text-white px-6 py-2 rounded-lg hover:bg-[#5D8C39] focus:outline-none"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CambioExitoso",
  emits: ['close'],
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>