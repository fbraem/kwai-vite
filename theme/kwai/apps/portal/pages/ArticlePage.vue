<template>
  <div>
    <Article
      v-if="article"
      :article="article" />
  </div>
</template>

<script>
import { useArticleStore } from '/src/apps/portal/stores/articleStore.js';
import { computed } from 'vue';
import Article from '/@theme/apps/portal/components/Article.vue';

export default {
  components: { Article },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useArticleStore();
    const idRef = computed(() => props.id);
    store.get(idRef);

    const article = computed(() => store.article);

    return {
      article
    };
  }
};
</script>
