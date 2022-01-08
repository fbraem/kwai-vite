import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import dayjs from '/src/common/useDayJS.js';
import { useHttpApi } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';

const toStoryModel = json => {
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
      publish_date: dayjs.utc(d.attributes.publish_date, 'YYYY-MM-DD HH:mm:ss').tz(d.attributes.timezone).format('D MMMM, YYYY'),
      has_more: d.attributes.contents[0].html_content?.length,
      html_content: d.attributes.contents[0].html_content,
      content: d.attributes.contents[0].content,
      enabled: d.attributes.enabled,
      application: {
        id: application.id,
        name: application.attributes.name,
        title: application.attributes.title
      },
      promotion: {
        priority: d.attributes.promotion,
        end_date: d.attributes.promotion_end_date
          ? dayjs.utc(d.attributes.promotion_end_date, 'YYYY-MM-DD HH:mm:ss').tz(d.attributes.timezone)
          : null
      },
      publication: {
        start_date: d.attributes.publish_date
          ? dayjs.utc(d.attributes.publish_date, 'YYYY-MM-DD HH:mm:ss').tz(d.attributes.timezone)
          : null,
        end_date: d.attributes.end_date
          ? dayjs.utc(d.attributes.end_date, 'YYYY-MM-DD HH:mm:ss').tz(d.attributes.timezone)
          : null
      },
      remark: d.attributes.remark
    };
  };
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useNewsStore = defineStore('news', {
  state: () => ({
    count: 0,
    story: null,
    stories: []
  }),
  actions: {
    get(id) {
      const { data, loading, error } = useState(
        () => `/news/${id}`,
        () =>
          useHttpApi
            .url('/news/stories/')
            .url(id)
            .get()
            .json()
      );

      watch(
        data,
        json => {
          this.story = toStoryModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    load({
      offset = ref(0),
      limit = ref(10)
    } = {}) {
      const { data, loading, error } = useState(
        () => `/news/${offset.value}/${limit.value}`,
        () => {
          let api = useHttpApi.url('/news/stories');
          if (offset.value > 0) {
            api = api.query({ 'page[offset]': offset.value });
          }
          if (limit.value) {
            api = api.query({ 'page[limit]': limit.value });
          }
          api = api.query({ 'filter[enabled]': false });
          return api.get().json();
        }
      );

      watch(
        data,
        json => {
          this.count = json.meta.count;
          this.stories = toStoryModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    save(story) {
      const payload = {
        data: {
          type: 'stories',
          attributes: {
            enabled: story.enabled,
            promotion: Number(story.promotion.priority),
            timezone: dayjs.tz.guess(),
            publish_date: story.publication.start_date?.utc().format('YYYY-MM-DD HH:mm:ss'),
            end_date: story.publication.end_date?.utc().format('YYYY-MM-DD HH:mm'),
            promotion_end_date: story.promotion.end_date?.utc().format('YYYY-MM-DD HH:mm:ss'),
            remark: story.remark,
            contents: [
              {
                locale: 'nl',
                format: 'md',
                title: story.title,
                summary: story.summary,
                content: story.content
              }
            ]
          },
          relationships: {
            application: {
              data: {
                type: 'applications',
                id: story.application.id
              }
            }
          }
        }
      };
      let api = useHttpApi.url('/news/stories');
      if (story.id) {
        payload.data.id = story.id;
        api = api.url(`/${story.id}`);
      }
      api = api.json(payload);
      return (story.id ? api.patch() : api.post())
        .json(json => {
          this.story = toStoryModel(json);
        });
    }
  }
});
