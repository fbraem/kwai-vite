<template>
  <section class="container mx-auto py-8 px-8">
    <Header>
      Trainingsmomenten
    </Header>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <template
        v-for="moment in store.moments"
        :key="moment.id"
      >
        <MomentCard :moment="moment" />
      </template>
    </div>
  </section>
</template>

<script>
import { useTrainingMomentStore } from '/src/apps/coach/stores/trainingMomentStore.js';
import Header from '/@theme/components/Header.vue';
import MomentCard from '/src/apps/coach/components/MomentCard.vue';

export default {
  components: { MomentCard, Header },
  setup() {
    const store = useTrainingMomentStore();

    store.load();

    return {
      store
    };
  }
};
</script>
