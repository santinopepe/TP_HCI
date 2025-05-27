import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/main.css';
import { useSecurityStore } from './components/store/securityStore.js';


library.add(faFacebook, faInstagram, faTwitter);
const pinia = createPinia(); 

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(pinia)

const security = useSecurityStore();
security.initialize();

app.mount('#app'); 

