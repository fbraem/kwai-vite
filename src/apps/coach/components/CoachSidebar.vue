<template>
  <Sidebar>
    <SidebarLogo />
    <SidebarNavigation />
  </Sidebar>
</template>

<script>
import Sidebar from '/src/components/sidebar/Sidebar.vue';
import SidebarLogo from '/@theme/components/SidebarLogo.vue';
import SidebarNavigation from '/@theme/components/SidebarNavigation.vue';

export default {
  components: { SidebarNavigation, SidebarLogo, Sidebar }
};
</script>
