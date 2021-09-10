<template>
  <PageSection>
    <Header>
      Trainingsmomenten
    </Header>
    <div
      v-if="store.containsInactiveMoments && canManage"
      class="flex items-center justify-end pb-3"
    >
      <div class="mr-2 text-sm">
        Toon inactieve momenten
      </div>
      <Switch
        v-model="showInactive"
        :class="showInactive ? 'bg-green-500' : 'bg-red-600'"
        class="relative inline-flex items-center h-6 rounded-full w-11"
      >
        <span class="sr-only">Toon inactieve momenten</span>
        <span
          :class="showInactive ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block w-4 h-4 transform bg-white rounded-full"
        />
      </Switch>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
      <template
        v-for="moment in store.moments"
        :key="moment.id"
      >
        <MomentCard
          v-if="showInactive || moment.active"
          :moment="moment"
        />
      </template>
    </div>
  </PageSection>
</template>

<script>
import { useTrainingMomentStore } from '/src/apps/coach/stores/trainingMomentStore.js';
import Header from '/@theme/components/Header.vue';
import MomentCard from '/src/apps/coach/components/MomentCard.vue';
import PageSection from '/@theme/components/PageSection.vue';
import { Switch } from '@headlessui/vue';

import { ref } from 'vue';
import { useAbility } from '/src/common/useAbility.js';

export default {
  components: { PageSection, MomentCard, Header, Switch },
  setup() {
    const store = useTrainingMomentStore();
    store.load();

    const ability = useAbility();
    const canManage = ref(ability.can('manage', 'definitions'));

    const showInactive = ref(false);

    return {
      store,
      canManage,
      showInactive
    };
  }
};
</script>
