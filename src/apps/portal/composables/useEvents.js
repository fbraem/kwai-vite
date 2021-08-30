import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { useHttp } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';
import { computed, ref } from 'vue';

const useStore = defineStore('events', {
  state: () => ({
    count: 0,
    data: []
  }),
  getters: {
    // Get all events of the day
    // For now, we assume that all events don't last longer than 1 day
    eventsOfDay: (state) => date =>
      state.data.filter(event => event.start_date.isSame(date, 'day'))
  },
  actions: {
    setData(json) {
      this.count = json.meta.count;
      const map = (d) => {
        let teams = [];
        if (d.relationships?.teams) {
          teams = d.relationships.teams.data.map(
            ({ id }) => json.included.find(
              included => included.type === 'teams' && included.id === id
            )
          );
        }
        return {
          id: d.id,
          type: d.type,
          title: d.attributes.contents[0].title,
          summary: d.attributes.contents[0].summary,
          location: d.attributes.event.location,
          start_date: dayjs.tz(d.attributes.event.start_date, 'YYYY-MM-DD HH:mm:ss', d.attributes.event.time_zone),
          end_date: dayjs.tz(d.attributes.event.end_date, 'YYYY-MM-DD HH:mm:ss', d.attributes.event.time_zone),
          time_zone: d.attributes.event.time_zone,
          cancelled: d.attributes.event.cancelled,
          teams: teams.map((team) => ({
            id: team.id,
            name: team.attributes.name
          }))
        };
      };

      this.data = json.data.map(map);
    }
  }
});

const load = (store) => ({ start, end } = {}) => {
  start ??= ref(dayjs().startOf('month'));
  const formattedStart = computed(() => start.value.format('YYYY-MM-DD'));
  end ??= ref(dayjs().endOf('month'));
  const formattedEnd = computed(() => end.value.format('YYYY-MM-DD'));

  const { loading, error } = useState(
    () => `/events/${formattedStart.value}/${formattedEnd.value}`,
    () =>
      useHttp
        .url('/trainings')
        .query({ 'filter[start]': formattedStart.value })
        .query({ 'filter[end]': formattedEnd.value })
        .get()
        .json()
        .then((json) => store.setData(json))
  );

  return {
    loading,
    error
  };
};

export default function useEvents() {
  const store = useStore();
  return {
    store,
    load: load(store)
  };
}
