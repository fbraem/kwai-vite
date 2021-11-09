<template>
  <Sidebar>
    <SidebarLogo />
    <SidebarNavigation>
      <SidebarNavigationItem route-name="coach.home" />
      <SidebarNavigationItem route-name="coach.training_moments" />
      <SidebarNavigationItem route-name="coach.trainings" />
    </SidebarNavigation>
  </Sidebar>
</template>

<script>
import Sidebar from '/src/components/sidebar/Sidebar.vue';
import SidebarLogo from '/@theme/components/SidebarLogo.vue';
import SidebarNavigation from '/@theme/components/SidebarNavigation.vue';
import SidebarNavigationItem from '/@theme/components/SidebarNavigationItem.vue';

export default {
  components: { SidebarNavigationItem, SidebarNavigation, SidebarLogo, Sidebar }
};
</script>
