import IndexApp from '/theme/kwai/index/App.vue';
import LoginPage from '/src/pages/Login.vue';

export default [
  {
    name: 'home',
    path: '/',
    component: IndexApp,
    meta: {
    }
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: {
      title: 'Login'
    }
  }
];
