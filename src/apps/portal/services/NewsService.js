import { useHttp } from '/src/common/useHttp.js';

import { dateToTimezone, formatDate } from '/src/common/useDayJS';

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
      html_summary: d.attributes.contents[0].html_summary,
      publish_date: formatDate(
        dateToTimezone(
          d.attributes.publish_date,
          d.attributes.timezone
        ),
        'D MMMM, YYYY'
      ),
      has_more: d.attributes.contents[0].html_content.length > 0,
      html_content: d.attributes.contents[0].html_content,
      content: d.attributes.contents[0].content,
      application: {
        id: application.id,
        name: application.attributes.name,
        title: application.attributes.title
      }
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

const archive = () => {
  return useHttp
    .url('/news/archive')
    .get()
    .json();
};

const get = id => {
  return useHttp
    .url(`/news/stories/${id}`)
    .get()
    .json((json) => toModel(json))
  ;
};

const load = ({
  promoted = false,
  year = 0,
  month = 0,
  offset = 0,
  limit = 10,
  application = 0
} = {}) => {
  let api = useHttp.url('/news/stories');
  if (offset > 0) {
    api = api.query({ 'page[offset]': offset });
  }
  if (limit) {
    api = api.query({ 'page[limit]': limit });
  }
  if (promoted) {
    api = api.query({ 'filter[promoted]': true });
  }
  if (year) {
    api = api.query({ 'filter[year]': year });
    if (month) {
      api = api.query({ 'filter[month]': month });
    }
  }
  if (application) {
    api = api.query({ 'filter[application]': application });
  }
  return api.get().json((json) => toModel(json));
};

export const useNewsService = () => ({
  archive,
  get,
  load
});
