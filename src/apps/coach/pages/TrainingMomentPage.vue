<template>
  <PageSection>
    {{ store.moment }}
  </PageSection>
</template>

<style scoped>
</style>

<script>
import PageSection from '/@theme/components/PageSection.vue';
import MomentCard from '/src/apps/coach/components/MomentCard.vue';
import useYearMonth from '/src/composables/useYearMonth.js';
import { useTrainingMomentStore } from '/src/apps/coach/stores/trainingMomentStore.js';

export default {
  components: { PageSection, MomentCard },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useTrainingMomentStore();
    const { loading: momentLoading, error: momentError } = store.get(props.id);

    const { year, month, monthName, previous, next, start, end } = useYearMonth();

    return {
      store,
      momentLoading,
      momentError,
      year,
      month,
      monthName,
      previous,
      next
    };
  }
};
</script>
