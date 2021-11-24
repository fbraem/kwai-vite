import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import dayjs from '/src/common/useDayJS.js';
import { useHttpApi } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';

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
    const training = {
      type: d.type,
      id: d.id,
      name: d.name,
      title: d.attributes.contents[0].title,
      html_summary: d.attributes.contents[0].html_summary,
      summary: d.attributes.contents[0].summary,
      location: d.attributes.event.location,
      start_date: dayjs.utc(d.attributes.event.start_date, 'YYYY-MM-DD HH:mm:ss').tz(d.attributes.event.timezone),
      end_date: dayjs.utc(d.attributes.event.end_date, 'YYYY-MM-DD HH:mm:ss').tz(d.attributes.event.timezone),
      cancelled: d.attributes.event.cancelled,
      teams: teams.map((team) => ({
        id: team.id,
        name: team.attributes.name
      })),
      coaches: d.attributes.coaches.map(trainingCoach => ({
        id: trainingCoach.id,
        name: coaches.find(coach => coach.id === trainingCoach.id).attributes.name
      }))
    };

    return training;
  };
  if (Array.isArray(json.data)) {
    return json.data.map(mapModel);
  }
  return mapModel(json.data);
};

export const usetrainingStore = defineStore('trainings', {
  state: () => ({
    count: 0,
    trainings: []
  }),
  actions: {
    async load({
      start = ref(dayjs().startOf('month')),
      end = ref(dayjs().endOf('month'))
    }) {
      const formattedStart = computed(() => start.value.format('YYYY-MM-DD'));
      const formattedEnd = computed(() => end.value.format('YYYY-MM-DD'));

      const { data, loading, error } = useState(
        () => `/trainings/${formattedStart.value}/${formattedEnd.value}`,
        () => {
          return useHttpApi
            .url('/trainings')
            .query({ 'filter[start]': formattedStart.value })
            .query({ 'filter[end]': formattedEnd.value })
            .get()
            .json()
          ;
        }
      );

      watch(
        data,
        (json) => {
          this.count = json.meta.count;
          this.trainings = toTrainingModel(json);
        }
      );

      return {
        loading,
        error
      };
    }
  }
});
