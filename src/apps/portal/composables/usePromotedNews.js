import { useNewsService } from '/src/apps/portal/services/NewsService.js';
import useSWRV from 'swrv';
import { computed, ref, watch } from 'vue';

const service = useNewsService();

export default function usePromotedNews({
  offset = ref(0),
  limit = ref(null),
  count = ref(0)
  } = {}
) {
    const { data: news, isValidating: loading, error } = useSWRV(
      // the cache key: news_<offset>[_<year>][_<month>][_<app>]
      '/news/promoted',
      () => service.load({
          promoted: true,
          limit: limit.value
        })
      );

    watch(
      news,
      (nv) => { count.value = nv.meta.count; }
    )

    return {
      news: computed(() => news.value?.items),
      count,
      error,
      loading
    }
};
