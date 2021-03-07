import { useHttp } from '/src/common/useHttp.js';

function toModel(json) {
  const map = d => {
    return {
      id: d.id,
      name: d.attributes.name,
      bio: d.attributes.bio,
      diploma: d.attributes.diploma
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

const load = () => {
  let api = useHttp.url('/coaches');
  return api.get().json((json) => toModel(json));
};


export const useCoachesService = () => {
  return {
    load
  }
}
