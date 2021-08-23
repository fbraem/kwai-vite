<template>
  <Layout image="">
    <template #title>
      Activiteiten
    </template>
    <section class="bg-gray-200 py-8 px-12">
      <Header class="flex flex-row py-4 justify-center space-x-6">
        <div>
          <ButtonLink
            class="bg-red-600 text-white"
            :route="{ name: 'portal.events', params: { ...previous } }"
          >
            <i class="fa fa-angle-left mr-2" />Vorige maand
          </ButtonLink>
        </div>
        <div class="uppercase">
          {{ monthName }} {{ year }}
        </div>
        <div>
          <ButtonLink
            class="bg-red-600 text-white"
            :route="{ name: 'portal.events', params: { ...next } }"
          >
            Volgende maand<i class="fa fa-angle-right ml-2" />
          </ButtonLink>
        </div>
      </Header>
      <div class="container mx-auto bg-white p-4 divide-y divide-gray-300">
        <div
          v-for="(date, index) in days"
          :key="index"
          class="flex items-center p-4"
        >
          <div class="flex justify-center w-20">
            <div class="w-1/2 text-center font-bold bg-red-600 text-white p-2">
              {{ date.day }}
            </div>
          </div>
          <div class="px-2">
            <h1 class="text-sm mb-3">
              {{ date.formatted }}
            </h1>
            <div
              v-if="date.events.length === 0"
              class="italic text-gray-400"
            >
              Geen activiteiten
            </div>
            <div class="divide-y divide-gray-300">
              <div
                v-for="event in date.events"
                :key="event.id"
                class="py-2"
              >
                <div class="flex flex-row space-x-2">
                  <div>
                    {{ event.start_date.format('HH:mm') }} - {{ event.end_date.format('HH:mm') }}
                  </div>
                  <div class="font-bold">
                    {{ event.title }}
                  </div>
                </div>
                <div
                  v-if="event.summary"
                  class="text-xs"
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
import Header from '/@theme/components/Header.vue';
import useEvents from '/src/apps/portal/composables/useEvents.js';
import dayjs from 'dayjs';
import { computed } from 'vue';
import Badge from '/src/components/Badge.vue';
import ButtonLink from '/src/components/ButtonLink.vue';

export default {
  components: {
    ButtonLink,
    Badge,
    Layout,
    Header
  },
  props: {
    year: {
      type: Number,
      default: () => dayjs().year()
    },
    month: {
      type: Number,
      default: () => dayjs().month() + 1
    }
  },
  setup(props) {
    const previous = computed(() => {
      if (props.month === 1) {
        return {
          month: 12,
          year: props.year - 1
        };
      }
      return {
        month: props.month - 1,
        year: props.year
      };
    });

    const next = computed(() => {
      if (props.month === 12) {
        return {
          month: 1,
          year: props.year + 1
        };
      }
      return {
        month: props.month + 1,
        year: props.year
      };
    });

    const start = computed(() =>
      dayjs().year(props.year).month(props.month - 1).startOf('month')
    );
    const end = computed(() =>
      dayjs().year(props.year).month(props.month - 1).endOf('month')
    );

    const { store, load } = useEvents();
    load({ start, end });

    const monthName = computed(() => dayjs.months()[props.month - 1]);

    const days = computed(() => {
      const numberOfDays = start.value.daysInMonth();
      const days = [];
      for (let i = 1; i <= numberOfDays; i++) {
        const date = dayjs().date(i).month(props.month - 1).year(props.year);
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
      days
    };
  }
};
</script>
