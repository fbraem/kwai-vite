<template>
  <Layout
    image="/@theme/portal/assets/news.jpg"
    :big="false"
  >
    <template #title>
      <h1 class="text-white font-semibold text-4xl mb-2">
        Nieuws
      </h1>
      <p class="mt-4 text-lg text-gray-100">
        Op deze pagina vind je alle nieuwsberichten van onze club. Kom hier
        regelmatig eens kijken om op de hoogte te blijven!
      </p>
    </template>
    <AngledSection bg-color="bg-white" text-color="text-white">
      <div class="w-full">
        <div class="hidden sm:block float-right bg-gray-200 m-3 p-3 w-1/3 rounded-lg">
          <NewsArchive></NewsArchive>
        </div>
        <div class="mx-auto w-full">
<!--
          <template v-if="application">
            <h1 class="text-2xl md:text-4xl pt-3 font-extrabold">
              {{ application.title }}
            </h1>
            <router-link
                class="text-sm text-blue-600"
                :to="{ name: 'news' }"
            >
              <i class="far fa-arrow-alt-circle-left"></i>
              Terug naar het nieuws van de dag
            </router-link>
          </template>
-->
          <template v-if="archive">
            <h1 class="text-2xl md:text-4xl pt-3 font-extrabold">
              Archief van {{ archive.month }} {{ archive.year }}
            </h1>
            <router-link
                class="text-sm text-blue-600"
                :to="{ name: 'news' }"
            >
              <i class="far fa-arrow-alt-circle-left"></i>
              Terug naar het nieuws van de dag
            </router-link>
          </template>
          <div v-for="story in news">
            <StoryListItem :story="story" />
          </div>
          <Paginator
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
    </AngledSection>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import NewsArchive from '/@theme/portal/components/NewsArchive.vue';
import AngledSection from '/src/components/AngledSection.vue';
import Badge from '/src/components/Badge.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Paginator from '/src/components/Paginator.vue';
import StoryListItem from '/@theme/portal/components/StoryListItem.vue';
import useNews from '/src/apps/portal/composables/useNews.js';
import { months } from '/src/common/useDayJS.js';
import usePagination from '/src/composables/usePagination.js';
import { computed, ref, toRefs } from 'vue';

export default {
  components: {
    StoryListItem,
    ButtonLink,
    Badge,
    AngledSection,
    Layout,
    NewsArchive,
    Paginator
  },
  props: {
    year: {
      type: Number
    },
    month: {
      type: Number
    },
    app: {
      type: String
    }
  },
  setup(props) {
    const pagination = usePagination({
      limit: ref(10)
    });

    const { news, error, loading } = useNews({
      ...props,
      ...pagination
    });

    const archive = computed(() => {
      if (props.year) {
        return {
          year: props.year,
          month: months()[props.month -1]
        };
      }
      return null;
    });

    return {
      news,
      error,
      loading,
      archive,
      pagination
    }
  }
}
</script>
