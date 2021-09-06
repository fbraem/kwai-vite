<template>
  <section class="container mx-auto py-12 px-4 sm:px-12">
    <Header>
      Coaches van onze club.
    </Header>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card
        v-for="coach in store.coaches"
        :key="coach.id"
        :title="coach.name"
        :short-description="coach.diploma"
      >
        <i
          v-if="!coach.active"
          class="fa-2x fas fa-times-circle text-red-600 top-4 right-4 absolute"
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
              class="bg-yellow-500"
              :route="{ name: 'coach.detail', params: { id: coach.id }}"
            >
              <i class="far fa-id-card mr-1" /> Coach
            </ButtonLink>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<script>
import { useCoachStore } from '/src/apps/coach/stores/coachStore.js';
import { defineAbility } from '@casl/ability';
import { useAbility } from '/src/common/useAbility.js';
import Header from '/@theme/components/Header.vue';
import Card from '/src/components/Card.vue';
import ButtonLink from '/src/components/ButtonLink.vue';

export default {
  components: { ButtonLink, Card, Header },
  setup() {
    const store = useCoachStore();
    const { loading, error } = store.load();

    const customAbility = defineAbility((can) => {
      can('update', 'coaches', { owner: true });
    });
    const ability = useAbility();
    ability.update(ability.rules.concat(customAbility.rules));

    const canUpdate = (coach) => ability.can('update', coach);

    return {
      store,
      loading,
      error,
      canUpdate
    };
  }
};
</script>
