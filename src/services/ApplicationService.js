import { useHttp } from '/src/common/useHttp';

function toModel(json) {
  return json.data.map(d => ({
    title: d.attributes.title,
    name: d.attributes.name,
    short_description: d.attributes.short_description
  }));
}

const load = () =>
  useHttp
    .url('/portal/applications')
    .get()
    .json((json) => toModel(json));

export const useApplicationService = () => ({
  load
});
