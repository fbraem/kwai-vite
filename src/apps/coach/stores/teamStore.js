import { defineStore } from 'pinia';
import { useHttpApi } from '/src/common/useHttp.js';
import { watch } from 'vue';
import useState from '/src/composables/useState.js';

const toTeamModel = json => {
  const map = d => ({
    type: d.type,
    id: d.id,
    name: d.attributes.name
  });
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useTeamStore = defineStore('teams', {
  state: () => ({
    count: 0,
    teams: []
  }),
  getters: {
    asOptions: (state) => state.teams.map(
      team => ({
        value: team.id,
        text: team.name
      })
    ),
    find: (state) => (id) => state.teams.find(c => c.id === id)
  },
  actions: {
    load() {
      const { data, loading, error, reload } = useState(
        '/teams',
        () => useHttpApi
          .url('/club/teams')
          .get()
          .json()
      );

      watch(
        data,
        json => {
          this.count = json.meta.count;
          this.teams = toTeamModel(json);
        }
      );

      return {
        loading,
        error,
        reload
      };
    }
  }
});
