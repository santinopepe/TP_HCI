import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Registro/Login.vue';
import RegisterPage from '../components/Registro/Registro.vue';
import RecoverPassword from '../components/Registro/recuperar.vue';
import PrincipalPage from '../components/Inicio/PaginaPrincipal.vue';
import PerfilPage from '../components/Perfil/Perfil.vue';
import Actividad from '../components/Actividad/Actividad.vue';
import Transferecias from '../components/Transferencias/Transferencias.vue';
import TransferenciasNuevoContacto from '../components/Transferencias/TransferenciasNuevoContacto.vue';
import TransferenciaFormulario from '../components/Transferencias/TransferenciaFormulario.vue';
import ComprobanteTransferencia from '../components/Transferencias/ComprobanteTransferencia.vue';
import AdministracionDeTarjetas from '../components/Tarjetas/AdministracionDeTarjetas.vue';
import PagoDeServicios from '../components/PagoServicios/PagoDeServicios.vue';
import PagoServicio from '../components/PagoServicios/PagoServicio.vue';
import Inversiones from '../components/Inversiones/Inversiones.vue';
import CambiarContraseña from '../components/Perfil/CambiarContraseña.vue';
import IngresarDinero from '../components/Inicio/IngresarDinero.vue';
import CobroDeServicios from '../components/CobroDeServicios/cobroDeServicios.vue';
import TuCVU from '../components/Inicio/CVU.vue';

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/registro', name: 'Register', component: RegisterPage },
  { path: '/recover-password', name: 'RecoverPassword', component: RecoverPassword },
  { path: '/paginaprincipal', name: 'Paginaprincipal', component: PrincipalPage },
  { path: '/perfil', name: 'Perfil', component: PerfilPage }, 
  { path: '/actividad', name: 'Actividad', component: Actividad},
  { path: '/transferir', name: 'Transferencias', component: Transferecias },
  { path: '/transferirNuevoContacto', name: 'TransferenciasNuevoContacto', component: TransferenciasNuevoContacto },
  { path: '/tarjetas', name: 'AdministracionDeTarjetas', component: AdministracionDeTarjetas },
  { path: '/pagoServicios', name: 'PagoDeServicios', component: PagoDeServicios },
  { path: '/pagoServicio/:serviceName/:serviceImage', name: 'PagoServicio', component: PagoServicio, props: true },
  { path: '/inversiones', name: 'Inversiones', component: Inversiones },
  { path: '/cambiarcontraseña', name: 'CambiarContraseña', component: CambiarContraseña, props: true }, 
  { path: '/ingresar-dinero', name: 'IngresarDinero', component: IngresarDinero, props: true },
  { path: '/transferenciaFormulario/:contactoNombre', name: 'TransferenciaFormulario', component: TransferenciaFormulario, props: true },
  { path: '/comprobanteTransferencia/:destinatario', name: 'ComprobanteTransferencia', component: ComprobanteTransferencia, props: true },  
  { path: '/cobrodeservicios', name: 'CobroDeServicios', component: CobroDeServicios},
  { path: '/cvu', name: 'Cvu', component: TuCVU },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;