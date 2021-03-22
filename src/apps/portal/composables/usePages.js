import { usePageService } from '/src/apps/portal/services/PageService.js';
import useSWRV from 'swrv';
import { computed } from 'vue';

const service = usePageService();

export default function usePages(application) {
  const { data: pages, isValidating: loading, error } = useSWRV(
    () => application.value?.id && `/pages/${application.value.id}`,
    () => service.load({ application: application.value.id })
  );

  return {
    pages: computed(() => pages.value?.items || []),
    count: computed(() => pages.value?.meta.count || 0),
    loading,
    error
  };
};
