<template>
  <Layout image="">
    <template #title>
      <h1 class="text-white font-semibold text-4xl mb-2">
        Coaches
      </h1>
      <p class="text-white">
        De coaches van onze club.
      </p>
    </template>
    <section class="container mx-auto bg-gray-200 py-8 px-4 sm:px-12 grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
      <div
        v-for="coach in store.coaches"
        :key="coach.id"
        class="h-full flex flex-col justify-center w-full p-6 shadow-md rounded-xl bg-white relative"
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
        <div class="space-y-4 text-center flex-grow">
          <div class="my-2 space-y-1">
            <h2 class="text-xl font-semibold sm:text-2xl">
              {{ coach.name }}
            </h2>
            <p class="px-5 text-xs sm:text-base text-gray-600">
              {{ coach.diploma }}
            </p>
          </div>
          <div class="flex justify-center pt-2 space-x-4 align-center text-sm">
            {{ coach.bio }}
          </div>
        </div>
        <div
          class="border-t border-gray-200 mt-2 pt-4 flex flex-row items-center justify-end space-x-2"
        >
          <router-link :to="{ name: 'coach.detail', params: { id: coach.id }}">
            <i class="far fa-id-card text-gray-600" />
          </router-link>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import useCoaches from '/src/apps/coach/composables/useCoaches.js';
import { defineAbility } from '@casl/ability';
import { useAbility } from '/src/common/useAbility.js';

export default {
  components: {
    Layout
  },
  setup() {
    const { store, load } = useCoaches();
    const { loading, error } = load();

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
