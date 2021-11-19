<template>
  <PageSection>
    <Header class="py-4">
      {{ $route.meta.title }}
    </Header>
    <template v-if="error">
      <Alert
        v-if="error.status === 400"
        title="Niet gevonden"
        type="danger"
        icon="fa-2x fas fa-question-circle"
      >
        De training met id <span class="font-medium">{{ id }}</span> werd niet gevonden.
      </Alert>
      <Alert
        v-else
        title="Fout"
        type="danger"
        icon="fa-2x fas fa-exclamation-circle"
        class="text-sm sm:text-base"
      >
        Er is een onverwachte fout gebeurd.<br>
        <div class="text-xs sm:text-sm">
          <span class="font-medium">code: </span>{{ error.status }}
          -
          <span class="font-medium">message: </span>{{ error.response?.statusText ?? '-' }}
        </div>
        <div class="text-xs mt-2">
          Neem contact op met de webmaster wanneer het probleem zich blijft voordoen.
        </div>
      </Alert>
    </template>
    <div
      v-else
      class="rounded bg-gray-300"
    >
      <Form
        title="Training"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Geef het trainingsmoment een naam en omschrijving.
          </p>
        </template>
        <InputField
          id="title"
          v-model="title"
          :error="errors['title']"
          placeholder="Geef een titel in"
          type="text"
          label="Titel"
        />
        <TextArea
          id="summary"
          v-model="summary"
          :error="errors['summary']"
          placeholder="Geef een omschrijving in"
          label="Omschrijving"
        />
      </Form>
      <Form
        title="Tijdstip"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Wanneer gaat de training door?
          </p>
        </template>
        <DatePicker
          id="date"
          v-model="date"
          label="Datum"
          :error="errors['date']"
          :placeholder="`Datum in formaat ${dateFormat}`"
        />
        <div class="flex justify-between space-x-6">
          <InputField
            id="start_time"
            v-model="startTime"
            label="Begintijd"
            :error="errors['startTime']"
          />
          <InputField
            id="end_time"
            v-model="endTime"
            label="Eindtijd"
            :error="errors['endTime']"
          />
        </div>
      </Form>
      <Form
        title="Annulatie"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Een geannuleerde training wordt getoond met de indicatie "geannuleerd".
          </p>
        </template>
        <CheckBox
          id="cancelled"
          v-model="cancelled"
          label="Geannuleerd"
          color="text-yellow-500"
        >
          <p class="text-gray-600">
            Is deze training geannuleerd?
          </p>
        </CheckBox>
      </Form>
      <Form
        title="Locatie"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Waar gaat de training door?
          </p>
        </template>
        <InputField
          id="location"
          v-model="location"
          :error="errors['location']"
        />
      </Form>
      <Form
        title="Teams"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Welke teams kunnen deelnemen aan deze training?
          </p>
        </template>
        <TeamCheckBoxes v-model="selectedTeams" />
      </Form>
      <Form
        title="Coaches"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Wie zijn de coaches voor deze training?
          </p>
        </template>
        <div
          v-if="assignedCoaches.length > 0"
          class="divide-y divide-gray-300"
        >
          <h4
            class="text-sm text-gray-700 font-medium mb-4"
          >
            Reeds aangestelde Coaches voor deze training
          </h4>
          <div
            v-for="coach in assignedCoaches"
            :key="coach.id"
          >
            <div class="w-full flex flex-row items-center space-x-4 py-4">
              <div class="flex-none">
                <img
                  src="/assets/portal/no_avatar.png"
                  class="w-16 h-16 rounded-full"
                  :alt="`Avatar of ${coach.name}`"
                />
              </div>
              <div class="flex-grow">
                <h4 class="font-medium text-gray-700">
                  {{ coach.name }}
                </h4>
                <div class="flex flex-col flex-wrap space-y-2 sm:flex-row sm:space-y-0 sm:justify-between mt-1">
                  <div class="mr-2">
                    <CheckBox
                      :id="`coach_head_${coach.id}`"
                      v-model="coach.head"
                      label="Hoofdcoach"
                      color="text-yellow-500"
                    />
                  </div>
                  <div class="mr-2">
                    <CheckBox
                      :id="`coach_present_${coach.id}`"
                      v-model="coach.present"
                      label="Aanwezig"
                      color="text-yellow-500"
                    />
                  </div>
                  <div>
                    <CheckBox
                      :id="`coach_payed_${coach.id}`"
                      v-model="coach.payed"
                      label="Betaald"
                      color="text-yellow-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <IconLink
                  icon="fas fa-trash-alt"
                  class="text-red-600"
                  :method="() => removeCoach(coach.id)"
                />
              </div>
            </div>
          </div>
        </div>
        <Alert
          v-else
          title="Geen Coaches"
          type="warning"
          class="text-sm"
          icon="fas fa-exclamation-circle"
        >
          Er zijn nog geen coaches aangesteld voor deze training.
        </Alert>
        <div
          v-if="rest.length > 0"
          class="border-t-2 border-gray-300 pt-5"
        >
          <h4
            class="text-sm text-gray-700 font-medium mb-4"
          >
            Stel volgende coaches aan voor deze training:
          </h4>
          <CoachCheckBoxes
            v-model="newCoaches"
            :coaches="rest"
            :error="coachError"
            :reload="coachReload"
          />
        </div>
        <div
          v-if="newCoaches.length > 0"
          class="text-center"
        >
          <SubmitButton
            id="add_coaches"
            class="bg-yellow-500 text-black active:bg-gray-700 disabled:bg-gray-300"
            @click="addCoaches"
          >
            <i class="fas fa-plus fa-fw" /> Voeg toe
          </SubmitButton>
        </div>
      </Form>
      <Form
        title="Opmerking"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Een opmerking bij deze training. Een opmerking is niet
            zichtbaar voor een bezoeker.
          </p>
        </template>
        <TextArea
          id="remark"
          v-model="remark"
          :error="errors['remark']"
          placeholder="Geef een opmerking in"
          label="Opmerking"
        />
      </Form>
      <Form
        title=""
        class="p-3"
      >
        <div class="flex">
          <div class="flex-grow">
            <CheckBox
              id="active"
              v-model="active"
              label="Actief"
              color="text-yellow-500"
            >
              <p class="text-gray-600">
                Is deze training actief?
              </p>
            </CheckBox>
          </div>
          <div>
            <SubmitButton
              id="submit"
              class="bg-yellow-500 text-black active:bg-gray-700 disabled:bg-gray-300"
              :disabled="isSubmitting"
              @click="submitForm"
            >
              <i class="fas fa-save fa-fw" /> Bewaar
            </SubmitButton>
          </div>
        </div>
        <div
          v-if="Object.keys(errors).length > 0"
          class="text-sm text-red-600"
        >
          Gelieve alle foutief ingevulde velden te corrigeren.
        </div>
      </Form>
    </div>
  </PageSection>
