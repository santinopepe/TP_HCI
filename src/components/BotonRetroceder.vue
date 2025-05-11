<template>
    <div class="absolute top-4 left-4">
        <button
            @click="goBack"
            class="bg-[#5D8C39] text-white p-2 rounded-xl shadow-md hover:bg-[#5D8C39]/80 transition-colors flex items-center justify-center"
        >
            <div class="flex items-center justify-center w-full h-full">
                <img src="/images/back.png" alt="Retroceder" class="w-6 h-6" />
            </div>
        </button>
    </div>
</template>

<script>
export default {
  name: "BotonRetroceder",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>