<template>
    <Layout :image="'/@theme/index/assets/hero.jpg'">
        <template #title>
            <Hero/>
        </template>
        <AngledSection
            bg-color="bg-gray-300"
            text-color="text-gray-300"
            class="relative pb-20"
        >
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap">
                    <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center -mt-32">
                        <ApplicationCard
                            class="bg-white"
                            v-if="clubApplication"
                            :application="clubApplication"
                            icon="fas fa-users"
                            icon-bg-color="bg-red-700"
                        />
                    </div>
                    <div class="pt-6 w-full md:w-4/12 px-4 text-center md:-mt-32">
                        <ApplicationCard
                            class="bg-white"
                            v-if="newsApplication"
                            :application="newsApplication"
                            icon="fas fa-newspaper"
                            icon-bg-color="bg-red-700"
                        >
                        </ApplicationCard>
                    </div>
                    <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center md:-mt-32">
                        <ApplicationCard
                            class="bg-white"
                            v-if="trainingsApplication"
                            :application="trainingsApplication"
                            icon="fas fa-university"
                            icon-bg-color="bg-red-700"
                        >
                        </ApplicationCard>
                    </div>
                </div>
                <div class="flex flex-wrap flex-col lg:flex-row items-center mt-8">
                    <Promotion class="w-full lg:w-5/12"/>
                    <Highlight
                        title="10de tornooi Judokwai Kemzeke"
                        image="/@theme/index/assets/hero.jpg"
                        bg-color="bg-red-700"
                        text-color="text-white"
                        class="w-full mt-4 lg:w-4/12"
                    >
                        <p class="text-md font-light mt-2 text-white">
                            In het weekend van 5-6 oktober organiseert onze club
                            de U11-U13 ontmoeting op zaterdag en de
                            kapoenenontmoeting voor U9 op zondag.
                        </p>
                    </Highlight>
                </div>
            </div>
        </AngledSection>
        <AngledSection text-color="text-white" bg-color="bg-white">
            <div class="pt-6 text-left md:text-center lg:mx-36">
                <h2 class="mb-2 text-3xl font-extrabold leading-tight text-gray-900">
                  Nieuws
                </h2>
                <p class="text-lg text-gray-500">
                  Het belangrijkste nieuws van onze club op een rijtje.
                </p>
            </div>
            <div
                v-if="news"
                class="flex flex-col space-y-6 divide-y divide-gray-300 lg:mx-36"
            >
                <div v-for="story in news">
                    <p class="pt-6 mb-3 text-sm font-normal text-gray-500">
                        {{ story.publish_date }}
                    </p>
                    <h2 class="mb-2 text-xl font-extrabold leading-snug tracking-tight text-gray-800 md:text-3xl">
                        <a
                            v-if="story.has_more"
                            href="#" class="text-gray-900 hover:text-blue-600"
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
                </div>
            </div>
        </AngledSection>
        <AngledSection
            text-color="text-gray-700"
            bg-color="bg-gray-700"
        >
          <div class="flex flex-wrap items-center pt-16 mx-auto">
            <div class="w-full lg:w-1/2 grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto" style="grid-auto-rows: 1fr;">
              <div v-for="board in information_boards">
                <Card
                    class="h-full"
                    :title="board.title"
                    :class="board['bg-color'] + ' ' + (board['text-color'] ?? 'text-white')"
                >
                  <img
                      v-if="board.image"
                      :alt="board.title"
                      :src="board.image"
                      class="max-w-full w-32 mx-auto p-1 bg-white shadow-md rounded-full"
                  />
                  <div class="mt-5 text-opacity-70">
                    <div v-html="board.text"></div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </AngledSection>
    </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import AngledSection from '/src/components/AngledSection.vue';
import Card from '/src/components/Card.vue';

import useSWRV from 'swrv';
import Hero from './components/Hero.vue';
import ApplicationSection from './components/ApplicationSection.vue';
import ApplicationCard from './components/ApplicationCard.vue';
import Promotion from './components/Promotion.vue';
import Highlight from './components/Highlight.vue';

import { computed } from 'vue';
import { useApplicationService } from '/src/services/ApplicationService';
import { useNewsService } from '/src/services/NewsService';

import config from '/src/config/config.yaml';

export default {
    components: {
        Highlight,
        Promotion,
        ApplicationCard,
        ApplicationSection,
        AngledSection,
        Layout,
        Hero,
        Card
    },
    setup () {
        const applicationService = useApplicationService();
        const { data: applicationResponse } = useSWRV('/index/applications/', applicationService.load);

        const newsApplication = computed(() => {
            if (applicationResponse.value) {
                return applicationResponse.value.find(
                    (d) => { return d.name === 'news'; }
                );
            }
        });
        const clubApplication = computed(() => {
            if (applicationResponse.value) {
                return applicationResponse.value.find(
                    (d) => d.name === 'club'
                );
            }
        });
        const trainingsApplication = computed(() => {
            if (applicationResponse.value) {
                return applicationResponse.value.find(
                    (d) => d.name === 'trainings'
                );
            }
        });

        const newsService = useNewsService();
        const { data: news } = useSWRV('/index/promoted', newsService.load);

        return {
          newsApplication,
          clubApplication,
          trainingsApplication,
          news,
          information_boards: config.website.information_boards
        };
    }
};
</script>
