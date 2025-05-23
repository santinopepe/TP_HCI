<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative min-h-[400px] flex flex-col"
    >
      <div
        class="absolute top-4 right-4 bg-[#3C4F2E] rounded-lg px-3 py-1 text-sm text-white font-medium shadow-sm"
      >
        Paso 2 de 3
      </div>
      <div class="mt-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2 text-center">
          Cambiar Contraseña
        </h1>

        <p class="text-gray-600 mb-6 text-center">
          Ingresa tu nueva contraseña y confírmala.
        </p>
        <form @submit.prevent="handleSubmit" class="flex flex-col flex-grow">
          <div class="mb-4">
            <label
              for="newPassword"
              class="block text-gray-700 font-medium mb-2"
              >Nueva Contraseña</label
            >
            <input
              type="password"
              id="newPassword"
              :value="newPassword"
              @input="$emit('update:newPassword', $event.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa tu nueva contraseña"
            />
            <p
              v-if="showErrors && !newPassword"
              class="text-red-500 text-xs mt-1"
            >
              Este campo es obligatorio
            </p>
          </div>
          <div class="mb-4">
            <label
              for="confirmPassword"
              class="block text-gray-700 font-medium mb-2"
              >Confirmar Contraseña</label
            >
            <input
              type="password"
              id="confirmPassword"
              :value="confirmPassword"
              @input="$emit('update:confirmPassword', $event.target.value)"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Repite tu nueva contraseña"
            />
            <p
              v-if="showErrors && !confirmPassword"
              class="text-red-500 text-xs mt-1"
            >
              Este campo es obligatorio
            </p>
          </div>

          <div class="mt-auto">
            <p
              v-if="errorMessage"
              class="text-red-500 text-sm mb-4 text-center"
            >
              {{ errorMessage }}
            </p>

            <div class="flex justify-between pt-4">
              <button
                type="button"
                @click="handleBack"
                class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
              >
                Volver
              </button>
              <button
                type="submit"
                class="bg-[#5D8C39] text-white py-2 px-4 rounded-lg hover:bg-[#5D8C39]/80"
              >
                Actualizar Contraseña
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActualizacionContrasenia",
  props: {
    newPassword: String,
    confirmPassword: String,
    errorMessage: String,
  },
  data() {
    return {
      showErrors: false,
    };
  },
  methods: {
    handleSubmit() {
      this.showErrors = true;
      if (this.newPassword && this.confirmPassword) {
        this.$emit("update-password");
      }
    },
    handleBack() {
      this.showErrors = false;
      this.$emit("back-to-step-1");
    },
  },
  emits: [
    "update:newPassword",
    "update:confirmPassword",
    "update-password",
    "back-to-step-1",
  ],
};
</script>
