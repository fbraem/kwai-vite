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
      application: {
        id: application.id,
        name: application.attributes.name,
        title: application.attributes.title
      }
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
      limit = ref(10),
      year = ref(0),
      month = ref(0),
      applicationId = ref(0)
    } = {}) {
      const { data, loading, error } = useState(
        () => `/news/${offset.value}/${limit.value}/${year.value}/${month.value}/${applicationId.value}`,
        () => {
          let api = useHttpApi.url('/news/stories');
          if (offset.value > 0) {
            api = api.query({ 'page[offset]': offset.value });
          }
          if (limit.value) {
            api = api.query({ 'page[limit]': limit.value });
          }
          if (year.value) {
            api = api.query({ 'filter[year]': year.value });
            if (month.value) {
              api = api.query({ 'filter[month]': month.value });
            }
          }
          if (applicationId.value) {
            api = api.query({ 'filter[application]': applicationId.value });
          }
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
    loadPromoted({
      offset = ref(0),
      limit = ref(10),
      applicationId = ref(0)
    } = {}) {
      const { data, loading, error } = useState(
        () => `/news/${offset.value}/${limit.value}/${applicationId.value}`,
        () => {
          let api = useHttpApi.url('/news/stories');
          if (offset.value > 0) {
            api = api.query({ 'page[offset]': offset.value });
          }
          if (limit.value) {
            api = api.query({ 'page[limit]': limit.value });
          }
          api = api.query({ 'filter[promoted]': true });
          if (applicationId.value) {
            api = api.query({ 'filter[application]': applicationId.value });
          }
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
    }
  }
});
