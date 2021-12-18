<template>
  <Layout :image="image">
    <template
      v-if="application"
      #title
    >
      <h1 class="text-white font-semibold text-4xl sm:text-5xl mb-2">
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
    <PageSection
      v-if="newsCount > 0"
      class="bg-gray-100"
    >
      <Header>
        Nieuws
      </Header>
      <div class="text-sm text-gray-700 mt-1">
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
    <div ref="articleSection" />
    <router-view />
  </Layout>
</template>

<script>
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import ArticleCards from '/@theme/apps/portal/components/ArticleCards.vue';
import Header from '/@theme/components/Header.vue';
import PageSection from '/@theme/components/PageSection.vue';
import Layout from '/@theme/layouts/LandingLayout.vue';

import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import { useArticleStore } from '/src/apps/portal/stores/articleStore.js';
import { useNewsStore } from '/src/apps/portal/stores/newsStore.js';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    ArticleCards,
    PageSection,
    StoryListItem,
    Layout,
    Header
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
    const application = computed(() => applicationStore.getByName(props.name));
    const applicationId = computed(() => application.value?.id);

    const articleStore = useArticleStore();
    articleStore.load({ application: applicationId });
    const articles = computed(() => articleStore.articles);
    const articleCount = computed(() => articleStore.count);

    const newsStore = useNewsStore();
    newsStore.loadPromoted({ application: applicationId });
    const newsCount = computed(() => newsStore.count);
    const news = computed(() => newsStore.stories);

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

    return {
      application,
      articles,
      articleCount,
      newsCount,
      news,
      gotoArticle,
      articleSection
    };
  }
};
</script>
