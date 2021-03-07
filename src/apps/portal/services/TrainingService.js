import { useHttp } from '/src/common/useHttp.js';
import { formatDate } from '/src/common/useDayJS.js';

const toModel = (json) => {
  const map = (d) => {
    return {
      id: d.id
    };
  }

  if (Array.isArray(json.data)) {
    return {
      items: json.data.map(map),
      meta: json.meta
    };
  }

  return map(json.data);
}

const load = ({ start, end } = {}) => {
  let api = useHttp.url('/trainings');
  if (start) {
    api = api
      .query({ 'filter[start]': formatDate(start, 'YYYY-MM-DD') })
      .query({ 'filter[end]': formatDate(end, 'YYYY-MM-DD') })
    ;
  }
  return api
    .get()
    .json((json) => toModel(json))
  ;
};

export const useTrainingService = () => ({
  load
});
