<template>
  <nav class="mt-10 text-white">
    <SidebarNavigationItem
      v-for="route in routes"
      :key="route.name"
      :route="route"
    />
  </nav>
</template>

<script>
import SidebarNavigationItem from '/@theme/components/SidebarNavigationItem.vue';

export default {
  components: { SidebarNavigationItem },
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
  }
};
</script>
