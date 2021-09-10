<template>
  <PageSection>
    <Header>
      Trainingsmomenten
    </Header>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
      <template
        v-for="moment in store.moments"
        :key="moment.id"
      >
        <MomentCard :moment="moment" />
      </template>
    </div>
  </PageSection>
</template>

<script>
import { useTrainingMomentStore } from '/src/apps/coach/stores/trainingMomentStore.js';
import Header from '/@theme/components/Header.vue';
import MomentCard from '/src/apps/coach/components/MomentCard.vue';
import PageSection from '/@theme/components/PageSection.vue';

export default {
  components: { PageSection, MomentCard, Header },
  setup() {
    const store = useTrainingMomentStore();

    store.load();

    return {
      store
    };
  }
};
</script>
