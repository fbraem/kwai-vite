<template>
  <Navigation
      :title="title"
      :url="url"
  >
  </Navigation>
</template>

<script>
import Navigation from '/@theme/components/Navigation.vue';
import config from '/@config';

export default {
  components: { Navigation },
  setup() {
    return {
      title: config.website.title,
      url: config.contact.website.url + '/#'
    }
  }
}
</script>
