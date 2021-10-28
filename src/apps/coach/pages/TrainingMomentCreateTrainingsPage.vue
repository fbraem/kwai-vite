<template>
  <PageSection>
    <Header class="pb-4">
      Nieuwe Trainingen
    </Header>
    <div
      v-if="store.moment"
      class="sm:py-4 px-4 bg-white py-4"
    >
      <template v-if="store.moment.active">
        <p class="text-sm text-gray-600 pb-4">
          Genereer nieuwe trainingen aan de hand van dit trainingsmoment.
        </p>
        <div class="rounded bg-gray-300">
          <Form
            title="Periode"
            class="px-2 py-3"
          >
            <template #description>
              <p class="mt-1 text-sm text-gray-600">
                Bepaal de periode waarvoor trainingen moeten aangemaakt worden.
              </p>
            </template>
            <div class="flex flex-col md:flex-row md:space-x-4">
              <DatePicker
                id="start_period"
                v-model="startPeriod"
                label="Start Periode"
                :error="errors['startPeriod']"
                :placeholder="dateFormat"
              />
              <DatePicker
                id="end_period"
                v-model="endPeriod"
                label="Einde Periode"
                :error="errors['endPeriod']"
                :placeholder="dateFormat"
              />
            </div>
          </Form>
          <Form
            title="Coaches"
            class="px-2 py-3"
          >
            <template #description>
              <p class="text-sm text-gray-600">
                Selecteer coaches voor deze trainingen.
              </p>
            </template>
            <div class="grid sm:grid-cols-2">
              <template
                v-for="coach in coaches"
                :key="coach.id"
              >
                <div class="flex items-center p-2">
                  <input
                    :id="`coach_${coach.id}`"
                    v-model="selectedCoaches"
                    type="checkbox"
                    :value="coach.id"
                    class="text-yellow-500"
                  >
                  <div class="ml-3 text-sm text-gray-700">
                    {{ coach.name }}
                  </div>
                </div>
              </template>
            </div>
          </Form>
          <Form
            title=""
            class="px-2 py-3"
          >
            <div class="flex flex-col space-y-2 sm:space-x-4 sm:space-y-0 sm:flex-row items-center">
              <div
                v-if="Object.keys(errors).length > 0"
                class="flex-grow text-sm text-red-600"
              >
                Gelieve alle foutief ingevulde velden te corrigeren.
              </div>
              <div
                v-else
                class="flex-grow"
              >
                <Alert
                  v-if="trainingGenerator.isGenerated && !trainingGenerator.hasTrainings"
                  type="warning"
                  title="Geen trainingen"
                >
                  <span class="text-sm">Er zijn (nog) geen trainingen gegenereerd.</span>
                </Alert>
                <Alert
                  v-else-if="trainingGenerator.hasTrainings"
                  type="info"
                  title="Nieuwe Trainingen"
                >
                  <span class="text-sm">
                    Er zijn <span class="font-bold">{{ trainingGenerator.trainings.length }}</span>
                    trainingen gegeneerd. Opgelet deze trainingen zijn nog niet bewaard. Controleer
                    ze hier onder. <i class="fas fa-arrow-down ml-2" />
                  </span>
                </Alert>
              </div>
              <div class="text-center">
                <SubmitButton
                  class="w-full bg-yellow-500 text-black active:bg-gray-700 disabled:bg-gray-300"
                  @click="submitForm"
                >
                  <i class="fas fa-clipboard-list fa-fw" /> Genereer
                </SubmitButton>
              </div>
            </div>
          </Form>
        </div>
      </template>
      <template v-else>
        <Alert
          type="warning"
          title="Inactief Trainingsmoment"
        >
          Vooraleer je nieuwe trainingen kan aanmaken, moet dit
          trainingsmoment geactiveerd worden.
        </Alert>
        <div class="flex mt-3 justify-center">
          <ButtonLink
            class="bg-yellow-500"
            :method="activate"
          >
            <i class="fas fa-check mr-1" />Activeer
          </ButtonLink>
        </div>
      </template>
    </div>
  </PageSection>
  <PageSection v-if="trainingGenerator.hasTrainings">
    <Header>Trainingen</Header>
    <div class="my-6 overflow-hidden bg-white rounded-md shadow p-3">
      <table class="w-full text-left border-collapse">
        <thead class="border-b">
          <tr>
            <th class="px-2 py-1 sm:px-6 py-4 text-sm font-medium uppercase bg-gray-300">
              Dag
            </th>
            <th class="px-2 py-1 sm:px-6 py-4 text-sm font-medium uppercase bg-gray-300">
              Tijdstip
            </th>
            <th class="px-2 py-1 sm:px-6 py-4 text-sm font-medium uppercase bg-gray-300">
              Coaches
            </th>
            <th class="px-2 py-1 sm:px-6 py-4 text-sm font-medium uppercase bg-gray-300" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(training, index) in trainingGenerator.trainings"
            :key="index"
          >
            <td class="px-2 py-1 sm:px-6 sm:py-4 text-gray-700 border-b text-sm">
              {{ training.start_date.format('L') }}
            </td>
            <td class="px-2 py-1 sm:px-6 sm:py-4 text-gray-700 border-b text-sm">
              {{ training.start_date.format('HH:mm') }} - {{ training.end_date.format('HH:mm') }}
            </td>
            <td class="px-2 py-1 sm:px-6 sm:py-4 text-lg text-gray-700 border-b">
              <div
                v-if="training.coaches.length === 0"
                class="text-center"
              >
                <i class="fas fa-minus" />
              </div>
              <template
                v-for="(coach, coachIndex) in training.coaches"
                :key="coachIndex"
              >
                <div class="text-sm">{{ coach.name }}</div>
              </template>
            </td>
            <td class="px-2 py-1 sm:px-6 sm:py-4 text-lg text-gray-700 border-b">
              <i
                v-if="training.id"
                class="fas fa-check text-green-600"
              />
              <IconRoundLink
                v-else
                class="hover:bg-red-600 hover:text-white"
                icon="fas fa-trash"
                :method="() => remove(index)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex mt-3 justify-center">
        <SubmitButton
          class="bg-yellow-500"
          @click="save"
        >
          <i class="fas fa-save mr-1" />Bewaar
        </SubmitButton>
      </div>
    </div>
  </PageSection>
