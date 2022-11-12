import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { createDateTimeFromUTC, DateType } from '@kwai/date';
import { useRequest } from 'vue-request';
import { z } from 'zod';
import { useHttpApi, JsonApiDataType, JsonApiDocumentType } from '@kwai/api';

const JsonApiEvent = z.object({
  start_date: z.string(),
  end_date: z.string(),
  timezone: z.string(),
  location: z.string().optional(),
  cancelled: z.boolean(),
  active: z.boolean(),
});

const JsonApiContent = z.object({
  locale: z.string(),
  title: z.string(),
  html_summary: z.string(),
  html_content: z.string().optional(),
});

const JsonApiTeam = z.object({
  id: z.string(),
  type: z.literal('teams'),
  attributes: z.object({
    name: z.string(),
  }),
});
type JsonApiTeamType = z.infer<typeof JsonApiTeam>;

const JsonApiTraining = z.object({
  id: z.string(),
  type: z.literal('trainings'),
  attributes: z.object({
    event: JsonApiEvent,
    contents: z.array(JsonApiContent),
  }),
});
type JsonApiTrainingType = z.infer<typeof JsonApiTraining>;

type Team = {
  id: string,
  name: string,
}

type Training = {
  id: string,
  cancelled: boolean,
  start_date: DateType,
  end_date: DateType,
  location?: string,
  title: string,
  summary: string,
  content?: string,
  teams: Team[],
};

const toModel = (json: JsonApiDocumentType): Training | Training[] => {
  const mapModel = (d: JsonApiDataType): Training => {
    const training = <JsonApiTrainingType> d;
    const teams: JsonApiTeamType[] = [];
    if (d.relationships?.teams) {
      if (Array.isArray(d.relationships.teams.data)) {
        d.relationships.teams.data.forEach(t => {
          const includedTeam = json.included?.find(
            included => included.type === 'teams' && included.id === t.id
          );
          if (includedTeam) {
            teams.push(includedTeam as JsonApiTeamType);
          }
        });
      }
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

  const load = () => {
    const { loading, error } = useRequest(
      () => {
        const api = useHttpApi().url('/trainings');
        return api
          .get()
          .json()
        ;
      },
      {
        cacheKey: 'portal.trainings',
        errorRetryCount: 5,
        refreshOnWindowFocus: false,
        onSuccess: data => {
          trainings.value = <Training[]> toModel(<JsonApiDocumentType> data);
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
