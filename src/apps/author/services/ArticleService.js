import { useHttp, useHttpAuth } from '/src/common/useHttp.js';

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
  return useHttpAuth
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
  let api = useHttpAuth
    .url('/pages')
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

export const useArticleService = () => ({
  get,
  load
});
