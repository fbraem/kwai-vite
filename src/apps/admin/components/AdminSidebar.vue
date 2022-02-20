<template>
  <Sidebar>
    <SidebarLogo />
    <SidebarNavigation>
      <SidebarNavigationItem route-name="admin.home" />
      <SidebarNavigationItem route-name="admin.users" />
      <SidebarNavigationItem route-name="admin.user_invitations" />
    </SidebarNavigation>
  </Sidebar>
</template>

<script setup>
import SidebarLogo from '/@theme/components/SidebarLogo.vue';
import SidebarNavigation from '/@theme/components/SidebarNavigation.vue';
import SidebarNavigationItem from '/@theme/components/SidebarNavigationItem.vue';
import Sidebar from '/src/components/sidebar/Sidebar.vue';
</script>
