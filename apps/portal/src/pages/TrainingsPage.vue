<template>
  <IntroSection
    :hero-image-url="trainingImage"
    :height="300"
  >
    <div class="container lg:max-w-5xl relative mx-auto flex h-full items-center">
      <div
        v-if="application"
        class="flex flex-col space-y-5 p-4"
      >
        <h1 class="text-4xl font-semibold text-white">
          {{ application.title }}
        </h1>
        <p
          class="text-white leading-8 text-xl"
        >
          {{ application.short_description }}
        </p>
      </div>
    </div>
  </IntroSection>
  <section class="grid grid-flow-col auto-cols-fr">
    <template
      v-for="(article, index) in articles"
      :key="article.id"
    >
      <a @click="gotoArticle(article.id)">
        <div
          class="text-center text-white p-8 h-full"
          :class="{ 'bg-black' : index % 2, 'bg-red-600': !(index % 2) }"
        >
          <h2 class="text-2xl mb-2 font-medium">
            {{ article.title }}
          </h2>
          <div
            class="text-gray-200"
            v-html="article.summary"
          />
        </div>
      </a>
    </template>
  </section>
  <div id="article" />
  <router-view />
  <section class="bg-zinc-50 py-24">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div>
          Nieuws
        </div>
        <div>
          Agenda
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-absolute-path
import trainingImage from '/training.jpg';

import IntroSection from '@root/components/IntroSection.vue';
import { useArticleStore } from '@root/stores/articleStore';
import { computed } from 'vue';
import { useApplicationStore } from '@root/stores/applicationStore';
import { useRouter } from 'vue-router';

const applicationStore = useApplicationStore();
applicationStore.setActiveApplication('trainings');
const application = computed(() => applicationStore.activeApplication);
const applicationId = computed(() => application.value?.id);

const articleStore = useArticleStore();
articleStore.load({ application: applicationId });

const articles = computed(() => articleStore.articles);

const router = useRouter();
const gotoArticle = async(id: string) => {
  await router.push({
    name: 'portal.trainings.article',
    params: { id },
  });
  const el = document.querySelector('#article');
  if (el) {
    el.scrollIntoView({ block: 'center' });
  }
};
</script>
