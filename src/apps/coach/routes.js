import Page from '/@theme/Page.vue';
import CoachSidebar from '/src/apps/coach/components/CoachSidebar.vue';
import CoachToolbar from '/src/apps/coach/components/CoachToolbar.vue';
import HomePage from '/src/apps/coach/pages/HomePage.vue';
import LoginPage from '/@theme/pages/LoginPage.vue';
import CoachPage from '/src/apps/coach/pages/CoachPage.vue';
import TrainingMomentsPage from '/src/apps/coach/pages/TrainingMomentsPage.vue';
import TrainingMomentPage from '/src/apps/coach/pages/TrainingMomentPage.vue';
import CoachForm from '/src/apps/coach/pages/CoachForm.vue';
import TrainingMomentForm from '/src/apps/coach/pages/TrainingMomentForm.vue';
import TrainingMomentCreateTrainingsPage from '/src/apps/coach/pages/TrainingMomentCreateTrainingsPage.vue';
import TrainingMomentTrainingsPage from '/src/apps/coach/pages/TrainingMomentTrainingsPage.vue';
import TrainingsPage from '/src/apps/coach/pages/TrainingsPage.vue';
import TrainingForm from '/src/apps/coach/pages/TrainingForm.vue';

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
        name: 'coach.edit',
        path: '/edit/:id(\\d+)',
        component: CoachForm,
        props: route => ({
          id: parseInt(route.params.id)
        }),
        meta: {
          title: 'Wijzig Coach'
        }
      },
      {
        name: 'coach.create',
        path: '/create',
        component: CoachForm,
        meta: {
          title: 'Maak Coach'
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
        },
        children: [
          {
            name: 'coach.training_moment.trainings.create',
            path: 'trainings_create',
            component: TrainingMomentCreateTrainingsPage,
            props: route => ({
              id: parseInt(route.params.id)
            })
          },
          {
            name: 'coach.training_moment.trainings',
            path: '',
            component: TrainingMomentTrainingsPage,
            props: route => ({
              id: parseInt(route.params.id)
            })
          }
        ]
      },
      {
        name: 'coach.training_moment.edit',
        path: '/training_moments/edit/:id(\\d+)',
        component: TrainingMomentForm,
        props: route => ({
          id: parseInt(route.params.id)
        }),
        meta: {
          title: 'Wijzig Trainingsmoment'
        }
      },
      {
        name: 'coach.training_moment.create',
        path: '/training_moments/create',
        component: TrainingMomentForm,
        meta: {
          title: 'Maak Trainingsmoment'
        }
      },
      {
        name: 'coach.trainings',
        path: '/trainings',
        component: TrainingsPage,
        meta: {
          title: 'Trainingen'
        }
      },
      {
        name: 'coach.trainings.create',
        path: '/trainings/create',
        component: TrainingForm,
        meta: {
          title: 'Maak Training'
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
