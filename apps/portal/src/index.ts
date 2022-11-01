import { createApp } from 'vue';

import App from './App.vue';
import './index.css';
import '@kwai/ui/style.css';

import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
});
routes.forEach(route => router.addRoute(route));
app.use(router);

app.mount('#app');
