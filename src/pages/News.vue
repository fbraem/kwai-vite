<template>
  <Layout image="/@theme/index/assets/news.jpg">
    <div>HELLO</div>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import { useNewsService } from '/src/services/NewsService.js';
import useSWRV from 'swrv';

export default {
  components: {
    Layout
  },
  setup() {
    const newsService = useNewsService();
    const { data: news } = useSWRV('/news', newsService.load);
  }
};
</script>
