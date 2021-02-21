import HomePage from '/@theme/index/Home.vue';
import Page from '/@theme/Page.vue';
import LoginPage from '/@theme/index/pages/LoginPage.vue';
import NewsPage from '/@theme/index/pages/NewsPage.vue';
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
      }
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
