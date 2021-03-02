import { useHttp } from '/src/common/useHttp';

function toModel(json) {
  const map = d => ({
    title: d.attributes.title,
    name: d.attributes.name,
    short_description: d.attributes.short_description
  });
  if ( Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
}

const load = () =>
  useHttp
    .url('/portal/applications')
    .get()
    .json((json) => toModel(json));

const get = (id) => {
  let api = useHttp.url(`/application/${id}`);
  return api.get().json(json => toModel(json));
}

export const useApplicationService = () => ({
  load,
  get
});
