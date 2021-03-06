<template>
  <AngledSection bg-color="bg-gray-300" text-color="text-gray-100">
    {{ applications }}
  </AngledSection>
</template>

<script>
import AngledSection from '/src/components/AngledSection.vue'

export default {
  props: {
    applications: {
      type: Object,
      required: true
    }
  },
  components: {
    AngledSection
  }
}
</script>
