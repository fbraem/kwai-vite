import { useHttpApi } from '/src/common/useHttp.js';

function toModel(json) {
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
    return {
      items: json.data.map(map),
      meta: json.meta
    };
  }
  return map(json.data);
}

const get = id => {
  return useHttpApi
    .url(`/pages/${id}`)
    .get()
    .json((json) => toModel(json))
  ;
};

const load = ({
  offset = 0,
  limit = 10,
  application = 0
} = {}) => {
  let api = useHttpApi
    .url('/pages')
    .query({ 'filter[enabled]': false })
  ;

  if (offset > 0) {
    api = api.query({ 'page[offset]': offset });
  }
  if (limit) {
    api = api.query({ 'page[limit]': limit });
  }
  if (application) {
    api = api.query({ 'filter[application]': application });
  }

  return api.get().json(json => toModel(json));
};

const save = article => {
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
    .json(json => toModel(json))
  ;
};

export const useArticleService = () => ({
  get,
  load,
  save
});
