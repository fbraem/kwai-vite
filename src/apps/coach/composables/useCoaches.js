import { defineStore } from 'pinia';
import useState from '/src/composables/useState.js';
import { useHttpApi } from '/src/common/useHttp.js';

const useStore = defineStore('coaches', {
  state: () => ({
    count: 0,
    coaches: []
  }),
  actions: {
    setCoaches(json) {
      this.count = json.meta.count;
      const map = (d) => {
        return {
          type: d.type,
          id: d.id,
          active: d.attributes.active,
          bio: d.attributes.bio,
          diploma: d.attributes.diploma,
          name: d.attributes.name,
          remark: d.attributes.remark,
          owner: d.attributes.owner
        };
      };
      this.coaches = json.data.map(map);
    }
  }
});

const load = (store) => () => {
  const { loading, error } = useState(
    '/coaches',
    () => useHttpApi
      .url('/coaches')
      .get()
      .json(json => store.setCoaches(json))
  );

  return {
    loading,
    error
  };
};

export default function useCoaches() {
  const store = useStore();
  return {
    store,
    load: load(store)
  };
}
