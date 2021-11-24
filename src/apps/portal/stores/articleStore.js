import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useHttp } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';

function toArticleModel(json) {
  const map = d => {
    return {
      id: d.id,
      title: d.attributes.contents[0].title,
      summary: d.attributes.contents[0].html_summary,
      content: d.attributes.contents[0].html_content
    };
  };

  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
}

export const useArticleStore = defineStore('articles', {
  state: () => ({
    count: 0,
    article: null,
    articles: []
  }),
  getters: {
    getById: (state) => (id) => state.articles.find(article => article.id === id)
  },
  actions: {
    get(id) {
      const { data, loading, error } = useState(
        () => `/articles/${id}`,
        () => useHttp.url('/pages/').get().json()
      );

      watch(
        data,
        json => {
          this.article = toArticleModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    load({
      offset = ref(0),
      limit = ref(0),
      application = ref(0)
    } = {}) {
      const { data, loading, error } = useState(
        () => `/articles/${offset.value}/${limit.value}/${application.value}`,
        () => {
          let api = useHttp.url('/pages');
          if (offset.value > 0) {
            api = api.query({ 'page[offset]': offset.value });
          }
          if (limit.value) {
            api = api.query({ 'page[limit]': limit.value });
          }
          if (application.value) {
            api = api.query({ 'filter[application]': application.value });
          }

          return api
            .get()
            .json()
          ;
        }
      );

      watch(
        data,
        json => {
          this.count = json.meta.count;
          this.articles = toArticleModel(json);
        }
      );

      return {
        loading,
        error
      };
    }
  }
});
