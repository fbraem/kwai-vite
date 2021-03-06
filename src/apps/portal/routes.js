import HomePage from '/@theme/index/pages/HomePage.vue';
import Page from '/@theme/Page.vue';
import LoginPage from '/@theme/index/pages/LoginPage.vue';
import NewsPage from '/@theme/index/pages/NewsPage.vue';
import StoryPage from '/@theme/index/pages/StoryPage.vue';
import SiteNavigation from '/@theme/index/SiteNavigation.vue';
import Footer from '/@theme/index/Footer.vue';
import SimpleNavigation from '/@theme/index/SimpleNavigation.vue';

export default [
  {
    name: 'home',
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
          title: 'Nieuws'
        }
      },
      {
        name: 'news.archive',
        path: '/news/archive/:year(\\d+)/:month(\\d+)',
        props: route => ({
          year: parseInt(route.params.year),
          month: parseInt(route.params.month)
        }),
        component: NewsPage
      },
      {
        name: 'news.application',
        path: '/news/application/:app(\\d+)',
        props: true,
        component: NewsPage
      },
      {
        name: 'news.story',
        path: '/news/:id(\\d+)',
        props: true,
        component: StoryPage,
        meta: {
          title: 'Nieuws'
        }
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    components: {
      navigation: SimpleNavigation,
      default: LoginPage
    },
    meta: {
      title: 'Login'
    }
  }
];
