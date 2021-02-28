<template>
  <Card
      :title="application.title"
  >
    <CoverLink
      v-if="route"
      :route="route"
    />
    <p class="mt-2 mb-4 text-gray-600">
      {{ application.short_description }}
    </p>
  </Card>
</template>

<script>
import Card from '/src/components/Card.vue'
import CoverLink from '/src/components/CoverLink.vue';

export default {
  components: { CoverLink, Card},
  props: {
    application: {
      type: Object,
      required: true
    },
    route: {
      required: false
    }
  }
}
</script>
