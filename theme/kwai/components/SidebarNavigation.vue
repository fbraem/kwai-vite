<template>
  <nav class="mt-10 text-white">
    <SidebarNavigationItem
      v-for="applicationRoute in applicationRoutes"
      :key="applicationRoute.name"
      :route="applicationRoute"
    />
  </nav>
</template>

<script>
import SidebarNavigationItem from '/@theme/components/SidebarNavigationItem.vue';

export default {
  components: { SidebarNavigationItem },
  props: {
    applicationRoutes: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
  }
};
</script>
