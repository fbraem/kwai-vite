<template>
  <Layout
    image="/@theme/portal/assets/training.jpg"
    :big="false"
  >
    <template #title>
      <h1 class="text-white font-semibold text-4xl mb-2">
        Trainingen
      </h1>
      <p class="mt-4 text-lg text-gray-100">
        Wanneer trainen we? Waar trainen we? Waar kan je nog trainen?
      </p>
    </template>
    <AngledSection bg-color="bg-gray-300" text-color="text-gray-300">
      <div class="container mx-auto px-4 pt-6">
        <div class="flex flex-wrap md:flex-row">
          <TrainingWeek class="w-full md:w-1/2">
          </TrainingWeek>
          <div class="w-full mt-4 md:w-1/2 md:pl-10 lg:w-5/12">
            <Highlight
                title="Onze coaches"
                image="/@theme/portal/assets/hero.jpg"
            >
              <CoachList />
            </Highlight>
          </div>
        </div>
      </div>
    </AngledSection>
  </Layout>
</template>

<script>

import Layout from '/@theme/layouts/LandingLayout.vue';
import AngledSection from '/src/components/AngledSection.vue';
import Header from '/@theme/components/Header.vue';
import Alert from '/src/components/Alert.vue';
import Highlight from '/@theme/portal/components/Highlight.vue';
import CoachList from '/@theme/portal/components/CoachList.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import TrainingWeek from '/@theme/portal/components/TrainingWeek.vue';

export default {
  components: {
    TrainingWeek,
    ButtonLink,
    CoachList,
    Highlight,
    Alert,
    Header,
    Layout,
    AngledSection
  }
}
</script>
