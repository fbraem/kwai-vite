import Page from '/@theme/Page.vue';
import CoachSidebar from '/src/apps/coach/components/CoachSidebar.vue';
import CoachToolbar from '/src/apps/coach/components/CoachToolbar.vue';
import HomePage from '/src/apps/coach/pages/HomePage.vue';
import LoginPage from '/@theme/pages/LoginPage.vue';
import CoachPage from '/src/apps/coach/pages/CoachPage.vue';
import TrainingMomentsPage from '/src/apps/coach/pages/TrainingMomentsPage.vue';
import TrainingMomentPage from '/src/apps/coach/pages/TrainingMomentPage.vue';

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
      },
      {
        name: 'coach.training_moments',
        path: '/training_moments',
        component: TrainingMomentsPage,
        meta: {
          title: 'Trainingsmomenten'
        }
      },
      {
        name: 'coach.training_moment',
        path: '/training_moments/:id(\\d+)',
        component: TrainingMomentPage,
        props: route => ({
          id: parseInt(route.params.id)
        }),
        meta: {
          title: 'Trainingsmoment'
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
