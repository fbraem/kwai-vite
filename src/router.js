import IndexApp from '/theme/kwai/index/App.vue';
import LoginPage from '/src/pages/Login.vue';

export default [
  { path: '/', component: IndexApp, name: 'home' },
  { path: '/login', component: LoginPage, name: 'login' }
];
