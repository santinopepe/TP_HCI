import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Registro/Login.vue';
import RegisterPage from '../components/Registro/Registro.vue';
import RecoverPassword from '../components/Registro/recuperar.vue';
import PrincipalPage from '../components/Inicio/PaginaPrincipal.vue';
import PerfilPage from '../components/Inicio/Perfil.vue';
import Actividad from '../components/Inicio/Actividad.vue';
import Transferecias from '../components/Inicio/Transferencias/Transferencias.vue';

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/registro', name: 'Register', component: RegisterPage },
  { path: '/recover-password', name: 'RecoverPassword', component: RecoverPassword },
  { path: '/paginaprincipal', name: 'Paginaprincipal', component: PrincipalPage },
  { path: '/perfil', name: 'Perfil', component: PerfilPage }, // Agrega la nueva ruta
  { path: '/actividad', name: 'Actividad', component: Actividad},
  { path: '/transferir', name: 'Transferencias', component: Transferecias },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;