import HomePage from '/@theme/portal/pages/HomePage.vue';
import Page from '/@theme/Page.vue';
import LoginPage from '/@theme/portal/pages/LoginPage.vue';
import NewsPage from '/@theme/portal/pages/NewsPage.vue';
import StoryPage from '/@theme/portal/pages/StoryPage.vue';
import SiteNavigation from '/@theme/portal/SiteNavigation.vue';
import Footer from '/@theme/portal/Footer.vue';
import SimpleNavigation from '/@theme/portal/SimpleNavigation.vue';
import TrainingsPage from '/@theme/portal/pages/TrainingsPage.vue';

import extraRoutes from '/@theme/portal/routes.js';
import CoachPage from '/src/apps/portal/pages/CoachPage.vue';

export default [
  {
    path: '/',
    components: {
      navigation: SiteNavigation,
      default: Page,
      footer: Footer
    },
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        name: 'news',
        path: '/news',
        component: NewsPage,
        meta: {
          title: 'Nieuws',
          application: 'news'
        }
      },
      {
        name: 'news.archive',
        path: '/news/archive/:year(\\d+)/:month(\\d+)',
        props: route => ({
          year: parseInt(route.params.year),
          month: parseInt(route.params.month)
        }),
        component: NewsPage,
        meta: {
          title: 'Nieuws',
          application: 'news'
        }
      },
      {
        name: 'news.application',
        path: '/news/application/:application_id(\\d+)',
        props: route => ({
          application_id: parseInt(route.params.application_id)
        }),
        component: NewsPage,
        meta: {
          title: 'Nieuws',
          application: 'news'
        }
      },
      {
        name: 'news.story',
        path: '/news/:id(\\d+)',
        props: true,
        component: StoryPage,
        meta: {
          title: 'Nieuws',
          application: 'news'
        }
      },
      {
        name: 'trainings',
        path: '/trainings',
        component: TrainingsPage,
        meta: {
          title: 'Trainingen',
          application: 'trainings'
        }
      },
      ...extraRoutes
    ]
  },
  {
    name: 'login',
    path: '/login',
    components: {
      navigation: SimpleNavigation,
      default: LoginPage
    },
    meta: {
      title: 'Login',
      layout: 'dialog'
    }
  },
  {
    name: 'coach',
    path: '/coach',
    components: {
      navigation: SiteNavigation,
      default: CoachPage
    },
    meta: {
      title: 'Coach'
    }
  }
];
