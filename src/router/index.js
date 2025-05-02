import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Registro/Login.vue';
import RegisterPage from '../components/Registro/Registro.vue';
import RecoverPassword from '../components/Registro/recuperar.vue';
import PrincipalPage from '../components/Inicio/PaginaPrincipal.vue'; // Asegúrate de que la ruta sea correcta

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/login', name: 'LoginPage', component: LoginPage }, // Ruta para Login.vue
  { path: '/registro', name: 'Register', component: RegisterPage },
  { path: '/recover-password', name: 'RecoverPassword', component: RecoverPassword }, // Ruta correcta
  { path: '/paginaprincipal', name: 'Paginaprincipal', component: PrincipalPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;