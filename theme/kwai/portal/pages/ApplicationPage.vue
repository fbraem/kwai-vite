<template>
  <Layout
    :image="image"
    :big="true"
  >
    <template
      v-if="application"
      #title
    >
      <h1 class="text-white font-semibold text-4xl mb-2">
        {{ title }}
      </h1>
      <h2 class="text-white font-semibold text-2xl mb-2">
        {{ application.title }}
      </h2>
      <p class="mt-4 text-lg text-gray-100">
        {{ application.short_description }}
      </p>
    </template>
    <AngledSection
      v-if="pageCount > 0"
      bg-color="bg-white"
      text-color="text-white"
    >
      <div class="flex flex-wrap pt-6 sm:divide-x sm:divide-gray-300">
        <div class="w-full sm:w-1/3 pr-6 sm:pr-0">
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
              class="text-sm"
              v-html="page.summary"
            />
            <ButtonLink
              class="bg-red-700 text-white mt-6"
              :method="() => showArticle(page.id)"
            >
              <i class="fas fa-angle-right"></i> Lees verder ...
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
            v-if="currentArticle"
            :article="currentArticle"
          />
        </div>
      </div>
    </AngledSection>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import AngledSection from '/src/components/AngledSection.vue';
import Article from '/@theme/portal/components/Article.vue';
import Header from '/@theme/components/Header.vue';
import StoryListItem from '/@theme/portal/components/StoryListItem.vue';
import ButtonLink from '/src/components/ButtonLink.vue';

import useApplication from '/src/apps/portal/composables/useApplication.js';
import usePages from '/src/apps/portal/composables/usePages.js';
import usePromotedNews from '/src/apps/portal/composables/usePromotedNews.js';

import { website } from '/src/config/config.toml';

import { computed, ref } from 'vue';

export default {
  components: {
    StoryListItem,
    ButtonLink,
    Layout,
    AngledSection,
    Article,
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
    const { application } = useApplication({ name: props.name });
    const { pages, count: pageCount } = usePages(application);

    const currentArticleId = ref(null);
    const showArticle = (id) => {
      currentArticleId.value = id;
      const el = document.querySelector('#article');
      el.scrollIntoView();
    };

    const currentArticle = computed(() => {
      if (currentArticleId.value === null) {
        if (pageCount.value > 0) {
          return pages.value[0];
        }
      } else {
        return pages.value.find(p => p.id === currentArticleId.value);
      }
    });

    const newsCount = ref(0);
    const { news } = usePromotedNews({ count: newsCount, application });

    return {
      title: website.title,
      application,
      pages,
      pageCount,
      showArticle,
      currentArticle,
      newsCount,
      news
    };
  }
};
</script>
