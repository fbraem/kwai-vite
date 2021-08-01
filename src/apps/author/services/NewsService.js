import { useHttp, useHttpApi } from '/src/common/useHttp.js';
import dayjs from '/src/common/useDayJS.js';

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
      publish_date: dayjs.tz(
        d.attributes.publish_date,
        d.attributes.timezone
      ),
      has_more: d.attributes.contents[0].content.length > 0,
      content: d.attributes.contents[0].content,
      application: {
        id: application.id,
        name: application.attributes.name,
        title: application.attributes.title
      },
      enabled: d.attributes.enabled,
      promotion: {
        priority: d.attributes.promotion,
        end_date: d.attributes.promotiom_end_date
          ? dayjs.tz(dayjs(d.attributes.promotion_end_date, 'YYYY-MM-DD HH:mm:ss'), d.attributes.timezone)
          : null
      },
      publication: {
        start_date: d.attributes.publish_date
          ? dayjs.tz(dayjs(d.attributes.publish_date, 'YYYY-MM-DD HH:mm:ss'), d.attributes.timezone)
          : null,
        end_date: d.attributes.end_date
          ? dayjs.tz(dayjs(d.attributes.end_date, 'YYYY-MM-DD HH:mm:ss'), d.attributes.timezone)
          : null
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

const get = id => {
  return useHttp
    .url(`/news/stories/${id}`)
    .get()
    .json((json) => toModel(json))
  ;
};

export const useNewsService = () => ({
  load,
  get
});
