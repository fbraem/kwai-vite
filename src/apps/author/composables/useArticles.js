import { computed, ref, watch } from 'vue';
import useState from '/src/composables/useState.js';
import { useArticleService } from '/src/apps/author/services/ArticleService.js';

const service = useArticleService();

export default function useArticles({
  offset = ref(0),
  limit = ref(10),
  count = ref(0)
} = {}) {
  const { data: articles, loading, error } = useState(
    () => `author/articles/${offset.value}/${limit.value}`,
    () => service.load({
      offset: offset.value,
      limit: limit.value
    })
  );

  watch(
    articles,
    (nv) => { count.value = nv.meta.count; }
  );

  return {
    articles: computed(() => articles.value?.items),
    count,
    loading,
    error
  };
}
