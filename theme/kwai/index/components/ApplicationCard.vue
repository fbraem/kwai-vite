<template>
  <Card
      :title="application.title"
  >
    <p class="mt-2 mb-4 text-gray-600">
      {{ application.short_description }}
    </p>
  </Card>
</template>

<script>
import Card from '/src/components/Card.vue'

export default {
  components: {Card},
  props: {
    application: {
      type: Object,
      required: true
    }
  }
}
</script>
