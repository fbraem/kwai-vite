<template>
  <div>
    <Article
      v-if="article"
      :article="article"
    />
  </div>
</template>

<script>
import usePage from '/src/apps/portal/composables/usePage.js';
import Article from '/@theme/portal/components/Article.vue';
import { toRefs } from 'vue';

export default {
  components: {
    Article
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const input = toRefs(props);
    const { page, loading, error } = usePage(input.id);
    return {
      article: page,
      loading,
      error
    };
  }
};
</script>