</template>

<script>
import PageSection from '/@theme/components/PageSection.vue';
import Header from '/@theme/components/Header.vue';
import Form from '/src/components/form/Form.vue';
import DatePicker from '/src/components/form/DatePicker.vue';
import Alert from '/src/components/Alert.vue';
import dayjs from '/src/common/useDayJS.js';
import yup from '/src/common/useYup.js';
import { useField, useForm, useFormErrors } from 'vee-validate';
import ButtonLink from '/src/components/ButtonLink.vue';
import { useTrainingMomentStore } from '/src/apps/coach/stores/trainingMomentStore.js';
import { useCoachStore } from '/src/apps/coach/stores/coachStore.js';
import { computed, ref } from 'vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';
import IconRoundLink from '/src/components/IconRoundLink.vue';
import { useTrainingGenerator } from '/src/apps/coach/stores/trainingGeneratorStore.js';

export default {
  components: { IconRoundLink, SubmitButton, ButtonLink, DatePicker, Header, PageSection, Form, Alert },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useTrainingMomentStore();
    store.get(props.id);

    const coachStore = useCoachStore();
    coachStore.load();
    const coaches = computed(
      () => coachStore.coaches.filter(c => c.active)
    );
    const selectedCoaches = ref([]);

    const dateFormat = dayjs().localeData().longDateFormat('L');

    const validationSchema = yup.object({
      startPeriod: yup.date()
        .required('Dit is een verplicht veld')
        .format(dateFormat)
        .typeError(`Ongeldige datum (formaat ${dateFormat})`),
      endPeriod: yup.date()
        .required('Dit is een verplicht veld')
        .format(dateFormat)
        .typeError(`Ongeldige datum (formaat ${dateFormat})`)
        .when('startPeriod', (startPeriod, schema) => {
          return schema.test(
            'date-after',
            'Datum moet na start periode vallen',
            (value) => {
              if (startPeriod instanceof Date && value instanceof Date) {
                return dayjs(value).isAfter(dayjs(startPeriod));
              }
              return true;
            }
          );
        })
    });

    const { handleSubmit } = useForm({ validationSchema });

    const trainingGenerator = useTrainingGenerator();
    const submitForm = handleSubmit(values => {
      const start = dayjs(values.startPeriod, dateFormat, store.moment.time_zone);
      const end = dayjs(values.endPeriod, dateFormat, store.moment.time_zone);
      trainingGenerator.generate({
        start,
        end,
        moment: store.moment,
        coaches: selectedCoaches.value.map(id => coachStore.find(id))
      });
    });

    const { value: startPeriod } = useField('startPeriod');
    const { value: endPeriod } = useField('endPeriod');

    const activate = () => {
      store.moment.active = true;
      store.save(store.moment);
    };

    const remove = (index) => {
      trainingGenerator.remove(index);
    };

    const save = async() => {
      await trainingGenerator.save();
    };

    return {
      store,
      coaches,
      selectedCoaches,
      dateFormat,
      startPeriod,
      endPeriod,
      errors: useFormErrors(),
      submitForm,
      activate,
      trainingGenerator,
      remove,
      save
    };
  }
};
</script>
