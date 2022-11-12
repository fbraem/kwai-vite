import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { ref, unref } from 'vue';
import { useRequest } from 'vue-request';
import { JsonApiDataType, JsonApiDocumentType, useHttpApi } from '@kwai/api';
import { createDateTimeFromUTC } from '@kwai/date';
import type { DateType } from '@kwai/date';
import { z } from 'zod';

const JsonApiContent = z.object({
  locale: z.string(),
  title: z.string(),
  html_summary: z.string(),
  html_content: z.string().optional(),
});

const JsonApiNewsStory = z.object({
  id: z.string(),
  type: z.literal('stories'),
  attributes: z.object({
    enabled: z.boolean(),
    remark: z.string().optional(),
    publish_date: z.string(),
    end_date: z.string().optional(),
    timezone: z.string(),
    promotion: z.number(),
    promotion_end_date: z.string(),
    contents: z.array(JsonApiContent),
  }),
});
type JsonApiNewsStoryType = z.infer<typeof JsonApiNewsStory>;

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

const toModel = (json: JsonApiDocumentType): NewsStory | NewsStory[] => {
  const mapModel = (d: JsonApiDataType): NewsStory => {
    const story = <JsonApiNewsStoryType> d;
    return {
      id: story.id,
      enabled: story.attributes.enabled,
      publish_date: createDateTimeFromUTC(story.attributes.publish_date, d.attributes.timezone),
      contents: story.attributes.contents.map(content => ({
        locale: content.locale,
        title: content.title,
        summary: content.html_summary,
        content: content.html_content,
      })),
    };
  };
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
          items.value = <NewsStory[]> toModel(<JsonApiDocumentType> data);
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
