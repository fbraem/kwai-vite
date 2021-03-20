import { useHttp } from '/src/common/useHttp.js';

function toModel(json) {
  const map = d => {
    return {
      id: d.id,
      title: d.attributes.contents[0].title,
      summary: d.attributes.contents[0].html_summary,
      content: d.attributes.contents[0].html_content
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

const load = ({
  offset = 0,
  limit = 0,
  application = 0
} = {}) => {
  let api = useHttp.url('/pages');
  if (offset > 0) {
    api = api.query({ 'page[offset]': offset });
  }
  if (limit) {
    api = api.query({ 'page[limit]': limit });
  }
  if (application) {
    api = api.query({ 'filter[application]': application });
  }

  return api
    .get()
    .json(json => toModel(json))
  ;
};

export const usePageService = () => ({
  load
});
