import { defineStore } from 'pinia';
import useState from '/src/composables/useState.js';
import { useHttpApi } from '/src/common/useHttp.js';
import { useTrainingStore } from '/src/apps/coach/stores/trainingStore.js';
import { watch } from 'vue';

const toCoachModel = (json) => {
  const map = (d) => {
    const member = json.included?.find(
      included => included.type === 'members' &&
        included.id === d.relationships.member.data.id
    );
    return {
      type: d.type,
      id: d.id,
      name: member?.attributes.name,
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
    coach: null,
    showInactive: false
  }),
  getters: {
    /**
     * Returns true when for the given member a coach can be found in the list.
     */
    containsMember: (state) => (memberId) => {
      return state.coaches.findIndex(c => c.member.id === memberId) !== -1;
    },
    /**
     * Returns the number of retrieved trainings of a given period for the
     * current coach.
     * @see loadTrainings
     */
    trainingCount() {
      const trainingStore = useTrainingStore();
      return trainingStore.count;
    },
    /**
     * Returns the trainings of a given period for the current coach
     * @see loadTrainings
     */
    trainings() {
      const trainingStore = useTrainingStore();
      return trainingStore.trainings;
    },
    /**
     * Returns true when there is at least one inactive coach in the list
     */
    containsInactiveCoaches: (state) => state.coaches.some((coach) => !coach.active),
    /**
     * Returns all active coaches
     */
    activeCoaches: (state) => state.coaches.filter(coach => coach.active),
    /**
     * Search a coach with the given id in the list of coaches.
     */
    find: (state) => (id) => state.coaches.find(c => c.id === id)
  },
  actions: {

    /**
     * Load all coaches.
     *
     * Note: This action can only be executed from setup!
     */
    load() {
      const { data, loading, error, reload } = useState(
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
        error,
        reload
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
      const { data, loading, error, reload } = useState(
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
        error,
        reload
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
          },
          relationships: {
            member: {
              data: {
                type: 'members',
                id: coach.member.id
              }
            }
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
