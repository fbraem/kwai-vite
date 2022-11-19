import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { JsonApiDocument, useHttp } from '@kwai/api';
import { useRequest } from 'vue-request';
import { z } from 'zod';

const JsonApiApplication = z.object({
  id: z.string(),
  type: z.literal('applications'),
  attributes: z.object({
    name: z.string(),
    title: z.string(),
    short_description: z.string(),
    description: z.string(),
  }),
});
type JsonApiApplicationType = z.infer<typeof JsonApiApplication>;

const JsonApiApplicationData = z.object({
  data: z.union([JsonApiApplication, z.array(JsonApiApplication).default([])]),
});
const JsonApiApplicationDocument = JsonApiDocument.extend(JsonApiApplicationData.shape);
type JsonApiApplicationDocumentType = z.infer<typeof JsonApiApplicationDocument>;

interface Application {
  id: string,
  name: string,
  title: string,
  short_description: string,
  description: string
}

export const useApplicationStore = defineStore(
  'applications',
  () => {
    const application: Ref<Application|null> = ref(null);
    const applications: Ref<Application[]> = ref([]);

    const toModel = (json: JsonApiApplicationDocumentType): Application | Application[] => {
      const mapModel = (d: JsonApiApplicationType): Application => {
        return {
          id: d.id,
          title: d.attributes.title,
          name: d.attributes.name,
          short_description: d.attributes.short_description,
          description: d.attributes.description,
        };
      };
      if (Array.isArray(json.data)) {
        return json.data.map(mapModel);
      }
      return mapModel(json.data);
    };

    const load = () => {
      const { loading, error } = useRequest(
        () => {
          const api = useHttp()
            .url('/portal/applications');
          return api.get().json();
        },
        {
          cacheKey: '/portal/applications',
          errorRetryCount: 5,
          refreshOnWindowFocus: false,
          onSuccess: (data) => {
            const result = JsonApiApplicationDocument.safeParse(data);
            if (result.success) {
              applications.value = <Application[]> toModel(result.data);
            }
          },
        }
      );
      return {
        loading,
        error,
      };
    };

    return {
      application,
      applications,
      load,
    };
  }
);
