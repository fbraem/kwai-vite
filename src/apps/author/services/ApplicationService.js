import { useHttp, useHttpApi } from '/src/common/useHttp.js';

function toModel(json) {
  const map = d => ({
    id: d.id,
    title: d.attributes.title,
    name: d.attributes.name,
    description: d.attributes.description,
    short_description: d.attributes.short_description,
    has_news: d.attributes.news,
    has_pages: d.attributes.pages,
    has_events: d.attributes.events,
    remark: d.attributes.remark,
    created_at: '',
    updated_at: ''
  });
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
}

const load = () =>
  useHttp
    .url('/portal/applications')
    .get()
    .json((json) => toModel(json))
;

const get = (id) =>
  useHttp
    .url(`/portal/applications/${id}`)
    .get()
    .json((json) => toModel(json))
;

const save = async(id, { title, shortDescription, description }) => {
  if (id) {
    id = id.toString();
  }
  const data = {
    type: 'applications',
    id,
    attributes: {
      title,
      short_description: shortDescription,
      description
    }
  };
  await useHttpApi
    .url(`/portal/applications/${id}`)
    .json({ data })
    .patch()
    .json()
  ;
};

export const useApplicationService = () => ({
  load,
  get,
  save
});
