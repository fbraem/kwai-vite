// Routes for applications on the portal
import ApplicationPage from '/@theme/portal/pages/ApplicationPage.vue';

import judoImage from '/assets/portal/judo.jpg';
import clubImage from '/assets/portal/club.jpg';
import tournamentsImage from '/assets/portal/tournaments.jpg';
import shopImage from '/assets/portal/shop.jpg';

export default [
  {
    name: 'club',
    path: '/club',
    component: ApplicationPage,
    props: {
      name: 'club',
      image: clubImage
    },
    meta: {
      title: 'Club'
    }
  },
  {
    name: 'tournaments',
    path: '/tournaments',
    component: ApplicationPage,
    props: {
      name: 'tournaments',
      image: tournamentsImage
    },
    meta: {
      title: 'Tornooien'
    }
  },
  {
    name: 'judo',
    path: '/judo',
    component: ApplicationPage,
    props: {
      name: 'judo',
      image: judoImage
    },
    meta: {
      title: 'Judo'
    }
  },
  {
    name: 'shop',
    path: '/shop',
    component: ApplicationPage,
    props: {
      name: 'shop',
      image: shopImage
    },
    meta: {
      title: 'Materiaal'
    }
  }
];
