<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-row justify-between">
      <h1 class="text-3xl font-medium">
        Artikels
      </h1>
      <div>
        <ButtonLink
          class="bg-yellow-300"
          :route="{ name: 'author.articles.create' }"
        >
          <i class="fas fa-plus mr-2" />Artikel
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
          <div class="mx-5">
            <h4 class="text-2xl font-semibold text-gray-700">
              {{ count }}
            </h4>
            <div class="text-gray-500">
              Artikels
            </div>
          </div>
        </StatCard>
      </div>
    </div>
    <div class="min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg bg-white">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
              Title
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
              Applicatie
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="article in articles"
            :key="article.id"
          >
            <td class="px-6 py-3 border-b text-center">
              {{ article.id }}
            </td>
            <td class="px-6 py-3 border-b">
              {{ article.title }}
            </td>
            <td class="px-6 py-3 border-b">
              {{ article.application.title }}
            </td>
            <td class="px-6 py-3 border-b text-center">
              <i
                v-if="article.enabled"
                class="fas fa-check text-green-500"
              />
              <i
                v-else
                class="fas fa-times text-red-500"
              />
            </td>
            <td class="px-6 py-3 border-b text-gray-700">
              <router-link :to="{ name: 'author.articles.edit', params: { id: article.id } }">
                <i class="fas fa-edit" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <RoutePagination :count="count" />
  </div>
</template>

<script>

import ButtonLink from '/src/components/ButtonLink.vue';
import StatCard from '/src/components/StatCard.vue';
import useRoutePagination from '/src/composables/useRoutePagination.js';
import RoutePagination from '/src/components/RoutePagination.vue';
import { useArticleStore } from '/src/apps/author/stores/articleStore.js';
import { computed } from 'vue';

export default {
  components: { RoutePagination, ButtonLink, StatCard },
  setup() {
    const store = useArticleStore();
    const paginator = useRoutePagination();

    const { loading, errors } = store.load({
      limit: paginator.limit,
      offset: paginator.offset
    });

    const articles = computed(() => store.articles);
    const count = computed(() => store.count);

    return {
      count,
      articles,
      loading,
      errors
    };
  }
};
</script>
