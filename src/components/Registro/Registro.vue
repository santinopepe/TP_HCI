<template>
  <div class="recover-password-container">
    <div class="card">
      <h2>Crear tu Cuenta</h2>
      <p>Completa los datos para registrarte en SIM SIM.</p>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="name">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div class="input-group">
          <label for="dni">DNI</label>
          <input
            type="text"
            id="dni"
            v-model="dni"
            placeholder="Ingresa tu DNI"
            required
          />
        </div>
        <div class="input-group">
          <label for="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            placeholder="Ingresa tu teléfono"
            required
          />
        </div>
        <button type="submit">Registrarse</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
      <p class="back-link">
        <router-link to="/login">Volver al Inicio de Sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistroPage',
  data() {
    return {
      name: '',
      email: '',
      dni: '',
      phone: '',
      error: ''
    };
  },
  methods: {
    register() {
      // TODO: Implement registration logic
      console.log('Registrando:', { name: this.name, email: this.email, dni: this.dni, phone: this.phone });
      // Ejemplo de validación simple
      if (!this.name || !this.email || !this.dni || !this.phone) {
        this.error = 'Por favor, completa todos los campos.';
        return;
      }
      this.error = ''; // Limpiar error si todo está bien
      // Aquí iría la lógica para enviar los datos al backend
      /*
      axios.post('/api/register', { name: this.name, email: this.email, dni: this.dni, phone: this.phone })
        .then(response => {
          alert('Registro exitoso. Inicia sesión para continuar.');
          this.$router.push('/login');
        })
        .catch(error => {
          this.error = 'Error al registrar. Intenta de nuevo.';
        });
      */
    }
  }
};
</script>

<style scoped>
.recover-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d3e4cd; /* Verde claro como en recuperar.vue */
  background-image: url('/images/fondo.png'); /* Imagen de fondo */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
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