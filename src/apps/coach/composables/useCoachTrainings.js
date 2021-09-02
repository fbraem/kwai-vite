import dayjs from '/src/common/useDayJS.js';
import { defineStore } from 'pinia';
import { useHttpApi } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';
import { computed, ref } from 'vue';

const toTrainingModel = (json) => {
  const mapModel = (d) => {
    let teams = [];
    if (d.relationships?.teams) {
      teams = d.relationships.teams.data.map(
        ({ id }) => json.included.find(
          included => included.type === 'teams' && included.id === id
        )
      );
    }
    let coaches = [];
    if (d.relationships?.coaches) {
      coaches = d.relationships.coaches.data.map(
        ({ id }) => json.included.find(
          included => included.type === 'coaches' && included.id === id
        )
      );
    }
    return {
      type: d.type,
      id: d.id,
      name: d.name,
      title: d.attributes.contents[0].title,
      summary: d.attributes.contents[0].html_summary,
      location: d.attributes.event.location,
      start_date: dayjs.tz(d.attributes.event.start_date, 'YYYY-MM-DD HH:mm:ss', d.attributes.event.time_zone),
      end_date: dayjs.tz(d.attributes.event.end_date, 'YYYY-MM-DD HH:mm:ss', d.attributes.event.time_zone),
      cancelled: d.attributes.event.cancelled,
      teams: teams.map((team) => ({
        id: team.id,
        name: team.attributes.name
      })),
      coaches: coaches.map(coach => ({
        id: coach.id,
        name: coach.attributes.name
      }))
    };
  };
  return json.data.map(mapModel);
};

const useStore = defineStore('coach.trainings', {
  state: () => ({
    count: 0,
    trainings: []
  }),
  actions: {
    setTrainings(json) {
      this.count = json.meta.count;
      this.trainings = toTrainingModel(json);
    }
  }
});

const load = (store) => (id, { start, end }) => {
  const formattedStart = computed(() => start.value.format('YYYY-MM-DD'));
  end ??= ref(dayjs().endOf('month'));
  const formattedEnd = computed(() => end.value.format('YYYY-MM-DD'));
  const { loading, error } = useState(
    () => `/coaches/${id}/trainings/${formattedStart.value}/${formattedEnd.value}`,
    () => useHttpApi
      .url('/trainings')
      .query({ 'filter[coach]': id })
      .query({ 'filter[start]': formattedStart.value })
      .query({ 'filter[end]': formattedEnd.value })
      .get()
      .json(json => store.setTrainings(json))
  );
  return {
    loading,
    error
  };
};

export default function useCoachTrainings() {
  const store = useStore();

  return {
    store,
    load: load(store)
  };
};
