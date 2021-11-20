import dayjs from '/src/common/useDayJS.js';
import { defineStore } from 'pinia';
import { useHttpApi } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';
import { computed, ref, watch } from 'vue';

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
      active: d.attributes.event.active,
      teams: teams.map((team) => ({
        id: team.id,
        name: team.attributes.name
      })),
      coaches: d.attributes.coaches.map(trainingCoach => ({
        id: trainingCoach.id,
        name: coaches.find(coach => coach.id === trainingCoach.id).attributes.name,
        head: trainingCoach.head,
        payed: trainingCoach.payed,
        present: trainingCoach.present
      }))
    };

    if (d.relationships?.definition) {
      training.moment = { id: d.relationships.definition.data.id };
    }

    return training;
  };
  if (Array.isArray(json.data)) {
    return json.data.map(mapModel);
  }
  return mapModel(json.data);
};

export const useTrainingStore = defineStore('trainings', {
  state: () => ({
    count: 0,
    training: null,
    trainings: []
  }),
  actions: {
    /**
     * Load the training with the given id.
     */
    get(id) {
      const { data, loading, error } = useState(
        () => `/trainings/${id}`,
        () => useHttpApi
          .url(`/trainings/${id}`)
          .get()
          .json()
      );

      watch(
        data,
        json => {
          this.training = toTrainingModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    /**
     * Load all trainings of a coach for the given period
     *
     * Note: This action can only be executed from setup!
     */
    loadForCoach(id, {
      start = ref(dayjs().startOf('month')),
      end = ref(dayjs().endOf('month'))
    }) {
      const formattedStart = computed(() => start.value.format('YYYY-MM-DD'));
      const formattedEnd = computed(() => end.value.format('YYYY-MM-DD'));
      const { data, loading, error } = useState(
        () => `/coaches/${id}/trainings/${formattedStart.value}/${formattedEnd.value}`,
        () => useHttpApi
          .url('/trainings')
          .query({ 'filter[coach]': id })
          .query({ 'filter[start]': formattedStart.value })
          .query({ 'filter[end]': formattedEnd.value })
          .get()
          .json()
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
    },
    /**
     * Load all trainings of a given moment.
     *
     * Note: this action can only be executed from setup!
     */
    loadForMoment(id, {
      start = ref(dayjs().startOf('month')),
      end = ref(dayjs().endOf('month'))
    }) {
      const formattedStart = computed(() => start.value.format('YYYY-MM-DD'));
      const formattedEnd = computed(() => end.value.format('YYYY-MM-DD'));
      const { data, loading, error } = useState(
        () => `/moments/${id}/trainings/${formattedStart.value}/${formattedEnd.value}`,
        () => useHttpApi
          .url('/trainings')
          .query({ 'filter[definition]': id })
          .query({ 'filter[start]': formattedStart.value })
          .query({ 'filter[end]': formattedEnd.value })
          .get()
          .json()
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
    },
    async load(active = ref(true), {
      start = ref(dayjs().startOf('month')),
      end = ref(dayjs().endOf('month'))
    }) {
      const formattedStart = computed(() => start.value.format('YYYY-MM-DD'));
      const formattedEnd = computed(() => end.value.format('YYYY-MM-DD'));

      const { data, loading, error } = useState(
        () => `/trainings/${formattedStart.value}/${formattedEnd.value}/${active.value}`,
        () => {
          let api = useHttpApi
            .url('/trainings')
            .query({ 'filter[start]': formattedStart.value })
            .query({ 'filter[end]': formattedEnd.value })
          ;
          if (!active.value) {
            api = api.query({ 'filter[active]': false });
          }
          return api
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
    },
    async save(training) {
      const payload = {
        data: {
          type: 'trainings',
          attributes: {
            contents: [{
              title: training.title,
              summary: training.summary
            }],
            event: {
              location: training.location,
              start_date: training.start_date.utc().format('YYYY-MM-DD HH:mm:ss'),
              end_date: training.end_date.utc().format('YYYY-MM-DD HH:mm:ss'),
              timezone: dayjs.tz.guess(),
              cancelled: training.cancelled ?? false,
              active: training.active ?? false
            }
          },
          relationships: {
          }
        }
      };
      if (training.moment) {
        payload.data.relationships.definition = {
          data: {
            type: 'definitions',
            id: training.moment.id
          }
        };
      }
      if (training.teams) {
        payload.data.relationships.teams = {
          data: training.teams.map(team => ({ type: 'teams', id: team.id }))
        };
      }
      if (training.coaches) {
        payload.data.relationships.coaches = {
          data: training.coaches.map(coach => ({ type: 'coaches', id: coach.id }))
        };
        payload.data.coaches = training.coaches;
      } else {
        payload.data.coaches = [];
      }

      let api = useHttpApi.url('/trainings');
      if (training.id) {
        payload.data.id = training.id;
        api = api.url(`/${training.id}`);
      }
      api = api.json(payload);

      let savedTraining = training;
      await (training.id ? api.patch() : api.post())
        .json()
        .then(json => {
          this.training = toTrainingModel(json);
          savedTraining = this.training;
        })
        .catch(e => console.log(e))
      ;

      return savedTraining;
    }
  }
});
