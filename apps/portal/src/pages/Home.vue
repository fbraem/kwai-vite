<template>
  <div>
    <div class="container mx-auto p-4">
      <div class="grid gap-8 sm:grid-cols-1 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-1 justify-items-center">
        <ApplicationList>
            <template
                v-for="cardName in applicationCards"
                v-slot:[`app-${cardName}`]="{ application }"
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
import ApplicationList from "../components/ApplicationList.vue"
import { Card, CardRouterLinkedTitle } from "@kwai/ui"
import { ref, ShallowReactive, shallowReactive } from "vue"
import ClubIcon from "@theme/icons/ClubIcon.vue"
import NewsIcon from "@theme/icons/NewsIcon.vue"
import TrainingIcon from '@theme/icons/TrainingIcon.vue'

interface ListedApplications {
  [key: string]: ShallowReactive<any>
}

const listedApplications: ListedApplications = shallowReactive({
  club: ClubIcon,
  news: NewsIcon,
  trainings: TrainingIcon
})
const applicationCards = ref(["club", "news", "trainings"])
</script>
