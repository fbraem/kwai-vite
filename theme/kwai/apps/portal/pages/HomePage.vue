<template>
  <Layout image="/assets/portal/hero.jpg">
    <template #title>
      <Hero />
    </template>
    <section class="bg-gray-300 relative pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap">
          <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center -mt-32">
            <ApplicationCard
              v-if="clubApplication"
              class="bg-white p-3"
              :application="clubApplication"
              :route="{ name: 'portal.club' }"
              icon="fas fa-users"
              icon-bg-color="bg-red-700"
            />
          </div>
          <div class="pt-6 w-full md:w-4/12 px-4 text-center md:-mt-32">
            <ApplicationCard
              v-if="newsApplication"
              class="bg-white p-3"
              :application="newsApplication"
              :route="{ name: 'portal.news' }"
              icon="fas fa-newspaper"
              icon-bg-color="bg-red-700"
            />
          </div>
          <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center md:-mt-32">
            <ApplicationCard
              v-if="trainingsApplication"
              class="bg-white p-3"
              :application="trainingsApplication"
              :route="{ name: 'portal.trainings' }"
              icon="fas fa-university"
              icon-bg-color="bg-red-700"
            />
          </div>
        </div>
        <div class="flex flex-wrap flex-col lg:flex-row items-center mt-8">
          <Promotion
            class="w-full"
            :class="{
              'lg:w-2/3': !highlight,
              'lg:w-1/3': highlight
            }"
          />
          <Highlight
            v-if="highlight"
            :title="highlight.title"
            :image="highlight.image"
            bg-color="bg-red-700"
            text-color="text-white"
            class="w-full mt-4 lg:w-1/3"
          >
            <div
              class="text-md font-light mt-2 text-white"
              v-html="highlight.text"
            />
          </Highlight>
        </div>
      </div>
    </section>
    <PageSection
      v-if="news"
      class="bg-white"
    >
      <div class="text-left md:text-center md:mb-10">
        <h2 class="mb-2 text-3xl font-extrabold leading-tight text-gray-900">
          Nieuws
        </h2>
        <p class="text-lg text-gray-500">
          Het belangrijkste nieuws van onze club op een rijtje.
        </p>
      </div>
      <div class="xl:columns-2 xl:gap-10">
        <div
          v-for="story in news"
          :key="story.id"
          class="break-inside-avoid p-6"
        >
          <StoryListItem
            :story="story"
            class="bg-gray-200 p-3 rounded-lg"
          />
        </div>
      </div>
    </PageSection>
    <PageSection class="bg-gray-700">
      <div class="flex flex-wrap items-center">
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-14"
          style="grid-auto-rows: 1fr;"
        >
          <div
            v-for="(board, index) in information_boards"
            :key="index"
          >
            <div
              class="relative flex flex-col break-normal w-full mb-8 shadow-lg rounded-lg text-center h-full"
              :class="board['bg-color'] + ' ' + (board['text-color'] ?? 'text-white')"
            >
              <h6 class="text-xl font-semibold mb-2 px-4 py-5">
                {{ board.title }}
              </h6>
              <div
                v-if="board.image"
                class="flex-grow flex items-center"
              >
                <img
                  :alt="board.title"
                  :src="board.image"
                  class="max-w-full w-32 mx-auto p-1 bg-white shadow-md rounded-full"
                >
              </div>
              <div class="mt-5 text-opacity-70 p-4">
                <div v-html="board.text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import PageSection from '/@theme/components/PageSection.vue';
import Hero from '/@theme/apps/portal/components/Hero.vue';
import ApplicationCard from '/@theme/apps/portal/components/ApplicationCard.vue';
import Promotion from '/@theme/apps/portal/components/Promotion.vue';
import Highlight from '/@theme/apps/portal/components/Highlight.vue';
import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import { useNewsStore } from '/src/apps/portal/stores/newsStore.js';

import config from '/@config';

import { computed } from 'vue';

export default {
  components: {
    PageSection,
    StoryListItem,
    Highlight,
    Promotion,
    ApplicationCard,
    Layout,
    Hero
  },
  setup() {
    const applicationStore = useApplicationStore();
    // applicationStore.load();

    const newsApplication = computed(() => applicationStore.getByName('news'));
    const clubApplication = computed(() => applicationStore.getByName('club'));
    const trainingsApplication = computed(() => applicationStore.getByName('trainings'));

    const newsStore = useNewsStore();
    newsStore.loadPromoted();
    const news = computed(() => newsStore.stories);

    return {
      newsApplication,
      clubApplication,
      trainingsApplication,
      news,
      information_boards: config.website.information_boards,
      highlight: config.website.highlight
    };
  }
};
</script>
