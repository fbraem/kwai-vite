import { useNewsService } from '/src/apps/portal/services/NewsService.js';
import useSWRV from 'swrv';
import { computed, ref, watch } from 'vue';

const service = useNewsService();

export default function useNews({
  year = ref(null),
  month = ref(null),
  app = ref(null),
  offset = ref(0),
  limit = ref(10),
  count = ref(0)
} = {}
) {
  const { data: news, isValidating: loading, error } = useSWRV(
    // the cache key: news_<offset>[_<year>][_<month>][_<app>]
    () => [
      '/news',
      offset.value,
      year.value,
      month.value,
      app.value
    ].filter(e => e !== undefined).join('/'),
    () => service.load({
      year: year.value,
      month: month.value,
      offset: offset.value,
      limit: limit.value,
      application: app.value
    })
  );

  watch(
    news,
    (nv) => { count.value = nv.meta.count; }
  );

  return {
    news: computed(() => news.value?.items),
    count,
    error,
    loading
  };
};
