<template>
  <Layout
      image="/@theme/index/assets/news.jpg"
      size="5"
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
      <OriginalNewsPage>
        <template #default="{ story }">
          <p class="pt-6 mb-3 text-sm font-normal text-gray-500">
            {{ story.publish_date }}
          </p>
          <h2 class="mb-2 text-xl font-extrabold leading-snug tracking-tight text-gray-800 md:text-3xl">
            <a
                v-if="story.has_more"
                href="#" class="text-gray-900"
            >
              {{ story.title }}
            </a>
            <span
                v-else
                class="text-gray-900"
            >
              {{ story.title }}
            </span>
          </h2>
          <p
              class="mb-4 text-base font-normal text-gray-600"
              v-html="story.summary"
          >
          </p>
          <button class="bg-red-700 text-white background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1" type="button">
            <i class="fas fa-angle-right"></i> Lees verder ...
          </button>
        </template>
      </OriginalNewsPage>
      <NewsArchive></NewsArchive>
    </AngledSection>
  </Layout>
</template>

<style scoped>
</style>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import OriginalNewsPage from '/src/pages/NewsPage.vue';
import NewsArchive from '/src/pages/NewsArchive.vue';
import AngledSection from '/src/components/AngledSection.vue';

export default {
  components: {
    AngledSection,
    Layout,
    OriginalNewsPage,
    NewsArchive
  }
}
</script>
