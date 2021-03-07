<template>
  <div>
    <Spinner v-if="loading"></Spinner>
    <div v-if="trainings">
      <slot :trainings="trainings">
      </slot>
    </div>
  </div>
</template>

<script>
import { useTrainingService } from '/src/apps/portal/services/TrainingService.js';
import Spinner from '/src/components/Spinner.vue';
import { now } from '/src/common/useDayJS.js';
import useSWRV from 'swrv';

export default {
  components: { Spinner },
  setup() {
    const service = useTrainingService();

    const { data: trainings, isValidating: loading } = useSWRV(
        '/trainings',
        () => {
          const start = now();
          const end = start.add(7, 'day');
          return service.load({ start, end});
        }
    );

    return {
      trainings,
      loading
    }
  }
};
</script>
