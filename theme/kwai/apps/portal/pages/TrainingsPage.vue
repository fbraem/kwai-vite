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
      v-if="pageCount > 0"
      class="bg-white"
    >
      <div class="container mx-auto p-8 divide-y space-y-8 divide-gray-300">
        <template
          v-for="page in pages"
          :key="page.id"
        >
          <Article :article="page" />
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
import useApplication from '/src/apps/portal/composables/useApplication.js';
import usePromotedNews from '/src/apps/portal/composables/usePromotedNews.js';
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import usePages from '/src/apps/portal/composables/usePages.js';
import Article from '/@theme/apps/portal/components/Article.vue';
import { ref } from 'vue';

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
    const { application } = useApplication({ name: 'trainings' });
    const count = ref(0);
    const { news } = usePromotedNews({ count, application });

    const { pages, count: pageCount } = usePages(application);

    return {
      application,
      news,
      count,
      pages,
      pageCount
    };
  }
};
</script>
