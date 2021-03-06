<template>
  <Navigation
      :title="title"
      :url="url"
  >
  </Navigation>
</template>

<script>
import Navigation from '/@theme/components/Navigation.vue';
import config from '/src/config/config.toml';

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
