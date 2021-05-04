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
      v-if="pageCount > 0"
      class="bg-gray-200"
    >
      <div class="container mx-auto p-8 flex flex-wrap sm:divide-x sm:divide-gray-300">
        <div class="w-full sm:w-1/3 pr-6">
          <Header class="text-4xl">
            Alle informatie
          </Header>
          <div
            v-for="page in pages"
            :key="page.id"
            class="mt-4"
          >
            <h2 class="text-2xl">
              {{ page.title }}
            </h2>
            <div
              class="text-sm mb-4"
              v-html="page.summary"
            />
            <ButtonLink
              class="bg-red-700 text-white mt-6"
              :route="{
                name: application.name,
                params: {
                  id: page.id
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
import StoryListItem from '/@theme/portal/components/StoryListItem.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Article from '/@theme/portal/components/Article.vue';

import useApplication from '/src/apps/portal/composables/useApplication.js';
import usePages from '/src/apps/portal/composables/usePages.js';
import usePromotedNews from '/src/apps/portal/composables/usePromotedNews.js';

import { computed, ref } from 'vue';

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
    // We need a reactive application name to trigger useApplication
    const applicationName = computed(() => props.name);
    const { application } = useApplication({ name: applicationName });
    const { pages, count: pageCount } = usePages(application);

    const newsCount = ref(0);
    const { news } = usePromotedNews({ count: newsCount, application });

    const article = computed(() => {
      if (props.id) {
        if (pages.value) {
          return pages.value.find((p) => p.id === props.id);
        }
      }
      if (pages.value && pages.value.length > 0) {
        return pages.value[0];
      }
      return null;
    });

    return {
      application,
      pages,
      pageCount,
      newsCount,
      news,
      article
    };
  }
};
</script>
