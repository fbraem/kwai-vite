import HomePage from '/@theme/apps/portal/pages/HomePage.vue';
import Page from '/@theme/Page.vue';
import LoginPage from '/@theme/pages/LoginPage.vue';
import NewsPage from '/@theme/apps/portal/pages/NewsPage.vue';
import StoryPage from '/@theme/apps/portal/pages/StoryPage.vue';
import TrainingsPage from '/@theme/apps/portal/pages/TrainingsPage.vue';

import Sidebar from '/@theme/apps/portal/components/PortalSidebar.vue';
import Toolbar from '/@theme/apps/portal/components/Toolbar.vue';
import Footer from '/@theme/components/Footer.vue';

import extraRoutes from '/@theme/apps/portal/routes.js';

export default [
  {
    path: '/',
    components: {
      sidebar: Sidebar,
      toolbar: Toolbar,
      footer: Footer,
      default: Page
    },
    children: [
      {
        name: 'portal.home',
        path: '',
        component: HomePage
      },
      {
        name: 'portal.news',
        path: '/news',
        component: NewsPage,
        meta: {
          title: 'Nieuws',
          application: 'news'
        }
      },
      {
        name: 'portal.news.archive',
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
        name: 'portal.news.application',
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
        name: 'portal.news.story',
        path: '/news/:id(\\d+)',
        props: true,
        component: StoryPage,
        meta: {
          title: 'Nieuws',
          application: 'news'
        }
      },
      {
        name: 'portal.trainings',
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
    component: LoginPage,
    meta: {
      title: 'Login',
      layout: 'dialog'
    }
  }
];
