<template>
  <Layout :image="image">
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
    <PageSection
      v-if="articleCount > 0"
      class="bg-gray-200"
    >
      <ArticleCards
        :articles="articles"
        :goto-article="(id) => gotoArticle(id)"
      />
    </PageSection>
    <PageSection class="bg-white">
      <TrainingWeek />
    </PageSection>
    <PageSection
      v-if="newsCount > 0"
      class="bg-gray-100"
    >
      <Header>
        Nieuws
      </Header>
      <div
        v-if="application"
        class="text-sm text-gray-700 mt-1"
      >
        Het belangrijkste nieuws in de categorie &quot;{{ application.title }}&quot;
      </div>
      <div class="xl:columns-2 xl:gap-10">
        <div
          v-for="story in news"
          :key="story.id"
          class="break-inside-avoid py-6"
        >
          <StoryListItem
            :story="story"
            class="border border-gray-300 bg-white p-3 rounded-lg"
          />
        </div>
      </div>
    </PageSection>
    <PageSection
      class="bg-gray-200"
    >
      <Header>
        Onze Coaches
      </Header>
      <CoachList class="bg-white rounded-lg p-2 mt-5" />
    </PageSection>
    <div ref="articleSection" />
    <router-view />
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import Header from '/@theme/components/Header.vue';
import CoachList from '/@theme/apps/portal/components/CoachList.vue';
import TrainingWeek from '/@theme/apps/portal/components/TrainingWeek.vue';
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import PageSection from '/@theme/components/PageSection.vue';

import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import { useNewsStore } from '/src/apps/portal/stores/newsStore.js';

import { computed, ref } from 'vue';
import { useArticleStore } from '/src/apps/portal/stores/articleStore.js';
import { useRouter } from 'vue-router';
import ArticleCards from '../components/ArticleCards.vue';

export default {
  components: {
    ArticleCards,
    StoryListItem,
    TrainingWeek,
    CoachList,
    Header,
    Layout,
    PageSection
  },
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const applicationStore = useApplicationStore();
    const application = computed(
      () => applicationStore.getByName(props.name)
    );
    const applicationId = computed(() => application.value?.id);

    const articleStore = useArticleStore();
    articleStore.load({ application: applicationId });
    const articles = computed(() => articleStore.articles);
    const articleCount = computed(() => articleStore.count);
    const router = useRouter();
    const articleSection = ref(null);
    const gotoArticle = async(id) => {
      await router.push({
        name: `portal.${props.name}.article`,
        params: {
          id
        }
      });
      articleSection.value.scrollIntoView(true);
    };

    const newsStore = useNewsStore();
    newsStore.loadPromoted({ application: applicationId });

    const news = computed(() => newsStore.stories);
    const newsCount = computed(() => newsStore.count);

    return {
      application,
      news,
      newsCount,
      articles,
      articleCount,
      gotoArticle,
      articleSection
    };
  }
};
</script>
