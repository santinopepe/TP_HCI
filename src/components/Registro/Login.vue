<template>
  <div class="recover-password-container">
    <!-- Contenedor principal -->
    <div class="login-wrapper">
      <!-- Card que contiene todo -->
      <div class="card">
        <div class="card-content">
          <!-- Sección izquierda con logo y texto -->
          <div class="left-section">
            <h1>SIM SIM</h1>
            <img src="/images/logo.png" alt="Logo SIM SIM" class="logo" />
            <p class="tagline">Tu dinero, tu ritmo. Pagá fácil, viví sin límites.</p>
            <!-- Iconos de redes sociales -->
            <div class="social-icons">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter fa-lg"></i>
              </a>
            </div>
          </div>

          <!-- Sección derecha con el formulario -->
          <div class="form-section">
            <h2>Inicio de Sesión</h2>
            <form @submit.prevent="handleSubmit">
              <!-- Campo Email -->
              <div class="input-group">
                <label for="email">Email o DNI</label>
                <input
                  type="text"
                  id="email"
                  v-model="email"
                  placeholder="Ingresa tu Email o DNI"
                  required
                />
              </div>

              <!-- Campo Contraseña -->
              <div class="input-group">
                <label for="password">Contraseña</label>
                <div class="password-wrapper">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="toggle-password"
                  >
                    {{ showPassword ? 'Ocultar' : 'Mostrar' }}
                  </button>
                </div>
                <button
                  type="button"
                  @click="goToRecuperar"
                  class="recover-link"
                >
                  Recuperar contraseña
                </button>
              </div>

              <!-- Botón de Inicio -->
              <button type="submit" @click="goToPaginaPrincipal" >
              Inicio
              </button>
            </form> 

            <!-- Enlace de Registro -->
            <p class="back-link">
              ¿Aún no tienes cuenta?
              <router-link to="/registro">Regístrate</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    },
    goToRecuperar() {
      this.$router.push('/recover-password');
    },
    goToPaginaPrincipal() {
      this.$router.push('/paginaprincipal');
    },
  },
};
</script>