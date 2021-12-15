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
      <div class="flex justify-center gap-10">
        <div
          v-for="article in articles"
          :key="article.id"
          class="w-1/3"
        >
          <IconCard
            :title="article.title"
            class="bg-white h-full p-3"
          >
            <div class="flex flex-col justify-between h-full">
              <div
                class="grow text-sm"
                v-html="article.summary"
              />
              <div class="mt-2">
                <ButtonLink
                  class="bg-red-700 text-white mt-6"
                  :method="() => gotoArticle(article.id)"
                >
                  <i class="fas fa-angle-right mr-2" />Lees verder
                </ButtonLink>
              </div>
            </div>
          </IconCard>
        </div>
      </div>
    </PageSection>
    <PageSection
      v-if="newsCount > 0"
    >
      <Header>
        Nieuws
      </Header>
      <div class="text-sm text-gray-700 mt-1">
        Het belangrijkste nieuws in de categorie &quot;{{application.title}}&quot;
      </div>
      <div class="xl:columns-2 xl:gap-10">
        <div
          v-for="story in news"
          :key="story.id"
          class="break-inside-avoid py-6"
        >
          <StoryListItem
            :story="story"
            class="bg-gray-200 p-3 rounded-lg"
          />
        </div>
      </div>
    </PageSection>
    <div ref="articleSection" />
    <PageSection
      class="border-t border-gray-300"
    >
      <router-view />
    </PageSection>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import PageSection from '/@theme/components/PageSection.vue';
import Header from '/@theme/components/Header.vue';
import StoryListItem from '/@theme/apps/portal/components/StoryListItem.vue';
import IconCard from '/src/components/IconCard.vue';
import ButtonLink from '/src/components/ButtonLink.vue';

import { useApplicationStore } from '/src/apps/portal/stores/applicationStore.js';
import { useNewsStore } from '/src/apps/portal/stores/newsStore.js';
import { useArticleStore } from '/src/apps/portal/stores/articleStore.js';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    PageSection,
    IconCard,
    StoryListItem,
    ButtonLink,
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

    const router = useRouter();
    const articleSection = ref(null);
    const gotoArticle = async(id) => {
      await router.push({
        name: `portal.${props.name}.article`,
        params: {
          id
        }
      });
      articleSection.value.scrollIntoView();
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
