import { useNewsService } from '/src/apps/portal/services/NewsService.js';
import useSWRV from 'swrv';
import { computed, ref, watch } from 'vue';

const service = useNewsService();

export default function usePromotedNews({
  limit = ref(null),
  count = ref(0),
  application
  } = {}
) {
    const { data: news, isValidating: loading, error } = useSWRV(
      // the cache key: news_<offset>[_<year>][_<month>][_<app>]
      () => {
        return application === undefined ?
          '/news/promoted' :
          application.value.id && `/news/promoted/${application.value.id}`;
      },
      () => {
        return service.load({
          promoted: true,
          limit: limit.value,
          application: application?.value.id
          });
      }
    );

    watch(
      news,
      (nv) => { count.value = nv.meta.count; }
    )

    return {
      news: computed(() => news.value?.items || []),
      count,
      error,
      loading
    }
};
