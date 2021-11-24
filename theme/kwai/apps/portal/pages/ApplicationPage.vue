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
    <section
      v-if="articleCount > 0"
      class="bg-gray-200"
    >
      <div class="container mx-auto p-8 flex flex-wrap sm:divide-x sm:divide-gray-300">
        <div class="w-full sm:w-1/3 pr-6">
          <Header class="text-4xl">
            Alle informatie
          </Header>
          <div
            v-for="article in articles"
            :key="article.id"
            class="mt-4"
          >
            <h2 class="text-2xl">
              {{ article.title }}
            </h2>
            <div
              class="text-sm mb-4"
              v-html="article.summary"
            />
            <ButtonLink
              class="bg-red-700 text-white mt-6"
              :route="{
                name: 'portal.' + application.name,
                params: {
                  id: article.id
                }
              }"
            >
              <i class="fas fa-angle-right mr-2"></i>Lees verder
            </ButtonLink>
          </div>
          <div
            v-if="newsCount > 0"
            class="mt-6"
          >
            <Header>Belangrijk Nieuws</Header>
            <div
              v-for="story in news"
              :key="story.id"
              class="mt-6"
            >
              <StoryListItem :story="story" />
            </div>
          </div>
        </div>
        <div
          id="article"
          class="w-full sm:w-2/3 pt-6 sm:pt-0 pl-0 sm:pl-6"
        >
          <Article
            v-if="article"
            :article="article"
          />
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import Header from '/@theme/components/Header.vue';
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Article from '/@theme/apps/portal/components/Article.vue';

import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import { useNewsStore } from '/src/apps/portal/stores/newsStore.js';
import { useArticleStore } from '/src/apps/portal/stores/articleStore.js';

import { computed } from 'vue';

export default {
  components: {
    StoryListItem,
    ButtonLink,
    Layout,
    Header,
    Article
  },
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false,
      default: null
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

    const article = computed(() => {
      if (props.id) {
        const article = articleStore.getById(props.id);
        if (article) return article;
      }
      if (articles.value.length > 0) {
        return articles.value[0];
      }
      return null;
    });

    return {
      application,
      articles,
      articleCount,
      newsCount,
      news,
      article
    };
  }
};
</script>
