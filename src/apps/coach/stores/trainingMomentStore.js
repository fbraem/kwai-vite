import { defineStore } from 'pinia';
import useState from '/src/composables/useState.js';
import { watch } from 'vue';
import { useHttpApi } from '/src/common/useHttp.js';
import { useTrainingStore } from '/src/apps/coach/stores/trainingStore.js';

const toMomentsModel = (json) => {
  const map = d => {
    let team = null;
    if (d.relationships?.team) {
      team = json.included.find(
        included => included.type === 'teams' && included.id === d.relationships.team.data.id
      );
    }
    return {
      type: d.type,
      id: d.id,
      name: d.attributes.name,
      active: d.attributes.active,
      description: d.attributes.description,
      weekday: d.attributes.weekday,
      start_time: d.attributes.start_time,
      end_time: d.attributes.end_time,
      time_zone: d.attributes.time_zone,
      location: d.attributes.location,
      remark: d.attributes.remark,
      team
    };
  };
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useTrainingMomentStore = defineStore('training_moments', {
  state: () => ({
    count: 0,
    moments: [],
    moment: null,
    showInactive: false
  }),
  getters: {
    trainings() {
      const trainingStore = useTrainingStore();
      return trainingStore.trainings;
    },
    trainingCount() {
      const trainingStore = useTrainingStore();
      return trainingStore.count;
    },
    containsInactiveMoments: (state) => state.moments.some(m => m.active)
  },
  actions: {
    /**
     * Load all moments.
     *
     * Note: This action can only be executed from setup!
     */
    load() {
      const { data, loading, error } = useState(
        '/training_moments',
        () => useHttpApi
          .url('/trainings/definitions')
          .get()
          .json()
      );

      watch(
        data,
        (json) => {
          this.count = json.meta.count;
          this.moments = toMomentsModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    /**
     * Load the moment with the given id.
     *
     * Note: This action can only be executed from setup!
     */
    get(id) {
      const { data, loading, error } = useState(
        () => `/training_moments/${id}`,
        () => useHttpApi
          .url(`/trainings/definitions/${id}`)
          .get()
          .json()
      );

      watch(
        data,
        (json) => {
          this.moment = toMomentsModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    /**
     * Load trainings for the moment with the given id
     *
     * Note: This action can only be executed from setup!
     */
    loadTrainings(id, period) {
      const trainingStore = useTrainingStore();
      trainingStore.loadForMoment(id, period);
    },
    save(moment) {
      const payload = {
        data: {
          type: 'definitions',
          attributes: {
            name: moment.name,
            description: moment.description,
            weekday: moment.weekday,
            start_time: moment.start_time,
            end_time: moment.end_time,
            time_zone: moment.time_zone,
            location: moment.location,
            remark: moment.remark,
            active: moment.active
          }
        }
      };
      if (moment.team) {
        payload.data.relationships = {
          team: {
            data: {
              type: 'teams',
              id: moment.team.id
            }
          }
        };
      }
      let api = useHttpApi.url('/trainings/definitions');
      if (moment.id) {
        payload.data.id = moment.id;
        api = api.url(`/${moment.id}`);
      }
      api = api.json(payload);
      return (moment.id ? api.patch() : api.post())
        .json()
        .then(json => { this.moment = toMomentsModel(json); })
      ;
    }
  }
});
