import { defineStore } from 'pinia';
import useState from '/src/composables/useState.js';
import { useHttpApi } from '/src/common/useHttp.js';
import { useTrainingStore } from '/src/apps/coach/stores/trainingStore.js';
import { watch } from 'vue';

const toCoachModel = (json) => {
  const map = (d) => {
    const member = json.included.find(
      included => included.type === 'members' &&
        included.id === d.relationships.member.data.id
    );
    return {
      type: d.type,
      id: d.id,
      name: member.attributes.name,
      member,
      active: d.attributes.active,
      bio: d.attributes.bio,
      diploma: d.attributes.diploma,
      remark: d.attributes.remark,
      owner: d.attributes.owner
    };
  };
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useCoachStore = defineStore('coaches', {
  state: () => ({
    count: 0,
    coaches: [],
    coach: null
  }),
  getters: {
    trainingCount() {
      const trainingStore = useTrainingStore();
      return trainingStore.count;
    },
    trainings() {
      const trainingStore = useTrainingStore();
      return trainingStore.trainings;
    },
    containsInactiveCoaches: (state) => state.coaches.some((coach) => !coach.active)
  },
  actions: {
    /**
     * Load all coaches.
     *
     * Note: This action can only be executed from setup!
     */
    load() {
      const { data, loading, error } = useState(
        '/coaches',
        () => useHttpApi
          .url('/coaches')
          .get()
          .json()
      );

      watch(
        data,
        (json) => {
          this.count = json.meta.count;
          this.coaches = toCoachModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    /**
     * Get trainings of a coach for a specific period
     *
     * Note: This action can only be executed from setup!
     */
    loadTrainings(id, period) {
      const trainingStore = useTrainingStore();
      trainingStore.loadForCoach(id, period);
    },
    /**
     * Get a coach
     *
     * Note: This action can only be executed from setup!
     */
    get(id) {
      const { data, loading, error } = useState(
        `/coach/${id}`,
        () => useHttpApi
          .url(`/coaches/${id}`)
          .get()
          .json()
      );
      watch(
        data,
        json => {
          this.coach = toCoachModel(json);
        }
      );
      return {
        loading,
        error
      };
    },
    /**
     * Saves (updates or creates) the coach
     */
    save(coach) {
      const payload = {
        data: {
          type: 'coaches',
          attributes: {
            active: coach.active,
            diploma: coach.diploma,
            bio: coach.bio,
            remark: coach.remark
          }
        }
      };
      let api = useHttpApi.url('/coaches');
      if (coach.id) {
        payload.data.id = coach.id;
        api = api.url(`/${coach.id}`);
      }
      api = api.json(payload);
      return (coach.id ? api.patch() : api.post())
        .json()
        .then(json => { this.coach = toCoachModel(json); })
      ;
    }
  }
});
