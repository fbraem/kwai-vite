import { defineStore } from 'pinia';
import { useHttpApi } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';
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
      diploma: d.attributes.diploma,
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
    coaches: []
  }),
  actions: {
    load() {
      const { data, loading, error } = useState(
        '/coaches',
        () => useHttpApi
          .url('/coaches')
          .query({ 'filter[active]': true })
          .get()
          .json()
      );

      watch(
        data,
        json => {
          this.count = json.meta.count;
          this.coaches = toCoachModel(json);
        }
      );

      return {
        loading,
        error
      };
    }
  }
});
