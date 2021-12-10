import { defineStore } from 'pinia';
import { useHttpApi, useHttpAuth } from '/src/common/useHttp.js';
import { watch } from 'vue';
import useState from '/src/composables/useState.js';

const toApplicationModel = json => {
  const map = d => {
    return {
      type: d.type,
      id: d.id,
      title: d.attributes.title,
      name: d.attributes.name,
      description: d.attributes.description,
      short_description: d.attributes.short_description,
      has_news: d.attributes.news,
      has_pages: d.attributes.pages,
      has_events: d.attributes.events,
      remark: d.attributes.remark
    };
  };
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useApplicationStore = defineStore('applications', {
  state: () => ({
    count: 0,
    application: null,
    applications: []
  }),
  getters: {
  },
  actions: {
    get(id) {
      const { data, loading, error, reload } = useState(
        `/applications/${id}`,
        () => useHttpApi
          .url(`/portal/applications/${id}`)
          .get()
          .json()
      );

      watch(
        data,
        json => {
          this.application = toApplicationModel(json);
        }
      );

      return {
        loading,
        error,
        reload
      };
    },
    load() {
      const { data, loading, error } = useState(
        '/applications',
        () => useHttpApi
          .url('/portal/applications')
          .get()
          .json()
      );

      watch(
        data,
        (json) => {
          this.count = json.meta.count;
          this.applications = toApplicationModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    save(application) {
      const payload = {
        data: {
          type: 'applications',
          attributes: {
            title: application.title,
            short_description: application.short_description,
            description: application.description
          }
        }
      };
      let api = useHttpApi.url('/portal/applications');
      if (application.id) {
        payload.data.id = application.id;
        api = api.url(`/${application.id}`);
      }
      api = api.json(payload);
      return (application.id ? api.patch() : api.post())
        .json()
        .then(json => { this.application = toApplicationModel(json); })
      ;
    }
  }
});
