import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa tu configuración de router
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/main.css';

library.add(faFacebook, faInstagram, faTwitter);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router) // Usa el router con esta instancia
  .mount('#app'); // Monta esta misma instancia en el elemento #app