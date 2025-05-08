import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Registro/Login.vue';
import RegisterPage from '../components/Registro/Registro.vue';
import RecoverPassword from '../components/Registro/recuperar.vue';
import PrincipalPage from '../components/Inicio/PaginaPrincipal.vue';
import PerfilPage from '../components/Inicio/Perfil.vue';
import Actividad from '../components/Inicio/Actividad.vue';
import Transferecias from '../components/Inicio/Transferencias/Transferencias.vue';
import AdministracionDeTarjetas from '../components/Inicio/AdministracionDeTarjetas.vue';
import PagoDeServicios from '../components/Inicio/PagoDeServicios.vue';
import PagoServicio from '../components/Inicio/PagoServicio.vue';
import Notificaciones from '../components/Inicio/Notificaciones.vue';
import CambiarContraseña from '../components/Registro/CambiarContraseña.vue';


const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/registro', name: 'Register', component: RegisterPage },
  { path: '/recover-password', name: 'RecoverPassword', component: RecoverPassword },
  { path: '/paginaprincipal', name: 'Paginaprincipal', component: PrincipalPage },
  { path: '/perfil', name: 'Perfil', component: PerfilPage }, 
  { path: '/actividad', name: 'Actividad', component: Actividad},
  { path: '/transferir', name: 'Transferencias', component: Transferecias },
  { path: '/tarjetas', name: 'AdministracionDeTarjetas', component: AdministracionDeTarjetas },
  { path: '/pagoServicios', name: 'PagoDeServicios', component: PagoDeServicios },
  { path: '/pagoServicio/:serviceName/:serviceImage', name: 'PagoServicio', component: PagoServicio, props: true },
  { path: '/notificaciones', name: 'Notificaciones', component: Notificaciones},  
  { path: '/cambiarcontraseña', name: 'CambiarContraseña', component:  CambiarContraseña, props: true }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;