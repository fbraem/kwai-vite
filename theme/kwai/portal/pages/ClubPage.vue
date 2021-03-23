<template>
  <Layout
    image="/@theme/portal/assets/club.jpg"
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
      <img
        src="/@theme/portal/assets/logo2.png"
        class="w-24 mx-auto mt-3"
        alt="logo"
      />
      <p class="mt-4 text-lg text-gray-100">
        {{ application.short_description }}
      </p>
    </template>
    <AngledSection
      v-if="pageCount > 0"
      bg-color="bg-white"
      text-color="text-white"
    >
      <div class="flex pt-6 divide-x divide-gray-300">
        <div class="w-1/3 pr-6">
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
        </div>
        <div class="w-2/3 pl-6">
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
import useApplication from '/src/apps/portal/composables/useApplication.js';
import usePages from '/src/apps/portal/composables/usePages.js';

import { website } from '/src/config/config.toml';
import ButtonLink from '/src/components/ButtonLink.vue';
import { computed, ref } from 'vue';

export default {
  components: {
    ButtonLink,
    Layout,
    AngledSection,
    Article,
    Header
  },
  setup() {
    const { application } = useApplication('club');
    const { pages, count: pageCount } = usePages(application);

    const currentArticleId = ref(null);
    const showArticle = (id) => {
      currentArticleId.value = id;
    };

    const currentArticle = computed(() => {
      if (currentArticleId.value === null) {
        if (pageCount.value > 0) {
          return pages.value[0];
        }
      } else {
        console.log(currentArticleId.value);
        return pages.value.find(p => p.id === currentArticleId.value);
      }
    });

    return {
      title: website.title,
      application,
      pages,
      pageCount,
      showArticle,
      currentArticle
    };
  }
};
</script>
