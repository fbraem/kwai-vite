import { z } from 'zod';
import { JsonApiDocument, useHttpApi } from '@kwai/api';
import { defineStore } from 'pinia';
import { ComputedRef, ref, Ref, watch } from 'vue';
import useSWRV from 'swrv';

const JsonApiContent = z.object({
  locale: z.string(),
  title: z.string(),
  html_summary: z.string(),
  html_content: z.nullable(z.string()).optional(),
});

const JsonApiArticle = z.object({
  id: z.string(),
  type: z.literal('pages'),
  attributes: z.object({
    contents: z.array(JsonApiContent),
  }),
});
type JsonApiArticleType = z.infer<typeof JsonApiArticle>;

const JsonApiArticleData = z.object({
  data: z.union([JsonApiArticle, z.array(JsonApiArticle).default([])]),
});
const JsonApiArticleDocument = JsonApiDocument.extend(JsonApiArticleData.shape);
type JsonApiArticleDocumentType = z.infer<typeof JsonApiArticleDocument>;

type Article = {
  id: string,
  locale: string,
  title: string,
  summary: string,
  content?: string | null
};

const toModel = (json: JsonApiArticleDocumentType): Article | Article[] => {
  const mapModel = (d: JsonApiArticleType): Article => {
    return {
      id: d.id,
      locale: d.attributes.contents[0].locale,
      title: d.attributes.contents[0].title,
      summary: d.attributes.contents[0].html_summary,
      content: d.attributes.contents[0].html_content,
    };
  };
  if (Array.isArray(json.data)) {
    return json.data.map(mapModel);
  }
  return mapModel(json.data);
};

export const useArticleStore = defineStore('portal.articles', () => {
  const articles: Ref<Article[]> = ref([]);

  const load = ({
    application,
  } : { application?: Ref<string>|ComputedRef<string|undefined>}) => {
    const { data, isValidating, error } = useSWRV<JsonApiArticleDocumentType>(
      () => {
        if (application !== null) {
          return application && application.value && `portal.articles.${application.value}`;
        }
        return 'portal.articles';
      },
      () => {
        let api = useHttpApi().url('/pages');
        if (application && application.value) {
          api = api.query({
            'filter[application]': application.value,
          });
        }
        return api
          .get()
          .json()
        ;
      },
      {
        revalidateOnFocus: false,
      }
    );

    watch(
      data,
      (nv) => {
        const result = JsonApiArticleDocument.safeParse(nv);
        if (result.success) {
          articles.value = <Article[]> toModel(result.data);
        }
      }
    );
    return {
      loading: isValidating,
      error,
    };
  };

  return {
    articles,
    load,
  };
});
