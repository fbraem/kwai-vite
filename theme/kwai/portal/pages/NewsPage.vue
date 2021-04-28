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
    <section class="container mx-auto py-8">
      <div class="w-full pt-6">
        <div class="hidden sm:block float-right bg-gray-200 m-3 p-3 w-1/3 rounded-lg">
          <NewsArchive></NewsArchive>
        </div>
        <div class="mx-auto w-full">
          <div
            v-if="application_id && application"
            class="mb-5"
          >
            <h1
                class="text-2xl md:text-4xl pt-3 font-extrabold mb-2"
            >
              {{ application.title }}
            </h1>
            <h2 class="text-sm italic mb-2">
              Alle nieuwsberichten gepubliceerd voor "{{ application.title }}"
            </h2>
            <router-link
                class="text-sm text-blue-600"
                :to="{ name: 'news' }"
            >
              <i class="far fa-arrow-alt-circle-left" />
              Terug naar het nieuws van de dag
            </router-link>
          </div>
          <div
            v-if="archive"
            class="mb-4"
          >
            <h1 class="text-2xl md:text-4xl pt-3 font-extrabold">
              Archief van {{ archive.month }} {{ archive.year }}
            </h1>
            <router-link
              class="text-sm text-blue-600"
              :to="{ name: 'news' }"
            >
              <i class="far fa-arrow-alt-circle-left" />
              Terug naar het nieuws van de dag
            </router-link>
          </div>
          <div
            v-for="story in news"
            :key="story.id"
            class="mb-10"
          >
            <StoryListItem :story="story" />
          </div>
          <Paginator
            v-if="pagination.pageCount > 0"
            class="mt-10"
            :pagination="pagination"
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
          </Paginator>
        </div>
        <div class="sm:hidden bg-gray-200 p-3 mt-5 w-full rounded-lg">
          <NewsArchive></NewsArchive>
        </div>
      </div>
      <div class="hidden sm:block clear-both">
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import NewsArchive from '/@theme/portal/components/NewsArchive.vue';
import Paginator from '/src/components/Paginator.vue';
import StoryListItem from '/@theme/portal/components/StoryListItem.vue';
import Spinner from '/src/components/Spinner.vue';
import useNews from '/src/apps/portal/composables/useNews.js';
import usePagination from '/src/composables/usePagination.js';
import { months } from '/src/common/useDayJS.js';
import useApplication from '/src/apps/portal/composables/useApplication.js';
import { computed, ref, toRefs } from 'vue';

export default {
  components: {
    StoryListItem,
    Layout,
    NewsArchive,
    Paginator,
    Spinner
  },
  props: {
    year: {
      type: Number,
      default: 0,
    },
    month: {
      type: Number,
      default: 0
    },
    application_id: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const pagination = usePagination({
      limit: ref(10)
    });

    const input = toRefs(props);
    const { news, error, loading } = useNews({
      ...input,
      ...pagination
    });

    const { application } = useApplication({ id: input.application_id });

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
      news,
      error,
      loading,
      archive,
      pagination,
      application
    };
  }
};
</script>
