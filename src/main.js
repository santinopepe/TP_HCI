import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Importa Pinia
import App from './App.vue';
import router from './router'; // Importa tu configuración de router
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/main.css';
import { useSecurityStore } from './components/store/securityStore.js';


library.add(faFacebook, faInstagram, faTwitter);
const pinia = createPinia(); // Crea una instancia de Pinia

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)// Usa el router con esta instancia
  .use(pinia)

// Inicializa el securityStore para cargar el token y usuario si existen
const security = useSecurityStore();
security.initialize();

app.mount('#app'); // Monta esta misma instancia en el elemento #app

