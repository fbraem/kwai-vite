<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-row justify-between">
      <h1 class="text-3xl font-medium">
        Nieuws
      </h1>
      <div>
        <ButtonLink
          class="bg-yellow-300"
          :route="{ name: 'author.news.create' }"
        >
          <i class="fas fa-plus mr-2" />Nieuw
        </ButtonLink>
      </div>
    </div>
    <div class="flex flex-wrap -mx-6 my-3">
      <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
        <StatCard
          icon-bg-color="bg-indigo-500"
          icon="fas fa-hashtag"
          class="bg-white"
        >
          <h4 class="text-2xl font-semibold text-gray-700">
            {{ count }}
          </h4>
          <div class="text-gray-500">
            Berichten
          </div>
        </StatCard>
      </div>
    </div>
    <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg bg-white">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
              Titel
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
              Application
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left bg-gray-50" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="story in stories"
            :key="story.id"
            :class="{ 'bg-gray-100': !story.enabled }"
          >
            <td class="px-6 py-3 border-b flex items-center justify-between">
              <span class="font-medium">
                {{ story.title }}
              </span>
              <i
                v-if="story.promotion.priority > 0"
                class="ml-2 fas fa-bullhorn text-gray-500"
              />
            </td>
            <td class="px-6 py-3 border-b">
              {{ story.application.title }}
            </td>
            <td class="px-6 py-3 border-b text-center">
              <i
                v-if="story.enabled"
                class="fas fa-check text-green-500"
              />
              <i
                v-else
                class="fas fa-times text-red-500"
              />
            </td>
            <td class="px-6 py-3 border-b text-gray-700">
              <router-link :to="{ name: 'author.news.edit', params: { id: story.id } }">
                <i class="fas fa-edit" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <RoutePagination
      class="border-t border-gray-200"
      :count="count"
    />
  </div>
</template>

<script>
import StatCard from '/src/components/StatCard.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import RoutePagination from '/src/components/RoutePagination.vue';
import useRoutePagination from '/src/composables/useRoutePagination.js';
import { useNewsStore } from '/src/apps/author/stores/newsStore.js';
import { computed } from 'vue';

export default {
  components: { RoutePagination, ButtonLink, StatCard },
  setup() {
    const store = useNewsStore();
    const paginator = useRoutePagination();

    const { loading, error } = store.load({
      offset: paginator.offset,
      limit: paginator.limit
    });

    const stories = computed(() => store.stories);
    const count = computed(() => store.count);

    return {
      stories,
      count,
      loading,
      error
    };
  }
};
</script>
