<template>
  <nav class="mt-10 text-white">
    <slot>
      <SidebarNavigationItem
        v-for="(route, index) in routes"
        :key="index"
        :route-name="route"
      />
    </slot>
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
