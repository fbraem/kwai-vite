import { defineStore } from 'pinia';
import useState from '/src/composables/useState.js';
import { useHttpApi } from '/src/common/useHttp.js';
import { watch } from 'vue';

const toMemberModel = (json) => {
  const map = (d) => ({
    type: d.type,
    id: d.id,
    name: d.attributes.name
  });
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useMemberStore = defineStore('members', {
  state: () => ({
    count: 0,
    members: []
  }),
  actions: {
    load() {
      const { data, loading, error } = useState(
        '/club/members',
        () => useHttpApi
          .url('/club/members')
          .get()
          .json()
      );

      watch(
        data,
        json => {
          this.count = json.meta.count;
          this.members = toMemberModel(json);
        }
      );

      return {
        loading,
        error
      };
    }
  }
});
