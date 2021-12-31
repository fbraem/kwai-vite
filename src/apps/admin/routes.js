import Page from '/@theme/Page.vue';
import AdminSidebar from '/src/apps/admin/components/AdminSidebar.vue';
import AdminToolbar from '/src/apps/admin/components/AdminToolbar.vue';
import HomePage from '/src/apps/admin/pages/HomePage.vue';
import UsersPage from '/src/apps/admin/pages/UsersPage.vue';
import UserFormPage from '/src/apps/admin/pages/UserForm.vue';

export default [
  {
    path: '/',
    components: {
      sidebar: AdminSidebar,
      toolbar: AdminToolbar,
      default: Page
    },
    children: [
      {
        name: 'admin.home',
        path: '',
        component: HomePage,
        meta: {
          title: 'Administratie'
        }
      },
      {
        name: 'admin.users',
        path: '/users',
        component: UsersPage,
        meta: {
          title: 'Gebruikers'
        }
      },
      {
        name: 'admin.invite',
        path: '/users/invite',
        component: UsersPage
      },
      {
        name: 'admin.users.edit',
        path: '/users/edit/:uuid',
        component: UserFormPage,
        props: true,
        meta: {
          title: 'Wijzig Gebruiker'
        }
      }
    ]
  }
];
