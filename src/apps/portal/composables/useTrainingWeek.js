/* Composable that get the trainings of a week */

import dayjs from '/src/common/useDayJS.js';
import { computed, ref } from 'vue';
import { usetrainingStore } from '/src/apps/portal/stores/trainingStore.js';

export default function useTrainingWeek(options = {}) {
  const store = usetrainingStore();

  const current = ref(options.start ?? dayjs());
  const end = computed(() => current.value.add(7, 'day'));

  const { error, loading } = store.load({ start: current, end });
  const trainings = computed(() => store.trainings);
  const count = computed(() => store.count);

  const trainingDays = computed(() => {
    const days = {};
    trainings.value.forEach((t) => {
      const date = t.start_date.format('YYYY-MM-DD');
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(t);
    });
    return days;
  });

  const next = () => {
    current.value = current.value.add(7, 'day');
  };
  const reset = () => {
    current.value = options.start ?? dayjs();
  };
  const prev = () => {
    current.value = current.value.subtract(7, 'day');
  };

  return {
    trainings,
    trainingDays,
    count,
    loading,
    error,
    current: computed(() => current.value.format('L')),
    end: computed(() => end.value.format('L')),
    next,
    reset,
    prev
  };
}
