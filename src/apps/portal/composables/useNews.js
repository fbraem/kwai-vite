import { useNewsService } from '/src/apps/portal/services/NewsService.js';
import useSWRV from 'swrv';
import { computed, ref, watch } from 'vue';

const service = useNewsService();

export default function useNews({
  year = ref(0),
  month = ref(0),
  offset = ref(0),
  application_id = ref(0),
  limit = ref(10),
  count = ref(0)
} = {}
) {
  const { data: news, isValidating: loading, error } = useSWRV(
    // the cache key: news_<offset>[_<year>][_<month>][_<app>]
    () => {
      return [
        '/news',
        offset.value,
        year.value,
        month.value,
        application_id.value
      ].filter(e => e != null).join('/');
    },
    () => {
      return service.load({
        year: year.value,
        month: month.value,
        application: application_id.value,
        offset: offset.value,
        limit: limit.value
      });
    }
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
