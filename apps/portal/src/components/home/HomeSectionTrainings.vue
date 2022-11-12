<template>
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
              <ApplicationList :filter="['trainings']">
                <template
                  #default="{ application }"
                >
                  <h2 class="text-4xl font-semibold text-white mb-2">
                    {{ application.title }}
                  </h2>
                  <p
                    class="text-white leading-8"
                  >
                    {{ application.description }}
                  </p>
                </template>
              </ApplicationList>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-absolute-path
import trainingImage from '/training.jpg';
// eslint-disable-next-line import/no-absolute-path
import sporthalImage from '/sporthal.jpg';

import ApplicationList from '@root/components/ApplicationList.vue';
</script>
