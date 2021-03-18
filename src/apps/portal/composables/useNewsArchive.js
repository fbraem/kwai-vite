import { useNewsService } from '/src/apps/portal/services/NewsService.js';
import { months } from '/src/common/useDayJS.js';
import useSWRV from 'swrv';
import { computed } from 'vue';

const newsService = useNewsService();

export default function useNewsArchive() {
  const { data } = useSWRV(
    '/news/archive',
    newsService.archive,
    {
      revalidateOnFocus: false
    }
  );

  const archive = computed(() => {
    if (data.value) {
      return data.value.reduce(
        (result, value) => {
          if (!result[value.year]) {
            result[value.year] = [];
          }
          result[value.year].push({
            name: months()[value.month - 1],
            month: value.month,
            year: value.year,
            count: value.count
          });
          return result;
        },
        {}
      );
    }
    return {};
  });

  // All years found in the archive
  const years = computed(() => Object.keys(archive.value).reverse());

  return {
    archive,
    years
  };
}
