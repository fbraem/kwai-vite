<template>
  <section>
    <div
      class="relative"
      style="height:600px;"
    >
      <div
        class="absolute top-0 w-full h-full bg-center xl:bg-top bg-cover"
        :style="{ 'background-image': 'url(' + heroUrl + ')' }"
      >
        <span class="w-full h-full absolute opacity-50 bg-gradient-to-br from-black to-red-600" />
        <div class="container lg:max-w-5xl relative mx-auto h-full flex items-center">
          <div class="max-w-md flex flex-col space-y-5 px-4">
            <h1 class="text-5xl font-semibold text-white">
              Judokwai Kemzeke
            </h1>
            <p class="text-gray-200">
              Judokwai Kemzeke biedt in de gemeente Stekene judo aan op recreatief en competitief niveau, voor 5- tot plus 60- jarigen.
            </p>
            <p class="text-gray-200">
              Bovendien organiseert de club nevenactiviteiten zodat iedereen optimaal kan genieten van een aangename en positieve groepssfeer.
            </p>
            <p class="text-gray-200">
              Kom gerust een kijkje nemen tijdens een training.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div>
    <div class="container mx-auto p-4">
      <div class="grid gap-8 sm:grid-cols-1 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-1 justify-items-center">
        <ApplicationList>
          <template
            v-for="cardName in applicationCards"
            :key="cardName"
            #[`app-${cardName}`]="{ application }"
          >
            <Card class="max-w-sm p-6 w-full">
              <template #header>
                <CardRouterLinkedTitle
                  :to="{ name: 'home' }"
                  class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-flex items-center"
                >
                  <div
                    v-if="listedApplications[application.name]"
                    class="rounded-full w-8 h-8 bg-red-600 inline-flex items-center justify-center mr-1"
                  >
                    <component
                      :is="listedApplications[application.name]"
                      class="w-4 h-4 fill-white"
                    />
                  </div>
                  {{ application.title }}
                </CardRouterLinkedTitle>
              </template>
              <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {{ application.short_description }}
              </p>
            </Card>
          </template>
        </ApplicationList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-absolute-path
import heroUrl from '/hero.jpg';

import ApplicationList from '../components/ApplicationList.vue';
import { Card, CardRouterLinkedTitle } from '@kwai/ui';
import { ref, ShallowReactive, shallowReactive } from 'vue';
import ClubIcon from '@theme/icons/ClubIcon.vue';
import NewsIcon from '@theme/icons/NewsIcon.vue';
import TrainingIcon from '@theme/icons/TrainingIcon.vue';

interface ListedApplications {
  [key: string]: ShallowReactive<any>
}

const listedApplications: ListedApplications = shallowReactive({
  club: ClubIcon,
  news: NewsIcon,
  trainings: TrainingIcon,
});
const applicationCards = ref(['club', 'news', 'trainings']);
</script>
