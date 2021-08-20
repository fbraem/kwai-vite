<template>
  <IconCard :title="application.title">
    <CoverLink
      v-if="route"
      :route="route"
    />
    <p class="mt-2 mb-4 text-gray-600">
      {{ application.short_description }}
    </p>
  </IconCard>
</template>

<script>
import IconCard from '/src/components/IconCard.vue';
import CoverLink from '/src/components/CoverLink.vue';

export default {
  components: { CoverLink, IconCard },
  props: {
    application: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: false,
      default: null
    }
  }
};
</script>
