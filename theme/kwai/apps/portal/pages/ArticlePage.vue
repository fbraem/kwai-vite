<template>
  <PageSection
    v-if="article"
    class="border-t border-gray-300"
  >
    <i
      class="fas fa-chevron-up float-right text-gray-400 hover:cursor-pointer"
      @click="scrollToTop"
    />
    <Article :article="article" />
  </PageSection>
</template>

<script>
import { useArticleStore } from '/src/apps/portal/stores/articleStore.js';
import { computed } from 'vue';
import Article from '/@theme/apps/portal/components/Article.vue';
import PageSection from '/@theme/components/PageSection.vue';

const scrollToTop = () => {
  const top = document.querySelector('#main');
  if (top) {
    top.scrollTo(0, 0);
  }
};

export default {
  components: { PageSection, Article },
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
      article,
      scrollToTop,
      top
    };
  }
};
</script>
