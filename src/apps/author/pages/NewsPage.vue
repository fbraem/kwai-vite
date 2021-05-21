<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-medium">Nieuws</h1>
    <div class="flex flex-wrap -mx-6 my-3">
      <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
        <StatCard
          icon-bg-color="bg-indigo-500"
          icon="fas fa-hashtag"
          class="bg-white"
        >
          <div class="mx-5">
            <h4 class="text-2xl font-semibold text-gray-700">{{ count }}</h4>
            <div class="text-gray-500">Berichten</div>
          </div>
        </StatCard>
      </div>
    </div>
    <table class="w-full bg-white rounded-lg">
      <thead class="border-b">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Titel
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Application
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 text-left">
          </th>
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
              v-if="story.promotion"
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
            <a href="#"><i class="fas fa-edit" /></a>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginator
      :pagination="pagination"
      class="bg-white mt-2"
    />
  </div>
</template>

<script>
import useNews from '/src/apps/author/composables/useNews.js';
import usePagination from '/src/composables/usePagination.js';
import Paginator from '/src/components/Paginator.vue';
import StatCard from '/src/components/StatCard.vue';
import { ref } from 'vue';

export default {
  components: { StatCard, Paginator },
  setup() {
    const limit = ref(10);
    const count = ref(0);
    const pagination = usePagination({
      limit, count
    });
    const { news: stories } = useNews({ limit, count, offset: pagination.offset });

    return {
      stories,
      count,
      pagination
    };
  }
};
</script>
