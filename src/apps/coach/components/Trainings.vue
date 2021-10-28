<template>
  <PageSection v-if="trainings.length > 0">
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div
        v-for="training in trainings"
        :key="training.id"
        class="shadow-2xl overflow-hidden sm:rounded-lg w-full"
      >
        <div class="bg-gray-300 px-4 py-5">
          <div class="flex flex-row justify-between items-center">
            <h3 class="inline-flex items-end justify-between flex-grow text-lg leading-6 font-medium text-gray-900">
              <span class="block">
                <span class="text-sm">
                  {{ training.start_date.format('ddd') }}
                </span>
                {{ training.start_date.format('L') }}
              </span>
              <span class="">{{ training.start_date.format('HH:mm') }} - {{ training.end_date.format('HH:mm') }}</span>
            </h3>
            <div
              v-if="training.cancelled"
              class="hidden sm:block bg-red-600 text-white font-bold text-xs uppercase px-3 py-1 ml-2"
            >
              <i class="fa fa-exclamation-triangle mr-2" /> Geannuleerd
            </div>
          </div>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {{ training.title }}
          </p>
        </div>
        <div class="border-t border-gray-200">
          <div
            v-if="training.cancelled"
            class="sm:hidden bg-red-600 text-white font-bold text-xs uppercase px-3 py-1"
          >
            <i class="fa fa-exclamation-triangle mr-2" /> Geannuleerd
          </div>
          <dl>
            <div
              v-if="training.location"
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">
                Locatie
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ training.location }}
              </dd>
            </div>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Coaches
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row flex-wrap">
                <template
                  v-for="coach in training.coaches"
                  :key="coach.id"
                >
                  <Badge class="bg-gray-300 mr-1 mt-1">
                    {{ coach.name }}
                  </Badge>
                </template>
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Teams
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <template
                  v-for="team in training.teams"
                  :key="team.id"
                >
                  <Badge class="bg-gray-300 mr-1">
                    {{ team.name }}
                  </Badge>
                </template>
              </dd>
            </div>
          </dl>
        </div>
        <div
          v-if="training.summary.length > 0"
          class="bg-white px-4 py-5 sm:px-6 border-t border-gray-200"
        >
          <dt class="text-sm font-medium text-gray-500" />
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <div v-html="training.summary" />
          </dd>
        </div>
      </div>
    </div>
  </PageSection>
</template>

<script>
import PageSection from '/@theme/components/PageSection.vue';
import Badge from '/src/components/Badge.vue';

export default {
  components: {
    PageSection, Badge
  },
  props: {
    trainings: {
      type: Array,
      required: true
    }
  }
};
</script>
