<template>
  <Layout image="/assets/portal/events.jpg">
    <template #title>
      <h1 class="text-white font-semibold text-4xl mb-2">
        Kalender
      </h1>
    </template>
    <section class="bg-gray-200 py-4 sm:py-8 px-4 sm:px-12">
      <div class="mb-4">
        <div class="flex flex-row justify-center space-x-6 py-4">
          <div>
            <ButtonLink
              class="bg-red-600 text-white"
              :route="previous"
            >
              <i class="fa fa-angle-left sm:mr-2" />
              <span class="hidden sm:inline">
                Vorige maand
              </span>
            </ButtonLink>
          </div>
          <h2 class="flex-grow text-2xl md:text-3xl font-bold uppercase text-center">
            {{ monthName }} {{ year }}
          </h2>
          <div>
            <ButtonLink
              class="bg-red-600 text-white"
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
          Er zijn geen activiteiten gepland deze maand.
        </div>
        <div
          v-else-if="store.count === 1"
          class="text-center text-sm"
        >
          Er is 1 activiteit gepland deze maand.
        </div>
        <div
          v-else-if="store.count > 1"
          class="text-center text-sm"
        >
          Er zijn
          <span class="font-bold">
            {{ store.count }}
          </span>
          activiteiten gepland deze maand.
        </div>
      </div>
      <div class="container mx-auto bg-white p-4 divide-y divide-gray-300">
        <div
          v-for="(date, index) in days"
          :key="index"
          class="grid grid-cols-8 sm:grid-cols-12 grid-flow-row py-2 sm:p-4"
        >
          <div>
            <div class="text-center font-bold bg-red-600 text-white w-8 p-1 sm:w-10 sm:p-2">
              {{ date.day }}
            </div>
          </div>
          <div class="col-span-7 sm:col-span-11 px-2">
            <h1 class="text-xs sm:text-sm mb-3">
              {{ date.formatted }}
            </h1>
            <div
              v-if="date.events.length === 0"
              class="italic text-gray-400"
            >
              Geen activiteiten
            </div>
          </div>
          <div class="col-start-2 col-span-7 sm:col-start-2 sm:col-span-11">
            <div class="divide-y divide-gray-300 divide-dotted">
              <div
                v-for="event in date.events"
                :key="event.id"
                class="py-2 px-2"
              >
                <div class="flex flex-row flex-wrap sm:flex-nowrap">
                  <div class="sm:order-first flex-shrink-0 mr-2">
                    {{ event.start_date.format('HH:mm') }} - {{ event.end_date.format('HH:mm') }}
                  </div>
                  <div class="sm:order-last flex flex-wrap space-x-1 sm:ml-2">
                    <div>
                      <Badge class="bg-red-600 text-white font-bold text-xs">
                        #Training
                      </Badge>
                    </div>
                  </div>
                  <div class="font-bold">
                    {{ event.title }}
                  </div>
                </div>
                <div
                  v-if="event.summary"
                  class="text-xs sm:text-sm pt-2 pl-2 text-gray-600"
                >
                  <div v-html="event.summary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import Layout from '/@theme/layouts/LandingLayout.vue';
import dayjs from '/src/common/useDayJS.js';
import { computed } from 'vue';
import Badge from '/src/components/Badge.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import { useEventStore } from '/src/apps/portal/stores/eventStore.js';
import useYearMonth from '/src/composables/useYearMonth.js';

export default {
  components: {
    ButtonLink,
    Badge,
    Layout
  },
  setup() {
    const { year, month, monthName, previous, next, start, end } = useYearMonth();

    const store = useEventStore();
    store.load({ start, end });

    const days = computed(() => {
      const numberOfDays = start.value.daysInMonth();
      const days = [];
      for (let i = 1; i <= numberOfDays; i++) {
        const date = dayjs().date(i).month(month.value - 1).year(year.value);
        days.push({
          day: i,
          date: date.format('L'),
          formatted: date.format('dddd, D MMMM YYYY'),
          events: store.eventsOfDay(date)
        });
      }
      return days;
    });

    return {
      store,
      previous,
      next,
      monthName,
      days,
      year
    };
  }
};
</script>
