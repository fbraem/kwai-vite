import { useHttp } from '/src/common/useHttp.js';
import { dateToTimezone, formatDate } from '/src/common/useDayJS.js';

const toModel = (json) => {
  const map = (d) => {
    let teams = [];
    if (d.relationships?.teams) {
      teams = d.relationships.teams.data.map(
        ({ id }) => json.included.find(
          included => included.type === 'teams' && included.id === id
        )
      );
    }
    return {
      id: d.id,
      title: d.attributes.contents[0].title,
      summary: d.attributes.contents[0].summary,
      location: d.attributes.event.location,
      start_date: dateToTimezone(d.attributes.event.start_date, d.attributes.event.time_zone),
      end_date: dateToTimezone(d.attributes.event.end_date, d.attributes.event.time_zone),
      time_zone: d.attributes.event.time_zone,
      cancelled: d.attributes.event.cancelled,
      teams: teams.map((team) => ({
        id: team.id,
        name: team.attributes.name
      }))
    };
  };

  if (Array.isArray(json.data)) {
    return {
      items: json.data.map(map),
      meta: json.meta
    };
  }

  return map(json.data);
};

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
