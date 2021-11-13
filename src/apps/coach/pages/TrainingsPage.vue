<template>
  <div class="pb-8">
    <PageSection>
      <div class="flex flex-row justify-between items-center pb-4">
        <Header>
          Trainingen
        </Header>
        <ButtonLink
          class="bg-yellow-500"
          :route="{ name: 'coach.trainings.create' }"
        >
          <i class="fas fa-plus mr-1" /> Nieuw
        </ButtonLink>
      </div>
      <div class="py-4 sm:py-8 px-4 bg-white">
        <div class="flex flex-row items-center space-x-6 py-4">
          <div>
            <ButtonLink
              class="bg-yellow-500"
              :route="previous"
            >
              <i class="fa fa-angle-left sm:mr-2" />
              <span class="hidden sm:inline">
                Vorige maand
              </span>
            </ButtonLink>
          </div>
          <h2 class="flex-grow text-2xl lg:text-3xl font-bold uppercase text-center">
            {{ monthName }} {{ year }}
          </h2>
          <div>
            <ButtonLink
              class="bg-yellow-500"
              :route="next"
            >
              <span class="hidden sm:inline">
                Volgende maand
              </span>
              <i class="fa fa-angle-right sm:ml-2" />
            </ButtonLink>
          </div>
        </div>
        <div
          v-if="store.count === 0"
          class="text-center text-sm"
        >
          Er zijn geen trainingen gepland in deze maand.
        </div>
        <div
          v-else-if="store.count === 1"
          class="text-center text-sm"
        >
          Er is 1 training gepland in deze maand.
        </div>
        <div
          v-else-if="store.count > 1"
          class="text-center text-sm"
        >
          Er zijn
          <span class="font-bold">
            {{ store.count }}
          </span>
          trainingen gepland in deze maand.
        </div>
      </div>
    </PageSection>
    <PageSection
      v-if="store.count > 0"
    >
      <div class="rounded-md shadow space-y-4">
        <div
          v-for="training in store.trainings"
          :key="training.id"
          class="border-b p-4 bg-white sm:hidden"
        >
          <dl class="pb-4">
            <div class="grid grid-cols-3 px-3 py-1 items-center">
              <dt>
              </dt>
              <dd class="col-span-2 font-medium">
                {{ training.title }}
              </dd>
            </div>
            <div class="grid grid-cols-3 px-3 py-1 items-center">
              <dt class="text-sm font-medium">
                Datum
              </dt>
              <dd class="col-span-2 text-sm flex flex-row space-x-2 items-center">
                <i
                  v-if="training.cancelled"
                  class="fas fa-times-circle text-red-500"
                />
                <div
                  class="flex flex-col text-center"
                  :class="{ 'text-red-500': training.cancelled, 'line-through': training.cancelled }"
                >
                  <div>
                    {{ training.start_date.format('ddd') }}&nbsp;
                    <span class="font-medium">
                      {{ training.start_date.format('L') }}
                    </span>
                  </div>
                  <div>
                    {{ training.start_date.format('HH:mm') }} - {{ training.end_date.format('HH:mm') }}
                  </div>
                </div>
              </dd>
            </div>
            <div class="grid grid-cols-3 px-3 py-1 items-center">
              <dt class="text-sm font-medium">
                Coaches
              </dt>
              <dd class="col-span-2 text-sm">
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
            <div class="grid grid-cols-3 px-3 py-1 items-center">
              <dt class="text-sm font-medium">
                Teams
              </dt>
              <dd class="col-span-2 text-sm">
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
          <div class="flex flex-row">
            <div
              v-if="training.summary.length > 0"
              class="text-xs text-center text-gray-600 flex-grow"
              v-html="training.summary"
            >
            </div>
            <div class="flex flex-row">
              <IconLink
                v-if="canUpdate(training)"
                icon="fas fa-edit"
                :route="{ name: 'coach.trainings.update', params: { id: training.id } }"
              />
              <IconLink
                v-if="canDelete(training)"
                icon="fas fa-trash-alt"
                class="text-red-600"
                :route="{ name: 'coach.trainings.create' }"
              />
            </div>
          </div>
        </div>
        <table class="w-full bg-white sm:table hidden text-left border-collapse">
          <thead class="border-b">
            <tr>
              <th class="px-3 py-2 text-sm font-medium uppercase bg-yellow-500">
                Datum / Training
              </th>
              <th class="px-3 py-2 text-sm font-medium uppercase bg-yellow-500">
                Coaches
              </th>
              <th class="px-3 py-2 text-sm font-medium uppercase bg-yellow-500">
                Teams
              </th>
              <th class="px-3 py-2 text-sm font-medium uppercase bg-yellow-500" />
            </tr>
          </thead>
          <template
            v-for="training in store.trainings"
            :key="training.id"
          >
            <tbody class="hover:bg-gray-200 border-b">
              <tr>
                <td
                  class="px-3 py-2 text-center flex flex-col items-center text-center space-y-2"
                  :class="{ 'text-red-500': training.cancelled, 'line-through': training.cancelled }"
                >
                  <div
                    class="font-medium"
                    :class="{ 'text-red-500': training.cancelled, 'line-through': training.cancelled }"
                  >
                    {{ training.title }}
                  </div>
                  <div class="flex flex-col">
                    <div class="text-sm">
                      {{ training.start_date.format('ddd') }}&nbsp;
                    </div>
                    <div class="font-medium text-sm">
                      {{ training.start_date.format('L') }}
                    </div>
                    <div class="text-sm">
                      {{ training.start_date.format('HH:mm') }} - {{ training.end_date.format('HH:mm') }}
                    </div>
                  </div>
                </td>
                <td class="w-1/3 px-3 py-2 text-xs">
                  <template
                    v-for="coach in training.coaches"
                    :key="coach.id"
                  >
                    <Badge class="bg-gray-300 mr-1 mt-1 text-center">
                      {{ coach.name }}
                    </Badge>
                  </template>
                </td>
                <td class="px-3 py-2 text-xs">
                  <template
                    v-for="team in training.teams"
                    :key="team.id"
                  >
                    <Badge class="bg-gray-300 mr-1">
                      {{ team.name }}
                    </Badge>
                  </template>
                </td>
                <td class="px-3 py-2">
                  <div class="flex flex-row flex-wrap">
                    <IconLink
                      v-if="canUpdate(training)"
                      icon="fas fa-edit"
                      :route="{ name: 'coach.trainings.update', params: { id: training.id } }"
                    />
                    <IconLink
                      v-if="canDelete(training)"
                      icon="fas fa-trash-alt"
                      class="text-red-600"
                      :route="{ name: 'coach.trainings.create' }"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  v-if="training.cancelled"
                  class="bg-red-500 text-white text-sm text-center"
                >
                  <i
                    class="fas fa-times-circle text-white mr-1"
                  /> Geannuleerd
                </td>
                <td
                  class="text-center pb-3 text-xs text-center text-gray-600"
                  :colspan="training.cancelled ? 3 : 4"
                >
                  <div v-html="training.summary" />
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
    </PageSection>
  </div>
</template>

<script>
import PageSection from '/@theme/components/PageSection.vue';
import Header from '/@theme/components/Header.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Badge from '/src/components/Badge.vue';
import useYearMonth from '/src/composables/useYearMonth.js';
import { useTrainingStore } from '/src/apps/coach/stores/trainingStore.js';
import { ref } from 'vue';
import IconLink from '/src/components/IconLink.vue';
import { useAbility } from '/src/common/useAbility.js';

export default {
  components: { IconLink, Badge, ButtonLink, Header, PageSection },
  setup() {
    const store = useTrainingStore();

    const { year, month, monthName, previous, next, start, end } = useYearMonth();
    const showActive = ref(true);
    store.load(showActive, { start, end });

    const ability = useAbility();
    const canUpdate = (training) => ability.can('update', training);
    const canDelete = (training) => ability.can('delete', training);

    return {
      store,
      year,
      month,
      monthName,
      previous,
      next,
      showActive,
      canUpdate,
      canDelete
    };
  }
};
</script>
