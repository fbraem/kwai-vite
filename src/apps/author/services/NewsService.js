import { useHttpApi } from '/src/common/useHttp.js';
import { dateToTimezone, formatDate } from '/src/common/useDayJS.js';

function toModel(json) {
  const map = d => {
    const application = json.included.find(
      included => included.type === 'applications' &&
        included.id === d.relationships.application.data.id
    );
    return {
      id: d.id,
      title: d.attributes.contents[0].title,
      summary: d.attributes.contents[0].html_summary,
      publish_date: formatDate(
        dateToTimezone(
          d.attributes.publish_date,
          d.attributes.timezone
        ),
        'D MMMM, YYYY'
      ),
      has_more: d.attributes.contents[0].html_content.length > 0,
      content: d.attributes.contents[0].html_content,
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

const load = ({
  offset = 0,
  limit = 10,
  application = 0
} = {}) => {
  let api = useHttpApi
    .url('/news/stories')
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

export const useNewsService = () => ({
  load
});
