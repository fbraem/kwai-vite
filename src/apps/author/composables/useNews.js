import { computed, ref, watch } from 'vue';

import { useNewsService } from '/src/apps/author/services/NewsService.js';
import useState from '/src/composables/useState.js';

const service = useNewsService();

export default function useNews({
  offset = ref(0),
  limit = ref(10),
  count = ref(0)
}) {
  const { data: news, loading, error } = useState(
    () => `author/news/${offset.value}/${limit.value}`,
    () => service.load({
      offset: offset.value,
      limit: limit.value
    })
  );

  watch(
    news,
    (nv) => { count.value = nv.meta.count; }
  );

  return {
    news: computed(() => news.value?.items),
    count,
    loading,
    error
  };
};
