<template>
  <div>
    <slot
        name="title"
        :period="{ start: format(current), end: format(end) }"
        :loading="loading"
    >
      <h1>
        {{ format(current) }} tot {{ format(end) }} <Spinner v-if="loading"></Spinner>
      </h1>
    </slot>
    <div class="flex justify-between">
      <ButtonLink
          class="bg-red-700 text-white"
          :method="prev"
      >
        <i class="mr-1 fas fa-angle-left"></i> Vorige Periode
      </ButtonLink>
      <ButtonLink
          class="bg-red-700 text-white"
          :method="reset"
      >
        Vandaag
      </ButtonLink>
      <ButtonLink
          class="bg-red-700 text-white"
          :method="next"
      >
        Volgende Periode <i class="ml-1 fas fa-angle-right"></i>
      </ButtonLink>
    </div>
    <div class="mt-5" v-if="trainings">
      <slot
          :trainings="trainings.item"
          :count="trainings.meta.count"
      >
      </slot>
    </div>
  </div>
</template>

<script>
import { useTrainingService } from '/src/apps/portal/services/TrainingService.js';
import Spinner from '/src/components/Spinner.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import { formatDate, now } from '/src/common/useDayJS.js';
import useSWRV from 'swrv';
import { computed, ref } from 'vue';

export default {
  components: { Spinner, ButtonLink },
  props: {
    start: {
      default: now()
    }
  },
  setup(props) {
    const service = useTrainingService();
    const current = ref(props.start);

    const end = computed(() => current.value.add(7, 'day'));

    const format = (date) => formatDate(date, 'L');

    const { data: trainings, isValidating: loading } = useSWRV(
        () => [
            'trainings',
            format(current.value),
            format(end.value)
          ].join('/'),
        () => {
          return service.load({ start: current.value, end: end.value });
        }
    );

    const next = () => { current.value = current.value.add(7, 'day') };
    const reset = () => { current.value = props.start };
    const prev = () => { current.value = current.value.subtract(7, 'day') };

    return {
      trainings,
      loading,
      current,
      end,
      format,
      next,
      reset,
      prev
    }
  }
};
</script>