</template>

<script>
import IconLink from '/src/components/IconLink.vue';
import PageSection from '/@theme/components/PageSection.vue';
import Header from '/@theme/components/Header.vue';
import Form from '/src/components/form/Form.vue';
import DatePicker from '/src/components/form/DatePicker.vue';
import InputField from '/src/components/form/InputField.vue';
import CheckBox from '/src/components/form/CheckBox.vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';
import TextArea from '/src/components/form/TextArea.vue';
import Alert from '/src/components/Alert.vue';
import TeamCheckBoxes from '/src/apps/coach/components/TeamCheckBoxes.vue';
import CoachCheckBoxes from '/src/apps/coach/components/CoachCheckBoxes.vue';
import { useTrainingStore } from '/src/apps/coach/stores/trainingStore.js';
import { useCoachStore } from '/src/apps/coach/stores/coachStore.js';
import { useTeamStore } from '/src/apps/coach/stores/teamStore.js';

import { useField, useForm, useFormErrors } from 'vee-validate';
import yup from '/src/common/useYup.js';
import dayjs from '/src/common/useDayJS.js';

import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    IconLink,
    CoachCheckBoxes,
    TeamCheckBoxes,
    Alert,
    TextArea,
    DatePicker,
    Header,
    PageSection,
    Form,
    InputField,
    CheckBox,
    SubmitButton
  },
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    }
  },
  setup(props) {
    const creating = computed(() => props.id === null);
    const dateFormat = dayjs().localeData().longDateFormat('L');

    const store = useTrainingStore();
    const { error } = (props.id) ? store.get(props.id) : { error: ref(null) };

    const training = ref({});
    const assignedCoaches = ref([]);
    watch(
      () => store.training,
      (nv) => {
        if (nv) {
          training.value = nv;
          title.value = nv.title;
          summary.value = nv.summary;
          date.value = nv.start_date.format(dateFormat);
          startTime.value = nv.start_date.format('HH:mm');
          endTime.value = nv.end_date.format('HH:mm');
          cancelled.value = nv.cancelled;
          active.value = nv.active;
          selectedTeams.value = nv.teams.map(coach => coach.id);
          assignedCoaches.value = nv.coaches.map(coach => ({ ...coach }));
        }
      }
    );

    const teamStore = useTeamStore();
    const teamLoad = teamStore.load();

    const coachStore = useCoachStore();
    const {
      loading: coachLoading,
      error: coachError,
      reload: coachReload
    } = coachStore.load();

    const addCoaches = () => {
      newCoaches.value.forEach(id => {
        const coach = coachStore.find(id);
        assignedCoaches.value.push({
          id,
          name: coach.name,
          head: false,
          payed: false,
          present: false
        });
      });
      newCoaches.value.splice(0, newCoaches.value.length);
    };
    const removeCoach = (id) => {
      assignedCoaches.value.splice(
        assignedCoaches.value.findIndex(coach => coach.id === id),
        1
      );
    };

    const rest = computed(() => {
      const coaches = coachStore.activeCoaches.map(
        coach => ({ key: coach.id, value: coach.name })
      );
      if (store.training) {
        return coaches.filter(
          activeCoach => !assignedCoaches.value.find(coach => coach.id === activeCoach.key)
        );
      }
      return coaches;
    });
    const newCoaches = ref([]);

    const validationSchema = yup.object({
      title: yup.string()
        .required('Dit is een verplicht veld'),
      date: yup.date().format(dateFormat)
        .required('Dit is een verplicht veld')
        .typeError(`Ongeldige datum(formaat ${dateFormat})`),
      startTime: yup.string()
        .required('Dit is een verplicht veld')
        .matches(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/, 'Ongeldige tijd'),
      endTime: yup.string()
        .required('Dit is een verplicht veld')
        .matches(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/, 'Ongeldige tijd')
    });
    const { handleSubmit, isSubmitting } = useForm({
      validationSchema,
      initialValues: {
      }
    });

    const router = useRouter();
    const route = useRoute();

    const submitForm = handleSubmit(async(values) => {
      training.value.title = values.title;
      training.value.summary = values.summary;
      training.value.cancelled = values.cancelled;
      training.value.start_date = dayjs(values.date + ' ' + values.startTime, dateFormat + ' HH:mm');
      training.value.end_date = dayjs(values.date + ' ' + values.endTime, dateFormat + ' HH:mm');
      training.value.location = values.location;
      training.value.teams = selectedTeams.value.map(id => teamStore.find(id));
      training.value.coaches = newCoaches.value.map(id => coachStore.find(id));
      training.value.active = values.active;
      await store.save(training.value);

      if (route.meta.prev_route) {
        router.back();
      } else {
        await router.push({ name: 'coach.trainings' });
      }
    });

    const selectedTeams = ref([]);

    const { value: title } = useField('title');
    const { value: summary } = useField('summary');
    const { value: date } = useField('date');
    const { value: startTime } = useField('startTime');
    const { value: endTime } = useField('endTime');
    const { value: cancelled } = useField('cancelled');
    const { value: location } = useField('location');
    const { value: remark } = useField('remark');
    const { value: active } = useField('active');

    return {
      creating,
      dateFormat,
      training,
      title,
      summary,
      date,
      startTime,
      endTime,
      cancelled,
      location,
      remark,
      active,
      selectedTeams,
      teamLoad,
      assignedCoaches,
      coachLoading,
      coachError,
      coachReload,
      rest,
      addCoaches,
      removeCoach,
      newCoaches,
      errors: useFormErrors(),
      handleSubmit,
      isSubmitting,
      submitForm,
      error
    };
  }
};
</script>
