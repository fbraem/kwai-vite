<template>
  <Layout image="/assets/portal/training.jpg">
    <template
      v-if="application"
      #title
    >
      <h1 class="text-white font-semibold text-4xl mb-2">
        {{ application.title }}
      </h1>
      <p class="mt-4 text-lg text-gray-100">
        {{ application.short_description }}
      </p>
    </template>
    <section class="bg-gray-300">
      <div class="container mx-auto p-8 flex flex-wrap md:flex-row">
        <div class="w-full md:w-1/2">
          <TrainingWeek />
          <div
            v-if="count > 0"
            class="mt-6"
          >
            <Header>Belangrijk Nieuws</Header>
            <template
              v-for="story in news"
              :key="story.id"
            >
              <StoryListItem :story="story" />
            </template>
          </div>
        </div>
        <div class="w-full mt-4 md:w-1/2 md:pl-10 lg:w-5/12">
          <Highlight
            title="Onze coaches"
            image="/assets/portal/hero.jpg"
          >
            <CoachList />
          </Highlight>
        </div>
      </div>
    </section>
    <section
      v-if="articleCount > 0"
      class="bg-white"
    >
      <div class="container mx-auto p-8 divide-y space-y-8 divide-gray-300">
        <template
          v-for="article in articles"
          :key="article.id"
        >
          <Article :article="article" />
        </template>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import Header from '/@theme/components/Header.vue';
import Highlight from '/@theme/apps/portal/components/Highlight.vue';
import CoachList from '/@theme/apps/portal/components/CoachList.vue';
import TrainingWeek from '/@theme/apps/portal/components/TrainingWeek.vue';
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import Article from '/@theme/apps/portal/components/Article.vue';

import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import { useNewsStore } from '/src/apps/portal/stores/newsStore.js';

import { computed } from 'vue';
import { useArticleStore } from '/src/apps/portal/stores/articleStore.js';

export default {
  components: {
    Article,
    StoryListItem,
    TrainingWeek,
    CoachList,
    Highlight,
    Header,
    Layout
  },
  setup() {
    const applicationStore = useApplicationStore();
    const application = computed(
      () => applicationStore.getByName('trainings')?.id
    );

    const articleStore = useArticleStore();
    articleStore.load({ application });
    const articles = computed(() => articleStore.articles);
    const articleCount = computed(() => articleStore.count);

    const newsStore = useNewsStore();
    newsStore.loadPromoted({ application });

    const count = computed(() => newsStore.count);
    const news = computed(() => newsStore.stories);

    return {
      application,
      news,
      count,
      articles,
      articleCount
    };
  }
};
</script>
