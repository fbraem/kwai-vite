<template>
  <div>
    <Spinner v-if="loading"></Spinner>
    <slot v-else-if="story" :story="story">
      <h1>{{ story.title }}</h1>
      <p v-html="story.summary"></p>
      <p v-html="story.content"></p>
    </slot>
  </div>
</template>

<script>
import Spinner from '/src/components/Spinner.vue';
import { useNewsService } from '/src/apps/portal/services/NewsService.js';
import useSWRV from 'swrv';

export default {
  components: { Spinner },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const newsService = useNewsService();
    const { data: story, isValidating: loading } = useSWRV(
        '/news/story',
        () => newsService.get(props.id)
    );

    return {
      story,
      loading
    }
  }
}
</script>
