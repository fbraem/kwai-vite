<template>
  <Layout image="">
    <template
      v-if="coachStore.coach && !coachLoading"
      #title
    >
      <h1 class="text-white font-semibold text-4xl mb-2">
        {{ coachStore.coach.name }}
      </h1>
      <div class="text-white text-2xl">
        {{ coachStore.coach.diploma }}
      </div>
      <div class="text-white text-sm mt-10">
        {{ coachStore.coach.bio }}
      </div>
    </template>
    <section class="container mx-auto bg-gray-200 py-8 px-4 sm:px-12 max-w-4xl">
      <h1
        v-if="coachStore.coach && !coachLoading"
        class="font-semibold text-2xl mb-2"
      >
        Trainingen {{ coachStore.coach.name }}
      </h1>
      <div class="flex flex-row justify-center space-x-6 py-4">
        <div>
          <ButtonLink
            class="bg-red-600 text-white"
            :route="previous"
          >
            <i class="fa fa-angle-left sm:mr-2" />
            <span class="hidden sm:inline">
              Vorige maand
            </span>
          </ButtonLink>
        </div>
        <h2 class="flex-grow text-2xl md:text-3xl font-bold uppercase text-center">
          {{ monthName }} {{ year }}
        </h2>
        <div>
          <ButtonLink
            class="bg-red-600 text-white"
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
        v-if="trainingStore.count === 0"
        class="text-center text-sm pb-4"
      >
        Er zijn geen trainingen gepland in deze maand.
      </div>
      <div
        v-else-if="trainingStore.count === 1"
        class="text-center text-sm pb-4"
      >
        Er is 1 training gepland in deze maand.
      </div>
      <div
        v-else-if="trainingStore.count > 1"
        class="text-center text-sm pb-4"
      >
        Er zijn
        <span class="font-bold">
          {{ trainingStore.count }}
        </span>
        trainingen gepland in deze maand.
      </div>
      <div
        v-if="trainingStore.trainings.length > 0"
        class="space-y-4"
      >
        <div
          v-for="training in trainingStore.trainings"
          :key="training.id"
          class="bg-white shadow overflow-hidden sm:rounded-lg"
        >
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              <span class="text-sm">{{ training.start_date.format('ddd') }}</span> {{ training.start_date.format('L') }}
              <span class="ml-14">{{ training.start_date.format('HH:mm') }} - {{ training.end_date.format('HH:mm') }}</span>
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              {{ training.title }}
            </p>
          </div>
          <div class="border-t border-gray-200">
            <dl class="odd:bg-gray-50">
              <div
                v-if="training.location"
                class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">
                  Locatie
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ training.location }}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Coaches
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row flex-wrap">
                  <template
                    v-for="coach in training.coaches"
                    :key="coach.id"
                  >
                    <Badge class="bg-gray-300 mr-1 mt-1">
                      {{ coach.name }}
                    </Badge>
                  </template>
                </dd>
              </div>
              <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Teams
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <template
                    v-for="team in training.teams"
                    :key="team.id"
                  >
                    <Badge class="bg-gray-300 mr-1">
                      {{ team.name }}
                    </Badge>
                  </template>
                </dd>
              </div>
            </dl>
          </div>
          <div
            v-if="training.summary.length > 0"
            class="bg-white px-4 py-5 sm:px-6 border-t border-gray-200"
          >
            <dt class="text-sm font-medium text-gray-500">
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div v-html="training.summary" />
            </dd>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import useCoaches from '/src/apps/coach/composables/useCoaches.js';
import useCoachTrainings from '/src/apps/coach/composables/useCoachTrainings.js';
import useYearMonth from '/src/composables/useYearMonth.js';
import ButtonLink from '/src/components/ButtonLink.vue';
import Badge from '/src/components/Badge.vue';

export default {
  components: { Layout, ButtonLink, Badge },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { store: coachStore, get } = useCoaches();
    const { loading: coachLoading, coachError } = get(props.id);

    const { year, month, monthName, previous, next, start, end } = useYearMonth();

    const { store: trainingStore, load: trainingLoad } = useCoachTrainings();
    const { load: trainingLoading, error: trainingError } = trainingLoad(props.id, { start, end });

    return {
      coachStore,
      coachLoading,
      coachError,
      year,
      month,
      monthName,
      previous,
      next,
      trainingStore,
      trainingLoading,
      trainingError
    };
  }
};
</script>
