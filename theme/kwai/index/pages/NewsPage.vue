<template>
  <Layout
    image="/@theme/index/assets/news.jpg"
    :big="false"
  >
    <template #title>
      <h1 class="text-white font-semibold text-4xl mb-2">
        Nieuws
      </h1>
      <p class="mt-4 text-lg text-gray-100">
        Op deze pagina vind je alle nieuwsberichten van onze club. Kom hier
        regelmatig eens kijken om op de hoogte te blijven!
      </p>
    </template>
    <AngledSection bg-color="bg-white" text-color="text-white">
      <div class="w-full">
        <div class="hidden sm:block float-right bg-gray-200 m-3 p-3 w-1/3 rounded-lg">
          <NewsArchive></NewsArchive>
        </div>
        <div class="mx-auto w-full">
          <OriginalNewsPage v-bind="$attrs">
            <template #application="{ application }">
              <h1 class="text-2xl md:text-4xl pt-3 font-extrabold">
                {{ application.title }}
              </h1>
              <router-link
                  class="text-sm text-blue-600"
                  :to="{ name: 'news' }"
              >
                <i class="far fa-arrow-alt-circle-left"></i>
                Terug naar het nieuws van de dag
              </router-link>
            </template>
            <template #archive="{ archive }">
              <h1 class="text-2xl md:text-4xl pt-3 font-extrabold">
                Archief van {{ archive.month }} {{ archive.year }}
              </h1>
              <router-link
                  class="text-sm text-blue-600"
                  :to="{ name: 'news' }"
              >
                <i class="far fa-arrow-alt-circle-left"></i>
                Terug naar het nieuws van de dag
              </router-link>
            </template>
            <template #default="{ story }">
              <StoryListItem :story="story" />
            </template>
          </OriginalNewsPage>
        </div>
        <div class="sm:hidden bg-gray-200 p-3 mt-5 w-full rounded-lg">
          <NewsArchive></NewsArchive>
        </div>
      </div>
      <div class="hidden sm:block clear-both">
      </div>
    </AngledSection>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import OriginalNewsPage from '/src/apps/portal/pages/NewsPage.vue';
import NewsArchive from '/src/apps/portal/pages/NewsArchive.vue';
import AngledSection from '/src/components/AngledSection.vue';
import Badge from '/src/components/Badge.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import StoryListItem from '/@theme/index/components/StoryListItem.vue';

// Note: Instead of defining properties here and passing them one by one
// to the original page, properties are bind with $attrs
export default {
  components: {
    StoryListItem,
    ButtonLink,
    Badge,
    AngledSection,
    Layout,
    OriginalNewsPage,
    NewsArchive
  }
}
</script>
