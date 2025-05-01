import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Registro/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login', // Redirige la raíz a la página de login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;