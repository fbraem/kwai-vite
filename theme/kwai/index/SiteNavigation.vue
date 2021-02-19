<template>
  <Navigation
      :title="title"
      :url="url"
      :right-menu="rightMenu"
  >
  </Navigation>
</template>

<style scoped>
</style>

<script>
import Navigation from '/@theme/components/Navigation.vue';
import useAuthentication from '/src/common/useAuthentication.js';
import config from '/src/config/config.yaml';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    Navigation
  },
  setup() {
    const router = useRouter();
    const { isLoggedIn, logout } = useAuthentication();
    const rightMenu = computed(() => {
      const menu = [
        {
          name: 'facebook',
          title: 'Facebook',
          url: config.contact.facebook,
          icon: 'fab fa-facebook'
        }
      ];
      if (isLoggedIn.value) {
        menu.push({
          name: 'logout',
          title: 'Logout',
          icon: 'fas fa-unlock',
          method: () => {
            logout();
            router.push({
              name: 'home'
            });
          }
        });
      } else {
        menu.push({
          name: 'login',
          title: 'Login',
          icon: 'fas fa-lock',
          route: {
            name: 'login'
          }
        });
      }
      return menu;
    });

    return {
      title: config.website.title,
      url: config.contact.website.url + '/#',
      rightMenu
    }
  }
}
</script>
