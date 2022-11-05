import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { ref, unref } from 'vue';
import { useRequest } from 'vue-request';
import { useHttpApi } from '@kwai/api';
import { createDateTimeFromUTC } from '@kwai/date';
import type { DateType } from '@kwai/date';

interface JSONDataType<DataType> {
  id: string,
  type: string,
  attributes: DataType
}
interface JSONAPI<DataType> {
  meta?: {
    count: number,
    limit: number,
    offset: number
  },
  data: JSONDataType<DataType>[] | JSONDataType<DataType>
}

interface JSONAPINewsStoryContent {
  locale: string,
  title: string,
  html_summary: string,
  html_content?: string
}

interface JSONAPINewStory {
  enabled: boolean,
  remark?: string,
  publish_date: string,
  end_date?: string,
  timezone: string,
  promotion: number,
  promotion_end_date?: string,
  contents: JSONAPINewsStoryContent[]
}

interface NewsStoryContent {
  locale: string,
  title: string,
  summary: string,
  content?: string
}

interface NewsStory {
  id: string,
  enabled: boolean,
  publish_date: DateType,
  contents: NewsStoryContent[]
}

const toModel = (json: JSONAPI<JSONAPINewStory>): NewsStory | NewsStory[] => {
  const mapModel = (d: JSONDataType<JSONAPINewStory>): NewsStory => ({
    id: d.id,
    enabled: d.attributes.enabled,
    publish_date: createDateTimeFromUTC(d.attributes.publish_date, d.attributes.timezone),
    contents: d.attributes.contents.map(content => ({
      locale: content.locale,
      title: content.title,
      summary: content.html_summary,
      content: content.html_content,
    })),
  });
  if (Array.isArray(json.data)) {
    return json.data.map(mapModel);
  }
  return mapModel(json.data);
};

const setupNewsStore = () => {
  const items: Ref<NewsStory[]> = ref([]);

  const load = ({
    offset = ref(0),
    limit = ref(0),
    year = ref(0),
    month = ref(0),
    application = ref(0),
    promoted = ref(false),
  } = {}) => {
    const cacheKey = unref(promoted) ? '/portal/news/' : '/portal/news/promoted';
    const { loading, error } = useRequest(
      () => {
        let api = useHttpApi().url('/news/stories');
        if (unref(promoted)) {
          api = api.query({ 'filter[promoted]': true });
        }
        return api
          .get()
          .json()
        ;
      },
      {
        cacheKey,
        errorRetryCount: 5,
        refreshOnWindowFocus: false,
        onSuccess: (data) => {
          items.value = toModel(data as JSONAPI<JSONAPINewStory>) as NewsStory[];
        },
      }
    );
    return {
      loading,
      error,
    };
  };

  return {
    items,
    load,
  };
};

export const useNewsStore = defineStore('news', () => setupNewsStore());

export const usePromotedNewsStore = defineStore('promotedNews', () => {
  const store = setupNewsStore();

  return {
    items: store.items,
    load: () => store.load({ promoted: ref(true) }),
  };
});
