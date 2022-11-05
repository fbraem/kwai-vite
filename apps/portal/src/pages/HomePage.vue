<template>
  <!-- INTRO -->
  <section>
    <div
      class="relative"
      style="height:600px;"
    >
      <div
        class="absolute w-full h-full bg-center xl:bg-top bg-cover"
        :style="{ 'background-image': 'url(' + heroUrl + ')' }"
      >
        <span class="w-full h-full absolute opacity-50 bg-gradient-to-br from-black to-red-600" />
        <div class="container lg:max-w-5xl relative mx-auto h-full flex items-center">
          <div class="max-w-md flex flex-col space-y-5 p-4">
            <h1 class="text-4xl font-semibold text-white">
              Judokwai Kemzeke
            </h1>
            <p class="text-white leading-8">
              Judokwai Kemzeke biedt in de gemeente Stekene judo aan op recreatief en competitief niveau, voor 5- tot plus 60- jarigen.
            </p>
            <p class="text-white leading-8">
              Bovendien organiseert de club nevenactiviteiten zodat iedereen optimaal kan genieten van een aangename en positieve groepssfeer.
            </p>
            <p class="text-white leading-8">
              Kom gerust een kijkje nemen tijdens een training.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- APPLICATIONS -->
  <section class="grid grid-cols-1 lg:grid-cols-3">
    <ApplicationList :filter="applicationCards">
      <template
        v-for="(applicationName, index) in applicationCards"
        :key="applicationName"
        #[`app-${applicationName}`]="{ application }"
      >
        <router-link
          :to="`/${application.name}`"
        >
          <div
            class="text-center text-white p-8 h-full"
            :class="{ 'bg-black' : index % 2, 'bg-red-600': !(index % 2) }"
          >
            <div
              v-if="listedApplications[application.name]"
              class="rounded-full inline-flex items-center justify-center mb-3"
            >
              <component
                :is="listedApplications[application.name]"
                class="w-8 h-8 fill-white"
              />
            </div>
            <h2 class="text-2xl mb-2 font-medium">
              {{ application.title }}
            </h2>
            <p class="text-gray-200">
              {{ application.short_description }}
            </p>
          </div>
        </router-link>
      </template>
    </ApplicationList>
  </section>
  <!-- NEWS -->
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
        <div
          v-for="story in promotedNews"
          :key="story.id"
          class="mb-7 px-4 flex flex-col"
        >
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
      </div>
      <div class="mb-12">
        <h2 class="text-4xl font-medium text-center mb-6">
          Meer nieuws
        </h2>
        <p class="text-gray-600 text-center">
          Nog meer nieuws kan je lezen op onze nieuwspagina.
        </p>
      </div>
    </div>
  </section>
  <!-- TRAININGS -->
  <section>
    <div
      class="relative"
      style="height:600px;"
    >
      <div
        class="absolute w-full h-full bg-center bg-cover"
        :style="{ 'background-image' : `url(${trainingImage})` }"
      >
        <span class="absolute w-full h-full opacity-50 bg-gradient-to-br from-black to-red-600" />
        <div class="container relative mx-auto h-full flex items-center p-4">
          <div class="grid lg:grid-cols-2 gap-10 lg:justify-items-center">
            <div class="mx-auto">
              <img
                :src="sporthalImage"
                alt="sporthal"
                class="border-2 border-black max-h-80"
              >
            </div>
            <div>
              <h2 class="text-4xl font-semibold text-white mb-2">
                Trainingen
              </h2>
              <p class="text-white leading-8">
                We trainen in de sporthal van Stekene.
              </p>
              <p class="text-white leading-8">
                Afhankelijk van je leeftijd kan je trainen op woensdag, vrijdag of zaterdag. De training op maandag is voor judoka's die regelmatig deelnemen aan tornooien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-absolute-path
import heroUrl from '/hero.jpg';
// eslint-disable-next-line import/no-absolute-path
import newsImage from '/news.jpg';
// eslint-disable-next-line import/no-absolute-path
import trainingImage from '/training.jpg';
// eslint-disable-next-line import/no-absolute-path
import sporthalImage from '/sporthal.jpg';

import ApplicationList from '@root/components/ApplicationList.vue';
import { computed, ref, ShallowReactive, shallowReactive } from 'vue';
import ClubIcon from '@theme/icons/ClubIcon.vue';
import NewsIcon from '@theme/icons/NewsIcon.vue';
import TrainingIcon from '@theme/icons/TrainingIcon.vue';
import { usePromotedNewsStore } from '@root/stores/newsStore';

interface ListedApplications {
  [key: string]: ShallowReactive<any>
}

const listedApplications: ListedApplications = shallowReactive({
  club: ClubIcon,
  news: NewsIcon,
  trainings: TrainingIcon,
});
const applicationCards = ref(['club', 'news', 'trainings']);

const promotedStore = usePromotedNewsStore();
promotedStore.load();
const promotedNews = computed(() => promotedStore.items);
</script>
