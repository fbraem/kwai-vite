<template>
  <div>
    <PageSection>
      <Header class="pb-4">
        Trainingsmoment
      </Header>
      <MomentCard
        v-if="store.moment"
        :moment="store.moment"
      />
    </PageSection>
    <PageSection>
      <div class="flex flex-row justify-between items-center pb-4">
        <Header>
          Trainingen voor dit trainingsmoment
        </Header>
        <ButtonLink
          class="bg-yellow-500"
        >
          <i class="fas fa-plus mr-1" /> Trainingen
        </ButtonLink>
      </div>
      <div class="sm:py-8 px-4 bg-white">
        <div class="flex flex-row items-center space-x-6 py-4">
          <div>
            <ButtonLink
              class="bg-yellow-500"
              :route="previous"
            >
              <i class="fa fa-angle-left sm:mr-2" />
              <span class="hidden sm:inline">
                Vorige maand
              </span>
            </ButtonLink>
          </div>
          <h2 class="flex-grow text-2xl lg:text-3xl font-bold uppercase text-center">
            {{ monthName }} {{ year }}
          </h2>
          <div>
            <ButtonLink
              class="bg-yellow-500"
              :route="next"
            >
              <span class="hidden sm:inline">
                Volgende maand
              </span>
              <i class="fa fa-angle-right sm:ml-2" />
            </ButtonLink>
          </div>
        </div>
        <div
          v-if="store.trainingCount === 0"
          class="text-center text-sm"
        >
          Er zijn geen trainingen gepland in deze maand.
        </div>
        <div
          v-else-if="store.trainingCount === 1"
          class="text-center text-sm"
        >
          Er is 1 training gepland in deze maand.
        </div>
        <div
          v-else-if="store.trainingCount > 1"
          class="text-center text-sm"
        >
          Er zijn
          <span class="font-bold">
            {{ store.trainingCount }}
          </span>
          trainingen gepland in deze maand.
        </div>
      </div>
    </PageSection>
    <Trainings :trainings="store.trainings" />
  </div>
</template>

<script>
import PageSection from '/@theme/components/PageSection.vue';
import MomentCard from '/src/apps/coach/components/MomentCard.vue';
import Trainings from '/src/apps/coach/components/Trainings.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Header from '/@theme/components/Header.vue';

import useYearMonth from '/src/composables/useYearMonth.js';
import { useTrainingMomentStore } from '/src/apps/coach/stores/trainingMomentStore.js';

export default {
  components: { Header, PageSection, MomentCard, Trainings, ButtonLink },
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
    store.loadTrainings(props.id, { start, end });

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
