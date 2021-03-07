<template>
  <Layout
    image="/@theme/portal/assets/training.jpg"
    :big="true"
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
        <div class="flex flex-wrap flex-col lg:flex-row items-center">
          <div class="w-full lg:w-5/12">
            <Header>Trainingen Komende Week</Header>
            <BaseTrainingsPage>
              <template #default="{ trainings }">
                <Alert
                    v-if="trainings.meta.count === 0"
                    type="info"
                    icon="fas fa-info"
                >
                  Geen trainingen gepland voor de komende week.
                </Alert>
                {{ trainings }}
              </template>
            </BaseTrainingsPage>
          </div>
          <Highlight
              title="Onze coaches"
              image="/@theme/portal/assets/hero.jpg"
              class="w-full mt-4 lg:w-4/12"
          >
            <CoachList>
              <template #default="{ coaches }">
                <div v-for="coach in coaches">
                  {{ coach }}
                </div>
              </template>
            </CoachList>
          </Highlight>
        </div>
      </div>
    </AngledSection>
  </Layout>
</template>

<script>

import Layout from '/@theme/layouts/LandingLayout.vue';
import AngledSection from '/src/components/AngledSection.vue';
import BaseTrainingsPage from '/src/apps/portal/pages/TrainingsPage.vue';
import Header from '/@theme/components/Header.vue';
import Alert from '/src/components/Alert.vue';
import Highlight from '/@theme/portal/components/Highlight.vue';
import CoachList from '/src/apps/portal/components/CoachList.vue';

export default {
  components: {
    CoachList,
    Highlight,
    Alert,
    Header,
    Layout,
    AngledSection,
    BaseTrainingsPage
  }
}
</script>
