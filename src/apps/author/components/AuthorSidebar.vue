<template>
  <Sidebar>
    <SidebarLogo />
    <SidebarNavigation>
      <SidebarNavigationItem route-name="author.home" />
      <SidebarNavigationItem route-name="author.applications" />
      <SidebarNavigationItem route-name="author.news" />
      <SidebarNavigationItem route-name="author.articles" />
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
