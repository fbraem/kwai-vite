<template>
  <div>
    <Spinner v-if="loading"></Spinner>
    <div v-for="story in news">
      <slot :story="story">
      </slot>
    </div>
  </div>
</template>

<script>
import { useNewsService } from '/src/services/NewsService.js';
import Spinner from '/src/components/Spinner.vue';
import useSWRV from 'swrv';

export default {
  components: { Spinner },
  setup() {
    const newsService = useNewsService();
    const { data: news, isValidating: loading } = useSWRV('/news', () => newsService.load());

    return {
      news,
      loading
    }
  }
};
</script>
