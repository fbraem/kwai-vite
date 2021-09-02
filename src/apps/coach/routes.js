import Page from '/@theme/Page.vue';
import CoachSidebar from '/src/apps/coach/components/CoachSidebar.vue';
import CoachToolbar from '/src/apps/coach/components/CoachToolbar.vue';
import HomePage from '/src/apps/coach/pages/HomePage.vue';
import LoginPage from '/@theme/pages/LoginPage.vue';
import CoachPage from '/src/apps/coach/pages/CoachPage.vue';

export default [
  {
    path: '/',
    components: {
      sidebar: CoachSidebar,
      toolbar: CoachToolbar,
      default: Page
    },
    children: [
      {
        name: 'coach.home',
        path: '',
        component: HomePage,
        meta: {
          title: 'Coaches'
        }
      },
      {
        name: 'coach.detail',
        path: '/:id(\\d+)',
        component: CoachPage,
        props: route => ({
          id: parseInt(route.params.id)
        }),
        meta: {
          title: 'Coach'
        }
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
