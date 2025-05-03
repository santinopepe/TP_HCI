import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Registro/Login.vue';
import RegisterPage from '../components/Registro/Registro.vue';
import RecoverPassword from '../components/Registro/recuperar.vue';
import PrincipalPage from '../components/Inicio/PaginaPrincipal.vue'; 

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/registro', name: 'Register', component: RegisterPage },
  { path: '/recover-password', name: 'RecoverPassword', component: RecoverPassword },
  { path: '/paginaprincipal', name: 'Paginaprincipal', component: PrincipalPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;