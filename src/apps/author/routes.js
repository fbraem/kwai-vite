import Page from '/@theme/Page.vue';

export default [
  {
    path: '/',
    component: Page,
    children: [
      {
        name: 'author.home',
        path: '',
        component: null
      },
      {
        path: '/author.news',
        components: {}
      }
    ]
  },
  {
    name: 'author.login',
    path: '/login',
    component: LoginPage,
    meta: {
      title: 'Login',
      layout: 'dialog'
    }
  }
];
