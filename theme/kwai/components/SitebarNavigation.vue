<template>
  <nav class="mt-10 text-white">
    <SitebarNavigationItem
      v-for="applicationRoute in applicationRoutes"
      :key="applicationRoute.name"
      :route="applicationRoute"
    />
  </nav>
</template>

<script>
import SitebarNavigationItem from '/@theme/components/SitebarNavigationItem.vue';

export default {
  components: { SitebarNavigationItem },
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
