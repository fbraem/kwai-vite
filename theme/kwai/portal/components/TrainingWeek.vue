<template>
  <div>
    <div class="mb-5">
      <Header>Trainingen</Header>
      <p class="text-sm text-gray-600">
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
    </div>
    <Alert
        v-if="count === 0"
        type="info"
        icon="fas fa-info"
        class="mb-5"
    >
      Er zijn geen trainingen gepland voor deze periode.
    </Alert>
    {{ trainings }}
  </div>
</template>

<script>
import useTrainingWeek from '/src/apps/portal/composables/useTrainingWeek.js';
import Alert from '/src/components/Alert.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Header from '/@theme/components/Header.vue';

export default {
  components: { Header, ButtonLink, Alert },
  setup() {
    return {
      ... useTrainingWeek()
    };
  }
}
</script>
