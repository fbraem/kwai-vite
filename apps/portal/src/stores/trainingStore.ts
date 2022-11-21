import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { createDateTimeFromUTC, DateType, now } from '@kwai/date';
import { useRequest } from 'vue-request';
import { z } from 'zod';
import { useHttpApi, JsonApiDataType, JsonApiDocument } from '@kwai/api';

const JsonApiEvent = z.object({
  start_date: z.string(),
  end_date: z.string(),
  timezone: z.string(),
  location: z.nullable(z.string()).optional(),
  cancelled: z.boolean(),
  active: z.boolean(),
});

const JsonApiContent = z.object({
  locale: z.string(),
  title: z.string(),
  html_summary: z.string(),
  html_content: z.nullable(z.string()).optional(),
});

const JsonApiTeam = z.object({
  id: z.string(),
  type: z.literal('teams'),
  attributes: z.object({
    name: z.string(),
  }),
});
type JsonApiTeamType = z.infer<typeof JsonApiTeam>;

const JsonApiCoach = z.object({
  id: z.string(),
  type: z.literal('coaches'),
  attributes: z.object({
    name: z.string(),
  }),
});

const JsonApiDefinition = z.object({
  id: z.string(),
  type: z.literal('definitions'),
  attributes: z.object({
    name: z.string(),
  }),
});

const JsonApiTraining = z.object({
  id: z.string(),
  type: z.literal('trainings'),
  attributes: z.object({
    event: JsonApiEvent,
    contents: z.array(JsonApiContent),
  }),
});
type JsonApiTrainingType = z.infer<typeof JsonApiTraining>;

const JsonApiTrainingData = z.object({
  data: z.union([JsonApiTraining, z.array(JsonApiTraining).default([])]),
  included: z.array(z.union([JsonApiTeam, JsonApiCoach, JsonApiDefinition])).default([]),
});

const JsonApiTrainingDocument = JsonApiDocument.extend(JsonApiTrainingData.shape);
type JsonApiTrainingDocumentType = z.infer<typeof JsonApiTrainingDocument>;

type Team = {
  id: string,
  name: string,
}

type Training = {
  id: string,
  cancelled: boolean,
  start_date: DateType,
  end_date: DateType,
  location?: string | null,
  title: string,
  summary: string,
  content?: string | null,
  teams: Team[],
};

const toModel = (json: JsonApiTrainingDocumentType): Training | Training[] => {
  const mapModel = (d: JsonApiDataType): Training => {
    const training = <JsonApiTrainingType> d;
    const teams: JsonApiTeamType[] = [];
    if (d.relationships?.teams && Array.isArray(d.relationships.teams.data)) {
      d.relationships.teams.data.forEach(t => {
        const includedTeam = json.included?.find(
          included => included.type === 'teams' && included.id === t.id
        );
        if (includedTeam) {
          teams.push(includedTeam as JsonApiTeamType);
        }
      });
    }
    return {
      id: training.id,
      cancelled: training.attributes.event.cancelled,
      start_date: createDateTimeFromUTC(training.attributes.event.start_date, training.attributes.event.timezone),
      end_date: createDateTimeFromUTC(training.attributes.event.end_date, training.attributes.event.timezone),
      location: training.attributes.event.location,
      title: training.attributes.contents[0].title,
      summary: training.attributes.contents[0].html_summary,
      content: training.attributes.contents[0].html_content,
      teams: teams.map(team => ({
        id: team.id,
        name: team.attributes.name,
      })),
    };
  };
  if (Array.isArray(json.data)) {
    return json.data.map(mapModel);
  }
  return mapModel(json.data);
};

export const useTrainingStore = defineStore('portal.trainings', () => {
  const trainings: Ref<Training[]> = ref([]);

  const start = ref(now());
  const end = ref(now().endOf('week'));

  const load = ({
    offset = ref(0),
    limit = ref(0),
  } = {}) => {
    const { loading, error } = useRequest(
      () => {
        let api = useHttpApi().url('/trainings');
        if (offset.value > 0) {
          api = api.query({ 'page[offset]': offset.value });
        }
        if (limit.value) {
          api = api.query({ 'page[limit]': limit.value });
        }
        api = api.query({
          'filter[start]': start.value.format(),
          'filter[end]': end.value.format(),
        });
        return api
          .get()
          .json()
        ;
      },
      {
        refreshDeps: [offset, limit, start, end],
        cacheKey: `portal.trainings/${offset.value}/${limit.value}`,
        errorRetryCount: 5,
        refreshOnWindowFocus: false,
        onSuccess: data => {
          const result = JsonApiTrainingDocument.safeParse(data);
          if (result.success) {
            trainings.value = <Training[]>toModel(result.data);
          } else {
            console.log(result.error);
            trainings.value = [];
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
    trainings,
    load,
  };
});