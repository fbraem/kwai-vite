/* Composable that get the trainings of a week */

import { formatDate, now } from '/src/common/useDayJS.js';
import useSWRV from 'swrv';
import { computed, ref } from 'vue';
import { useTrainingService } from '/src/apps/portal/services/TrainingService.js';

const service = useTrainingService();

export default function useTrainingWeek(options= {}) {
  const start = ref(options.start ?? now());
  const current = ref(options.start ?? now());
  const end = computed(() => current.value.add(7, 'day'));

  const format = (date) => formatDate(date, 'L');

  const { data: trainings, isValidating: loading, error } = useSWRV(
    () => [
      '/trainings',
      format(current.value),
      format(end.value)
    ].join('/'),
    () => service.load({ start: current.value, end: end.value})
  );

  const next = () => { current.value = current.value.add(7, 'day') };
  const reset = () => { current.value = options.start ?? now() };
  const prev = () => { current.value = current.value.subtract(7, 'day') };

  return {
    trainings: computed(() => trainings.value?.items),
    count: computed(() => trainings.value?.meta.count),
    loading,
    error,
    current: computed(() => format(current.value)),
    end: computed(() => format(end.value)),
    next,
    reset,
    prev
  };
}
