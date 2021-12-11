import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useHttpApi } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';

function toArticleModel(json) {
  const map = d => {
    const application = json.included.find(
      included => included.type === 'applications' &&
        included.id === d.relationships.application.data.id
    );
    return {
      id: d.id,
      title: d.attributes.contents[0].title,
      summary: d.attributes.contents[0].summary,
      content: d.attributes.contents[0].content,
      application: {
        id: application.id,
        name: application.attributes.name,
        title: application.attributes.title
      },
      enabled: d.attributes.enabled
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
  actions: {
    get(id) {
      const { data, loading, error } = useState(
        () => `/author/articles/${id}`,
        () =>
          useHttpApi
            .url('/pages/')
            .url(id)
            .get()
            .json()
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
      limit = ref(10),
      application = ref(0)
    } = {}) {
      const { data, loading, error } = useState(
        () => `author/articles/${application.value}/${offset.value}/${limit.value}`,
        () => {
          let api = useHttpApi
            .url('/pages')
            .query({ 'filter[enabled]': false })
          ;
          if (offset.value > 0) {
            api = api.query({ 'page[offset]': offset.value });
          }
          if (limit.value > 0) {
            api = api.query({ 'page[limit]': limit.value });
          }
          if (application.value > 0) {
            api = api.query({ 'filter[application]': application.value });
          }

          return api.get().json();
        }
      );

      watch(
        data,
        json => {
          this.count = json.meta.count;
          this.articles = toArticleModel(json);
        }
      );

      return { loading, error };
    },
    save(article) {
      const payload = {
        data: {
          type: 'pages',
          attributes: {
            enabled: article.enabled,
            remark: article.remark,
            contents: [
              {
                locale: 'nl',
                format: 'md',
                title: article.title,
                summary: article.summary,
                content: article.content
              }
            ]
          },
          relationships: {
            application: {
              data: {
                type: 'applications',
                id: article.application.id
              }
            }
          }
        }
      };

      let api = useHttpApi.url('/pages');
      if (article.id) {
        payload.data.id = article.id;
        api = api.url(`/${article.id}`);
      }
      api = api.json(payload);

      return (article.id ? api.patch() : api.post())
        .json()
        .then(json => {
          this.article = toArticleModel(json);
        })
      ;
    }
  }
});
