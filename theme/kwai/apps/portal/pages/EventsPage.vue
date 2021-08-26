<template>
  <Layout image="">
    <template #title>
      Activiteiten
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
          class="grid grid-cols-8 grid-flow-row p-2 sm:p-4"
        >
          <div>
            <div class="text-center font-bold bg-red-600 text-white w-8 p-1 sm:w-10 sm:p-2">
              {{ date.day }}
            </div>
          </div>
          <div class="col-span-7 px-2">
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
          <div class="col-span-8">
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
                  class="text-xs sm:text-sm"
                >
                  {{ event.summary }}
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
import useEvents from '/src/apps/portal/composables/useEvents.js';
import dayjs from 'dayjs';
import { computed } from 'vue';
import Badge from '/src/components/Badge.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    ButtonLink,
    Badge,
    Layout
  },
  setup() {
    const route = useRoute();
    if (!route.query.year) {
      route.query.year = dayjs().year().toString();
    }
    if (!route.query.month) {
      route.query.month = (dayjs().month() + 1).toString();
    }

    const year = computed(() => {
      const queryYear = parseInt(route.query.year, 10);
      if (isNaN(queryYear)) {
        return dayjs().year();
      }
      return queryYear;
    });

    const month = computed(() => {
      const queryMonth = parseInt(route.query.month, 10);
      if (isNaN(queryMonth)) {
        return dayjs().month() + 1;
      }
      return queryMonth;
    });

    const previous = computed(() => {
      const query = {
        ...route.query
      };
      if (month.value === 1) {
        query.month = '12';
        query.year = (year.value - 1).toString();
      } else {
        query.month = (month.value - 1).toString();
      }
      return { query };
    });

    const next = computed(() => {
      const query = {
        ...route.query
      };
      if (month.value === 12) {
        query.month = '1';
        query.year = (year.value + 1).toString();
      } else {
        query.month = (month.value + 1).toString();
      }
      return { query };
    });

    const start = computed(() =>
      dayjs().year(year.value).month(month.value - 1).startOf('month')
    );
    const end = computed(() =>
      dayjs().year(year.value).month(month.value - 1).endOf('month')
    );

    const { store, load } = useEvents();
    load({ start, end });

    const monthName = computed(() => dayjs.months()[month.value - 1]);

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
