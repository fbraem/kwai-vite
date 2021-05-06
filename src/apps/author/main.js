import { createApp } from 'vue';
import App from '/src/App.vue';
const app = createApp(App);

import { abilitiesPlugin } from '@casl/vue';
import { ability } from '/src/common/useAuthentication.js';
app.use(abilitiesPlugin, ability);

import '/src/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { router } from '/src/common/useRouter.js';
import routes from '/src/apps/author/routes.js';
routes.forEach(route => router.addRoute(route));

import DefaultLayout from '/@theme/layouts/DefaultLayout.vue';
import EmptyLayout from '/@theme/layouts/EmptyLayout.vue';
app.component('DefaultLayout', DefaultLayout);
app.component('EmptyLayout', EmptyLayout);

app.use(router);
app.mount('#app');
