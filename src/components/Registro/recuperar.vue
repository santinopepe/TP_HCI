<template>
  <div class="recover-password-container">
    <div class="card">
      <h2>Recuperar Contraseña</h2>
      <p>Ingresa tu Email o DNI para recuperar tu contraseña.</p>
      <form @submit.prevent="handleRecoverPassword">
        <div class="input-group">
          <label for="email-dni">Email o DNI</label>
          <input
            type="text"
            id="email-dni"
            v-model="emailOrDni"
            placeholder="Ingresa tu Email o DNI"
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      <p class="back-link">
        <router-link to="/">Volver al Inicio de Sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecoverPassword",
  data() {
    return {
      emailOrDni: "",
    };
  },
  methods: {
    handleRecoverPassword() {
      console.log("Enviando solicitud para:", this.emailOrDni);
    },
  },
};
</script>

<style scoped>
.recover-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d3e4cd; /* Verde claro como en la imagen */
  background-image: url("public/images/fondo.png"); /* Si tienes un patrón de fondo */
  background-size: cover;
}

.card {
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  color: #2e4b3f; /* Verde oscuro para el título */
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2e4b3f; /* Verde oscuro para el botón */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #3a5c4b;
}

.back-link {
  margin-top: 1rem;
}

.back-link a {
  color: #2e4b3f;
  text-decoration: none;
}

.back-link a:hover {
  text-decoration: underline;
}
</style>