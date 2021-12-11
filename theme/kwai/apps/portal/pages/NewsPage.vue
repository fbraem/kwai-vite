<template>
  <Layout
    image="/assets/portal/news.jpg"
  >
    <template #title>
      <h1 class="text-white font-semibold text-4xl mb-2">
        Nieuws
        <Spinner v-if="loading" />
      </h1>
      <p class="mt-4 text-lg text-gray-100">
        Op deze pagina vind je alle nieuwsberichten van onze club. Kom hier
        regelmatig eens kijken om op de hoogte te blijven!
      </p>
    </template>
    <section class="bg-gray-200">
      <div class="container mx-auto p-8">
        <div class="hidden sm:block float-right bg-gray-200 ml-3 w-1/3 rounded-lg">
          <NewsArchive />
        </div>
        <div class="mx-auto w-full">
          <div
            v-if="applicationId && application"
            class="mb-5"
          >
            <h1 class="text-2xl md:text-4xl pt-3 font-extrabold mb-2">
              {{ application.title }}
            </h1>
            <h2 class="text-sm italic mb-2">
              Alle nieuwsberichten gepubliceerd voor "{{ application.title }}"
            </h2>
            <router-link
              class="text-sm text-blue-600"
              :to="{ name: 'portal.news' }"
            >
              <i class="far fa-arrow-alt-circle-left" />
              Terug naar het nieuws van de dag
            </router-link>
          </div>
          <div
            v-if="archive"
            class="mb-4"
          >
            <h1 class="text-2xl md:text-4xl font-extrabold">
              Archief van {{ archive.month }} {{ archive.year }}
            </h1>
            <router-link
              class="text-sm text-blue-600"
              :to="{ name: 'portal.news' }"
            >
              <i class="far fa-arrow-alt-circle-left" />
              Terug naar het nieuws van de dag
            </router-link>
          </div>
          <div
            v-for="story in stories"
            :key="story.id"
            class="mb-10"
          >
            <StoryListItem :story="story" />
          </div>
          <RoutePagination
            class="mt-10 bg-white"
            :count="count"
            previous_text="Vorige"
            next_text="Volgende"
          >
            <template #showing="{ from, to, count }">
              <p class="text-sm text-gray-700">
                <span class="font-medium">{{ from }}</span>
                tot
                <span class="font-medium">{{ to }}</span>
                nieuwsberichten van in totaal
                <span class="font-medium">{{ count }}</span>.
              </p>
            </template>
          </RoutePagination>
        </div>
        <div class="sm:hidden bg-gray-200 p-3 mt-5 w-full rounded-lg">
          <NewsArchive />
        </div>
      </div>
      <div class="hidden sm:block clear-both" />
    </section>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import NewsArchive from '/@theme/apps/portal/components/NewsArchive.vue';
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import Spinner from '/src/components/Spinner.vue';
import { months } from '/src/common/useDayJS.js';
import { computed, toRefs, watch } from 'vue';
import RoutePagination from '/src/components/RoutePagination.vue';
import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import { useNewsStore } from '/src/apps/portal/stores/newsStore.js';
import useRoutePagination from '/src/composables/useRoutePagination.js';

export default {
  components: {
    RoutePagination,
    StoryListItem,
    Layout,
    NewsArchive,
    Spinner
  },
  props: {
    year: {
      type: Number,
      default: 0
    },
    month: {
      type: Number,
      default: 0
    },
    applicationId: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const applicationStore = useApplicationStore();
    const paginator = useRoutePagination();

    const newsStore = useNewsStore();

    const year = toRefs(props).year;
    const month = toRefs(props).month;
    const applicationId = toRefs(props).applicationId;

    const { loading, error } = newsStore.load({
      year,
      month,
      offset: paginator.offset,
      limit: paginator.limit,
      application: applicationId
    });

    watch(
      () => newsStore.count,
      (nv) => { paginator.count.value = nv; }
    );

    const application = computed(
      () => {
        if (props.applicationId) {
          return applicationStore.getById(props.applicationId);
        }
        return null;
      }
    );

    const stories = computed(() => newsStore.stories);

    const archive = computed(() => {
      if (props.year) {
        return {
          year: props.year,
          month: months()[props.month - 1]
        };
      }
      return null;
    });

    return {
      stories,
      error,
      loading,
      archive,
      application,
      count: paginator.count
    };
  }
};
</script>
