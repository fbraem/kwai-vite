// Routes for applications on the portal
import ApplicationPage from '/@theme/apps/portal/pages/ApplicationPage.vue';
import ArticlePage from '/@theme/apps/portal/pages/ArticlePage.vue';

import judoImage from '/assets/portal/judo.jpg';
import clubImage from '/assets/portal/club.jpg';
import tournamentsImage from '/assets/portal/tournaments.jpg';
import shopImage from '/assets/portal/shop.jpg';

export default [
  {
    name: 'portal.club',
    path: '/club',
    component: ApplicationPage,
    props: (route) => ({
      name: 'club',
      image: clubImage
    }),
    meta: {
      title: 'Club',
      application: 'club'
    },
    children: [
      {
        path: ':id(\\d+)',
        props: (route) => ({
          id: parseInt(route.params.id)
        }),
        name: 'portal.club.article',
        component: ArticlePage
      }
    ]
  },
  {
    name: 'portal.tournaments',
    path: '/tournaments',
    component: ApplicationPage,
    props: (route) => ({
      name: 'tournaments',
      image: tournamentsImage
    }),
    meta: {
      title: 'Tornooien',
      application: 'tournaments'
    },
    children: [
      {
        path: ':id(\\d+)',
        props: (route) => ({
          id: parseInt(route.params.id)
        }),
        name: 'portal.tournaments.article',
        component: ArticlePage
      }
    ]
  },
  {
    name: 'portal.judo',
    path: '/judo',
    component: ApplicationPage,
    props: (route) => ({
      id: route.params.id,
      name: 'judo',
      image: judoImage
    }),
    meta: {
      title: 'Judo',
      application: 'judo'
    },
    children: [
      {
        path: ':id(\\d+)',
        props: (route) => ({
          id: parseInt(route.params.id)
        }),
        name: 'portal.judo.article',
        component: ArticlePage
      }
    ]
  },
  {
    name: 'portal.shop',
    path: '/shop',
    component: ApplicationPage,
    props: (route) => ({
      id: route.params.id,
      name: 'shop',
      image: shopImage
    }),
    meta: {
      title: 'Materiaal',
      application: 'shop'
    },
    children: [
      {
        path: ':id(\\d+)',
        props: (route) => ({
          id: parseInt(route.params.id)
        }),
        name: 'portal.shop.article',
        component: ArticlePage
      }
    ]
  }
];
