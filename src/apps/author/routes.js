import Page from '/@theme/Page.vue';
import AuthorSidebar from '/src/apps/author/components/AuthorSidebar.vue';
import AuthorToolbar from '/src/apps/author/components/AuthorToolbar.vue';
import HomePage from '/src/apps/author/pages/HomePage.vue';
import NewsPage from '/src/apps/author/pages/NewsPage.vue';
import ApplicationsPage from '/src/apps/author/pages/ApplicationsPage.vue';
import ApplicationForm from '/src/apps/author/pages/ApplicationForm.vue';
import LoginPage from '/@theme/pages/LoginPage.vue';
import NewsStoryForm from '/src/apps/author/pages/NewsStoryForm.vue';
import ArticlesPage from '/src/apps/author/pages/ArticlesPage.vue';
import ArticleForm from '/src/apps/author/pages/ArticleForm.vue';

export default [
  {
    path: '/',
    components: {
      sidebar: AuthorSidebar,
      toolbar: AuthorToolbar,
      default: Page
    },
    children: [
      {
        name: 'author.home',
        path: '',
        component: HomePage,
        meta: {
          title: 'Auteursomgeving'
        }
      },
      {
        name: 'author.applications',
        path: '/applications',
        component: ApplicationsPage,
        meta: {
          title: 'Applicaties'
        }
      },
      {
        name: 'author.applications.edit',
        path: '/applications/edit/:id(\\d+)',
        props: route => ({
          id: parseInt(route.params.id)
        }),
        component: ApplicationForm,
        meta: {
          title: 'Applicaties'
        }
      },
      {
        name: 'author.news',
        path: '/news',
        component: NewsPage,
        meta: {
          title: 'Nieuwsberichten'
        }
      },
      {
        name: 'author.news.edit',
        path: '/news/edit/:id(\\d+)',
        props: true,
        component: NewsStoryForm,
        meta: {
          title: 'Nieuwsbericht'
        }
      },
      {
        name: 'author.news.create',
        path: '/news/create',
        component: NewsStoryForm,
        meta: {
          title: 'Nieuwsbericht'
        }
      },
      {
        name: 'author.articles',
        path: '/articles',
        component: ArticlesPage,
        meta: {
          title: 'Artikels'
        }
      },
      {
        name: 'author.articles.edit',
        path: '/articles/edit/:id(\\d+)',
        props: true,
        component: ArticleForm,
        meta: {
          title: 'Nieuwsbericht'
        }
      },
      {
        name: 'author.articles.create',
        path: '/articles/create',
        component: ArticleForm,
        meta: {
          title: 'Artikels'
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
