<template>
  <Sidebar>
    <SidebarLogo />
    <SidebarNavigation :routes="linkedApplications" />
  </Sidebar>
</template>

<script>
import Sidebar from '/src/components/sidebar/Sidebar.vue';
import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import SidebarNavigation from '/@theme/components/SidebarNavigation.vue';
import SidebarLogo from '/@theme/components/SidebarLogo.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { SidebarLogo, Sidebar, SidebarNavigation },
  setup() {
    const store = useApplicationStore();
    store.load();

    const router = useRouter();
    const linkedApplications = computed(() => {
      const routes = [];
      store.applications.forEach((application) => {
        const route = router.getRoutes().find((route) => route.name === 'portal.' + application.name);
        if (route) {
          routes.push(route.name);
        }
      });
      return routes;
    });

    return {
      linkedApplications
    };
  }
};
</script>
