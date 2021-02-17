import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

import { abilitiesPlugin } from '@casl/vue';
import { ability } from '/src/common/useAuthentication.js';
app.use(abilitiesPlugin, ability);

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './router.js';
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

app.use(router);
app.mount('#app');
