import Page from '/@theme/Page.vue';
import LoginPage from '/@theme/pages/LoginPage.vue';
import HomePage from '/src/apps/author/pages/HomePage.vue';

export default [
  {
    path: '/',
    component: Page,
    children: [
      {
        name: 'author.home',
        path: '',
        component: HomePage
      },
      {
        path: '/author.news',
        components: {}
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: {
      title: 'Login',
      layout: 'dialog'
    }
  }
];
