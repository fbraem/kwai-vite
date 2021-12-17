<template>
  <div>
    <div class="mb-5">
      <Header>
        Trainingen
        <Spinner v-if="loading" />
      </Header>
      <p class="text-sm text-gray-700 mt-1">
        Trainingen van
        <span class="font-semibold">{{ current }}</span>
        tot
        <span class="font-semibold">{{ end }}</span>
      </p>
      <div class="flex justify-between mt-4">
        <ButtonLink
          class="bg-red-700 text-white"
          :method="prev"
        >
          <i class="mr-1 fas fa-angle-left" /> Vorige Periode
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
          Volgende Periode <i class="ml-1 fas fa-angle-right" />
        </ButtonLink>
      </div>
    </div>
    <Alert
      v-if="count === 0"
      type="info"
      class="mb-5"
    >
      Er zijn geen trainingen gepland voor deze periode.
    </Alert>
    <table
      v-if="count > 0"
      class="divide-y divide-gray-400 w-full bg-gray-200 rounded-lg mb-3"
    >
      <thead>
        <tr>
          <th class="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Datum
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tijdstip
          </th>
        </tr>
      </thead>
      <template
        v-for="(trainings, day) in trainingDays"
        :key="day"
      >
        <TrainingDay
          :day="day"
          :trainings="trainings"
        />
      </template>
    </table>
    <p class="text-sm text-gray-700">
      Bekijk de volledige maand in onze
      <router-link
        :to="{ name: 'portal.events' }"
        class="text-blue-500 underline"
      >
        activiteiten kalender
      </router-link>
    </p>
  </div>
</template>

<script>
import useTrainingWeek from '/src/apps/portal/composables/useTrainingWeek.js';
import Alert from '/src/components/Alert.vue';
import Spinner from '/src/components/Spinner.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Header from '/@theme/components/Header.vue';
import TrainingDay from '/@theme/apps/portal/components/TrainingDay.vue';

export default {
  components: { Header, ButtonLink, Alert, Spinner, TrainingDay },
  setup() {
    return {
      ...useTrainingWeek()
    };
  }
};
</script>
