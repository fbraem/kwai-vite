import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import dayjs from '/src/common/useDayJS.js';
import useState from '/src/composables/useState.js';
import { useHttp } from '/src/common/useHttp.js';

const toEventModel = json => {
  const mapModel = d => ({
    id: d.id,
    type: d.type,
    title: d.attributes.contents[0].title,
    summary: d.attributes.contents[0].html_summary,
    location: d.attributes.event.location,
    start_date: dayjs.utc(d.attributes.event.start_date, 'YYYY-MM-DD HH:mm:ss').tz(d.attributes.event.timezone),
    end_date: dayjs.utc(d.attributes.event.end_date, 'YYYY-MM-DD HH:mm:ss').tz(d.attributes.event.timezone),
    time_zone: d.attributes.event.time_zone,
    cancelled: d.attributes.event.cancelled
  });

  if (Array.isArray(json.data)) {
    return json.data.map(mapModel);
  }
  return mapModel(json.data);
};

export const useEventStore = defineStore('events', {
  state: () => ({
    count: 0,
    events: []
  }),
  getters: {
    /**
     * Get all events of the day.
     */
    eventsOfDay: (state) => date =>
      state.events.filter(event => event.start_date.isSame(date, 'day'))
  },
  actions: {
    load({
      start = ref(dayjs().startOf('month')),
      end = ref(dayjs().endOf('month'))
    }) {
      const formattedStartDate = computed(() => start.value.format('YYYY-MM-DD'));
      const formattedEndDate = computed(() => end.value.format('YYYY-MM-DD'));

      const { data, loading, error } = useState(
        () => `/events/${formattedStartDate.value}/${formattedEndDate.value}`,
        () =>
          useHttp
            .url('/trainings')
            .query({ 'filter[start]': formattedStartDate.value })
            .query({ 'filter[end]': formattedEndDate.value })
            .get()
            .json()
      );

      watch(
        data,
        json => {
          this.count = json.meta.count;
          this.events = toEventModel(json);
        }
      );

      return {
        loading,
        error
      };
    }
  }
});
