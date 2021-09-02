import { defineStore } from 'pinia';
import useState from '/src/composables/useState.js';
import { useHttpApi } from '/src/common/useHttp.js';

const toCoachModel = (data) => {
  return {
    type: data.type,
    id: data.id,
    active: data.attributes.active,
    bio: data.attributes.bio,
    diploma: data.attributes.diploma,
    name: data.attributes.name,
    remark: data.attributes.remark,
    owner: data.attributes.owner
  };
};

const useStore = defineStore('coaches', {
  state: () => ({
    count: 0,
    coaches: [],
    coach: null
  }),
  actions: {
    setCoaches(json) {
      this.count = json.meta.count;
      this.coaches = json.data.map(data => toCoachModel(data));
    },
    setCoach(json) {
      this.coach = toCoachModel(json.data);
    }
  }
});

const load = (store) => () => {
  const { loading, error } = useState(
    '/coaches',
    () => useHttpApi
      .url('/coaches')
      .get()
      .json()
      .then(json => {
        store.setCoaches(json);
        return json;
      })
  );

  return {
    loading,
    error
  };
};

const get = (store) => (id) => {
  const { loading, error } = useState(
    `/coach/${id}`,
    () => useHttpApi
      .url(`/coaches/${id}`)
      .get()
      .json()
      .then(json => {
        store.setCoach(json);
        return json;
      })
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
    load: load(store),
    get: get(store)
  };
}
