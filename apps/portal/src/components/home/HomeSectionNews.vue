<template>
  <section class="py-24 bg-zinc-50">
    <div class="container mx-auto px-12 flex flex-col">
      <div class="mb-12">
        <h2 class="text-4xl font-medium text-center mb-6">
          Hoogtepunten
        </h2>
        <p class="text-gray-600 text-center">
          Het belangrijkste <strong>nieuws</strong> van onze club op een rijtje...
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3">
        <NewsList :promoted="true">
          <template #default="{ story }">
            <div class="mb-7 px-4 flex flex-col">
              <router-link
                class="block flex items-end bg-cover"
                style="height: 200px;"
                :style="{ 'background-image': `url(${newsImage})` }"
                to="/news"
              >
                <div class="text-center p-2 bg-red-600 text-white min-w-fit">
                  <span class="block font-bold text-xl">
                    {{ story.publish_date.format('D') }}
                  </span>
                  <span class="block text-sm">
                    {{ story.publish_date.format('MMM') }}
                  </span>
                  <span class="block text-sm">
                    {{ story.publish_date.format('YYYY') }}
                  </span>
                </div>
              </router-link>
              <div class="p-6 bg-white flex-1 grid auto-rows-min">
                <h3 class="text-xl mb-4">
                  <router-link to="/news">
                    {{ story.contents[0].title }}
                  </router-link>
                </h3>
                <p
                  class="text-gray-500 flex-grow"
                  v-html="story.contents[0].summary"
                />
                <div class="mt-6">
                  <router-link
                    class="border border-red-600 bg-red-600 hover:bg-white hover:text-red-600 text-white rounded-full py-1.5 px-3"
                    to="/news"
                  >
                    Lees meer
                  </router-link>
                </div>
              </div>
            </div>
          </template>
        </NewsList>
      </div>
      <div class="mb-12">
        <h2 class="text-4xl font-medium text-center mb-6">
          Meer nieuws
        </h2>
        <p class="text-gray-600 text-center">
          Nog meer nieuws kan je lezen op onze
          <router-link
            to="/portal/news"
            class="hover:underline text-blue-400"
          >
            nieuwspagina
          </router-link>.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-absolute-path
import newsImage from '/news.jpg';
import NewsList from '@root/components/NewsList.vue';
</script>
