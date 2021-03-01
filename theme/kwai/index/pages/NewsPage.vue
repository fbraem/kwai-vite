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
      <div class="flex flex-wrap">
        <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
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
              <ButtonLink
                  class="bg-red-700 text-white"
                  :route="{ name: 'news.story', params: { id: story.id }}"
              >
                <i class="fas fa-angle-right"></i> Lees verder ...
              </ButtonLink>
            </template>
          </OriginalNewsPage>
        </div>
        <div class="w-full md:w-4/12 px-4 mx-auto">
          <NewsArchive></NewsArchive>
        </div>
      </div>
    </AngledSection>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import OriginalNewsPage from '/src/pages/NewsPage.vue';
import NewsArchive from '/src/pages/NewsArchive.vue';
import AngledSection from '/src/components/AngledSection.vue';
import Badge from '/src/components/Badge.vue';
import ButtonLink from '/src/components/ButtonLink.vue';

export default {
  components: {
    ButtonLink,
    Badge,
    AngledSection,
    Layout,
    OriginalNewsPage,
    NewsArchive
  }
}
</script>
