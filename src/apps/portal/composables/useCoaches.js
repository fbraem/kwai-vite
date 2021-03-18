/* Composable that get all coaches */

import useSWRV from 'swrv';
import { useCoachesService } from '/src/apps/portal/services/CoachService.js';
import { computed } from 'vue';

const service = useCoachesService();

export default function useCoaches() {
  const { data: coaches, isValidating: loading, error } = useSWRV(
    '/coaches',
    () => service.load()
  );

  return {
    coaches: computed(() => coaches.value?.items),
    count: computed(() => coaches.value?.meta.count),
    loading,
    error
  };
};
