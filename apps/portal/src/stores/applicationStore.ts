import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { JsonApiDataType, JsonApiDocumentType, useHttp } from '@kwai/api';
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

    const toModel = (json: JsonApiDocumentType): Application | Application[] => {
      const mapModel = (d: JsonApiDataType): Application => {
        const application = <JsonApiApplicationType>d;
        return {
          id: application.id,
          title: application.attributes.title,
          name: application.attributes.name,
          short_description: application.attributes.short_description,
          description: application.attributes.description,
        };
      };
      if (Array.isArray(json.data)) {
        return json.data.map(mapModel);
      }
      return mapModel(json.data);
    };

    const load = () => {
      const { data, loading, error } = useRequest(
        () => {
          const api = useHttp()
            .url('/portal/applications');
          return api.get().json();
        },
        {
          cacheKey: '/portal/applications',
          errorRetryCount: 5,
          refreshOnWindowFocus: false,
        }
      );
      watch(
        data,
        json => {
          applications.value = <Application[]> toModel(<JsonApiDocumentType> json);
        }
      );
    };

    return {
      application,
      applications,
      load,
    };
  }
);
