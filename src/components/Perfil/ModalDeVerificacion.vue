<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative min-h-[400px] flex flex-col">
      <div
          class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
        >
          Paso 1 de 3
        </div>

      <div class="pt-10 flex-grow"> <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Cambiar Contraseña</h1>

        <p class="text-gray-600 mb-4 text-center">
          Por favor, ingresa el código que se envió a tu correo electrónico.
        </p>
        <form @submit.prevent="$emit('verify-code')" class="flex flex-col h-full"> <div class="mb-4">
            <label for="code" class="block text-gray-700 font-medium mb-2">Código</label>
            <input
              type="text"
              id="code"
              :value="code"
              @input="$emit('update:code', $event.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa el código"
              required
            />
          </div>
          <p v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">
            {{ errorMessage }}
          </p>

          <div class="flex justify-between mt-auto pt-4">
            <button
              type="button"
              @click="$emit('cancel')"
              class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-[#5D8C39] text-white py-2 px-4 rounded-lg hover:bg-[#5D8C39]/80"
            >
              Verificar Código
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeVerificationModal",
  props: {
    code: String,
    errorMessage: String,
  },
  emits: ['update:code', 'verify-code', 'cancel'],
};
</script>
