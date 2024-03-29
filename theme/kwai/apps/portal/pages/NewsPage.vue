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
    <PageSection class="relative bg-gray-200">
      <div class="flex justify-end">
        <Popover
          v-slot="{ open }"
          class="relative"
        >
          <PopoverButton
            class="bg-red-700 text-white font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 hover:text-opacity-80"
          >
            <i class="fas fa-archive mr-2" />Archief
            <i class="fas fa-chevron-down ml-6" />
          </PopoverButton>
          <PopoverOverlay
            class="bg-black"
            :class="open ? 'opacity-30 fixed inset-0' : 'opacity-0'"
          />
          <PopoverPanel class="absolute right-0 z-10 bg-white px-3 py-2 mt-1 rounded-md w-screen max-w-xs">
            <NewsArchive />
          </PopoverPanel>
        </Popover>
      </div>
      <div
        v-if="application"
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
        <h1 class="text-2xl md:text-4xl font-extrabold mb-2">
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
      <div class="xl:columns-2 xl:gap-10 py-6 sm:py-0">
        <div
          v-for="story in stories"
          :key="story.id"
          class="break-inside-avoid py-3 md:py-6"
        >
          <StoryListItem
            :story="story"
            class="border border-gray-300 bg-white p-3 rounded-lg"
          />
        </div>
      </div>
      <RoutePagination
        class="bg-white border-t border-gray-200"
        :count="newsCount"
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
    </PageSection>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import NewsArchive from '/@theme/apps/portal/components/NewsArchive.vue';
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import Spinner from '/src/components/Spinner.vue';
import { months } from '/src/common/useDayJS.js';
import { computed, toRefs } from 'vue';
import RoutePagination from '/src/components/RoutePagination.vue';
import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import { useNewsStore } from '/src/apps/portal/stores/newsStore.js';
import useRoutePagination from '/src/composables/useRoutePagination.js';
import PageSection from '/@theme/components/PageSection.vue';
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue';

export default {
  components: {
    PageSection,
    RoutePagination,
    StoryListItem,
    Layout,
    NewsArchive,
    Spinner,
    Popover,
    PopoverButton,
    PopoverPanel,
    PopoverOverlay
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
    const stories = computed(() => newsStore.stories);
    const newsCount = computed(() => newsStore.count);

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

    const application = computed(
      () => {
        if (props.applicationId) {
          return applicationStore.getById(props.applicationId.toString());
        }
        return null;
      }
    );

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
      newsCount
    };
  }
};
</script>
