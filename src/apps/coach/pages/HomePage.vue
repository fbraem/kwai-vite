<template>
  <PageSection>
    <div class="flex flex-row justify-between items-center pb-4">
      <Header>
        Coaches van onze club.
      </Header>
      <ButtonLink
        class="bg-yellow-500"
        :route="{ name: 'coach.create' }"
      >
        <i class="fas fa-plus mr-1" /> Nieuw
      </ButtonLink>
    </div>
    <div
      v-if="store.containsInactiveCoaches && canManage"
      class="flex items-center justify-end pb-3"
    >
      <div class="mr-2 text-sm">
        Toon inactieve coaches
      </div>
      <Switch
        v-model="showInactiveCoaches"
        :class="showInactiveCoaches ? 'bg-green-500' : 'bg-red-600'"
        class="relative inline-flex items-center h-6 rounded-full w-11"
      >
        <span class="sr-only">Toon inactieve coaches</span>
        <span
          :class="showInactiveCoaches ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block w-4 h-4 transform bg-white rounded-full"
        />
      </Switch>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <template
        v-for="coach in store.coaches"
        :key="coach.id"
      >
        <Card
          v-if="showInactiveCoaches || coach.active"
          :title="coach.name"
          :short-description="coach.diploma"
          class="relative"
        >
          <i
            v-if="!coach.active"
            class="fa-2x fas fa-times-circle text-red-600 top-2 right-2 absolute"
            title="Niet Actief"
          />
          <img
            src="/assets/portal/no_avatar.png"
            alt="Profile face"
            class="w-32 h-32 mx-auto rounded-full"
          >
          <div class="flex justify-center pt-2 space-x-4 align-center text-sm">
            {{ coach.bio }}
          </div>
          <template #footer>
            <div class="flex w-full justify-end">
              <ButtonLink
                v-if="canUpdate"
                class="bg-yellow-500"
                :route="{ name: 'coach.edit', params: { id: coach.id }}"
              >
                <i class="far fa-edit mr-1" /> Wijzig
              </ButtonLink>
              <ButtonLink
                class="bg-yellow-500"
                :route="{ name: 'coach.detail', params: { id: coach.id }}"
              >
                <i class="far fa-id-card mr-1" /> Coach
              </ButtonLink>
            </div>
          </template>
        </Card>
      </template>
    </div>
  </PageSection>
</template>

<script>
import { useCoachStore } from '/src/apps/coach/stores/coachStore.js';
import { defineAbility } from '@casl/ability';
import { useAbility } from '/src/common/useAbility.js';
import Header from '/@theme/components/Header.vue';
import PageSection from '/@theme/components/PageSection.vue';
import Card from '/src/components/Card.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import { Switch } from '@headlessui/vue';
import { ref, watch } from 'vue';

export default {
  components: { PageSection, ButtonLink, Card, Header, Switch },
  setup() {
    const store = useCoachStore();
    const { loading, error } = store.load();

    const customAbility = defineAbility((can) => {
      can('update', 'coaches', { owner: true });
    });
    const ability = useAbility();
    ability.update(ability.rules.concat(customAbility.rules));

    const canUpdate = (coach) => ability.can('update', coach);

    const showInactiveCoaches = ref(store.showInactive);
    watch(
      showInactiveCoaches,
      (nv) => { store.showInactive = nv; }
    );

    return {
      store,
      loading,
      error,
      canUpdate,
      canManage: ability.can('manage', 'coaches'),
      showInactiveCoaches
    };
  }
};
</script>
