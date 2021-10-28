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
    <router-view />
  </div>
</template>

<script>
import PageSection from '/@theme/components/PageSection.vue';
import MomentCard from '/src/apps/coach/components/MomentCard.vue';
import Header from '/@theme/components/Header.vue';

import { useTrainingMomentStore } from '/src/apps/coach/stores/trainingMomentStore.js';

export default {
  components: { Header, PageSection, MomentCard },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useTrainingMomentStore();
    const { loading: momentLoading, error: momentError } = store.get(props.id);

    return {
      store,
      momentLoading,
      momentError
    };
  }
};
</script>
