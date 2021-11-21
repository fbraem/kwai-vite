import { defineStore } from 'pinia';
import { watch } from 'vue';

import useState from '/src/composables/useState.js';
import { useHttpApi } from '/src/common/useHttp.js';

const toApplicationModel = (json) => {
  const mapModel = (d) => ({
    id: d.id,
    title: d.attributes.title,
    name: d.attributes.name,
    short_description: d.attributes.short_description
  });

  if (Array.isArray(json.data)) {
    return json.data.map(mapModel);
  }
  return mapModel(json.data);
};

export const useApplicationStore = defineStore('applications', {
  state: () => ({
    application: null,
    applications: []
  }),
  getters: {
    getByName: (state) => (name) => {
      return state.applications.find(application => application.name === name);
    },
    getById: (state) => (id) => {
      return state.applications.find(application => application.id === id);
    }
  },
  actions: {
    load() {
      const { data, loading, error } = useState(
        () => '/applications',
        () => useHttpApi
          .url('/portal/applications')
          .get()
          .json()
      );

      watch(
        data,
        json => {
          this.applications = toApplicationModel(json);
        }
      );

      return {
        loading,
        error
      };
    }
  }
});
