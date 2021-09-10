import { defineStore } from 'pinia';
import useState from '/src/composables/useState.js';
import { watch } from 'vue';
import { useHttpApi } from '/src/common/useHttp.js';
import { useTrainingStore } from '/src/apps/coach/stores/trainingStore.js';

const toMomentsModel = (json) => {
  const map = (d) => ({
    type: d.type,
    id: d.id,
    name: d.attributes.name,
    active: d.attributes.active,
    description: d.attributes.description,
    weekday: d.attributes.weekday,
    start_time: d.attributes.start_time,
    end_time: d.attributes.end_time
  });
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useTrainingMomentStore = defineStore('training_moments', {
  state: () => ({
    count: 0,
    moments: [],
    moment: null
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
    }
  }
});
