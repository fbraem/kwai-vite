import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

import { abilitiesPlugin } from '@casl/vue';
import { ability } from '/src/common/useAuthentication.js';
app.use(abilitiesPlugin, ability);

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { router } from '/src/common/useRouter.js';
import routes from './routes.js';
console.log(routes);
routes.forEach(route => router.addRoute(route));

app.use(router);
app.mount('#app');
