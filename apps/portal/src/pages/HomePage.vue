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
              {{ website.title }}
            </h1>
            <template
              v-for="(text, index) in portal.promotion"
              :key="index"
            >
              <p class="text-white leading-8">
                {{ text }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
  <HomeSectionApplications :applications="listedApplications" />
  <HomeSectionNews />
  <HomeSectionTrainings />
  <HomeSectionClub />
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-absolute-path
import heroUrl from '/hero.jpg';

import { ShallowReactive, shallowReactive } from 'vue';
import { useTitle } from '@vueuse/core';

import ClubIcon from '@theme/icons/ClubIcon.vue';
import NewsIcon from '@theme/icons/NewsIcon.vue';
import TrainingIcon from '@theme/icons/TrainingIcon.vue';

import { website, portal } from '@kwai/config';
import HomeSectionApplications from '@root/components/home/HomeSectionApplications.vue';
import HomeSectionNews from '@root/components/home/HomeSectionNews.vue';
import HomeSectionTrainings from '@root/components/home/HomeSectionTrainings.vue';
import HomeSectionClub from '@root/components/home/HomeSectionClub.vue';

interface ListedApplications {
  [key: string]: ShallowReactive<any>
}

const title = useTitle();
title.value = website.title;

const listedApplications: ListedApplications = shallowReactive({
  club: ClubIcon,
  news: NewsIcon,
  trainings: TrainingIcon,
});
</script>
