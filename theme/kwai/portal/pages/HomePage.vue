<template>
  <Layout
    image="/assets/portal/hero.jpg"
    :big="true"
  >
    <template #title>
      <Hero />
    </template>
    <section class="bg-gray-300 relative py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap">
          <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center -mt-32">
            <ApplicationCard
              v-if="clubApplication"
              class="bg-white"
              :application="clubApplication"
              :route="{ name: 'club' }"
              icon="fas fa-users"
              icon-bg-color="bg-red-700"
            />
          </div>
          <div class="pt-6 w-full md:w-4/12 px-4 text-center md:-mt-32">
            <ApplicationCard
              v-if="newsApplication"
              class="bg-white"
              :application="newsApplication"
              :route="{ name: 'news' }"
              icon="fas fa-newspaper"
              icon-bg-color="bg-red-700"
            />
          </div>
          <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center md:-mt-32">
            <ApplicationCard
              v-if="trainingsApplication"
              class="bg-white"
              :application="trainingsApplication"
              :route="{ name: 'trainings' }"
              icon="fas fa-university"
              icon-bg-color="bg-red-700"
            />
          </div>
        </div>
        <div class="flex flex-wrap flex-col lg:flex-row items-center mt-8">
          <Promotion class="w-full lg:w-5/12" />
          <Highlight
            v-if="highlight"
            :title="highlight.title"
            :image="highlight.image"
            bg-color="bg-red-700"
            text-color="text-white"
            class="w-full mt-4 lg:w-4/12"
          >
            <div
              class="text-md font-light mt-2 text-white"
              v-html="highlight.text"
            >
            </div>
          </Highlight>
        </div>
      </div>
    </section>
    <section class="bg-white py-8">
      <div class="lg:mx-36">
        <div class="pt-6 text-left md:text-center">
          <h2 class="mb-2 text-3xl font-extrabold leading-tight text-gray-900">
            Nieuws
          </h2>
          <p class="text-lg text-gray-500">
            Het belangrijkste nieuws van onze club op een rijtje.
          </p>
        </div>
        <div
          v-if="news"
          class="flex flex-col divide-y divide-gray-300"
        >
          <div
            v-for="story in news"
            :key="story.id"
            class="p-6"
          >
            <StoryListItem :story="story" />
          </div>
        </div>
      </div>
    </section>
    <section class="bg-gray-700 py-8">
      <div class="flex flex-wrap items-center pt-16 mx-auto">
        <div
          class="w-full lg:w-1/2 grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto"
          style="grid-auto-rows: 1fr;"
        >
          <div
            v-for="(board, index) in information_boards"
            :key="index"
          >
            <Card
              class="h-full"
              :title="board.title"
              :class="board['bg-color'] + ' ' + (board['text-color'] ?? 'text-white')"
            >
              <div class="flex flex-col justify-center h-full">
                <img
                    v-if="board.image"
                    :alt="board.title"
                    :src="board.image"
                    class="max-w-full w-32 mx-auto p-1 bg-white shadow-md rounded-full"
                />
                <div class="mt-5 text-opacity-70">
                  <div v-html="board.text"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import Card from '/src/components/Card.vue';
import StoryListItem from '/@theme/portal/components/StoryListItem.vue';
import Hero from '/@theme/portal/components/Hero.vue';
import ApplicationCard from '/@theme/portal/components/ApplicationCard.vue';
import Promotion from '/@theme/portal/components/Promotion.vue';
import Highlight from '/@theme/portal/components/Highlight.vue';

import useApplication from '/src/apps/portal/composables/useApplication.js';
import usePromotedNews from '/src/apps/portal/composables/usePromotedNews.js';

import config from '/@config';

export default {
  components: {
    StoryListItem,
    Highlight,
    Promotion,
    ApplicationCard,
    Layout,
    Hero,
    Card
  },
  setup() {
    const { application: newsApplication } = useApplication({ name: 'news' });
    const { application: clubApplication } = useApplication({ name: 'club' });
    const { application: trainingsApplication } = useApplication({ name: 'trainings' });

    const { news } = usePromotedNews();

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
