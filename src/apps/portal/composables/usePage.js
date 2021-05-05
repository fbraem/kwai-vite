// Composable for reading an article.

import { usePageService } from '/src/apps/portal/services/PageService.js';
import useSWRV from 'swrv';

const service = usePageService();

export default function usePage(id) {
  const { data, isValidating, error } = useSWRV(
    () => `/pages/${id.value}`,
    () => service.get(id.value),
    {
      revalidateOnFocus: false
    }
  );

  return {
    page: data,
    loading: isValidating,
    error
  };
}
