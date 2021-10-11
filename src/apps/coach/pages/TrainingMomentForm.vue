<template>
  <PageSection>
    <Header class="py-4">
      {{ $route.meta.title }}
    </Header>
    <div class="rounded bg-gray-300">
      <Form
        title="Trainingsmoment"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Geef het trainingsmoment een naam en omschrijving.
          </p>
        </template>
        <InputField
          id="name"
          v-model="name"
          :error="errors['name']"
          placeholder="Naam van het trainingsmoment"
          type="text"
          label="Naam"
        />
        <TextArea
          id="description"
          v-model="description"
          :error="errors['description']"
          placeholder="Omschrijving van het trainingsmoment"
          label="Omschrijving"
        />
      </Form>
      <Form
        title="Tijdstip"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Wanneer gaat dit trainingsmoment door?
          </p>
        </template>
        <Select
          id="weekday"
          v-model="weekday"
          :options="weekdays"
          label="Weekdag"
        />
        <div class="flex justify-between space-x-6">
          <InputField
            id="start_time"
            v-model="startTime"
            label="Begintijd"
          />
          <InputField
            id="end_time"
            v-model="endTime"
            label="Eindtijd"
          />
        </div>
      </Form>
      <Form
        title="Team"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Is dit trainingsmoment voor een specifiek team?
          </p>
        </template>
        <Select
          id="team"
          v-model="team"
          :options="teams"
        />
      </Form>
      <Form
        title="Locatie"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Op welke locatie gaat dit trainingsmoment door?
          </p>
        </template>
        <InputField
          id="location"
          v-model="location"
        />
      </Form>
      <Form
        title="Opmerking"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Een opmerking bij dit trainingsmoment. Een opmerking is niet
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
        <CheckBox
          id="active"
          v-model="active"
          label="Actief"
          color="text-yellow-500"
        >
          <p class="text-gray-600">
            Is dit trainingsmoment nog actief?
          </p>
        </CheckBox>
        <div class="text-right">
          <SubmitButton
            class="bg-yellow-500 text-black active:bg-gray-700 disabled:bg-gray-300"
            :disabled="isSubmitting"
            @click="submitForm"
          >
            <i class="fas fa-save fa-fw" /> Bewaar
          </SubmitButton>
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
import PageSection from '/@theme/components/PageSection.vue';
import Header from '/@theme/components/Header.vue';
import dayjs from '/src/common/useDayJS.js';
import Form from '/src/components/form/Form.vue';
import InputField from '/src/components/form/InputField.vue';
import TextArea from '/src/components/form/TextArea.vue';
import CheckBox from '/src/components/form/CheckBox.vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';
import Select from '/src/components/form/Select.vue';

import { useField, useForm, useFormErrors } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useTrainingMomentStore } from '/src/apps/coach/stores/trainingMomentStore.js';
import { useTeamStore } from '/src/apps/coach/stores/teamStore.js';

export default {
  components: { Select, PageSection, Header, Form, InputField, TextArea, CheckBox, SubmitButton },
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    }
  },
  setup(props) {
    const store = useTrainingMomentStore();
    if (props.id) {
      store.get(props.id);
    }
    const moment = ref({});
    watch(
      () => store.moment,
      (nv) => {
        if (nv) {
          moment.value = nv;
          name.value = nv.name;
          description.value = nv.description;
          weekday.value = nv.weekday;
          startTime.value = nv.start_time;
          endTime.value = nv.end_time;
          team.value = nv.team?.id;
          location.value = nv.location;
          remark.value = nv.remark;
          active.value = nv.active;
        }
      }
    );

    const teamStore = useTeamStore();
    teamStore.load();

    const teams = computed(() => {
      return teamStore.teams.map(t => ({
        value: t.id,
        text: t.name
      }));
    });

    const validationSchema = yup.object({
      name: yup.string().required('Dit is een verplicht veld'),
      description: yup.string().required('Dit is een verplicht veld'),
      weekday: yup.number().required('Dit is een verplicht veld'),
      startTime: yup.string().required('Dit is een verplicht veld'),
      endTime: yup.string().required('Dit is een verplicht veld')
    });

    const { handleSubmit, isSubmitting } = useForm({
      validationSchema,
      initialValues: {
      }
    });

    const router = useRouter();
    const submitForm = handleSubmit(async(values) => {
      moment.value.name = values.name;
      moment.value.description = values.description;
      moment.value.weekday = values.weekday;
      moment.value.start_time = values.startTime;
      moment.value.end_time = values.endTime;
      moment.value.time_zone = dayjs.tz.guess();
      moment.value.team = values.team;
      moment.value.location = values.location;
      moment.value.remark = values.remark;
      moment.value.active = values.active;
      await store.save(moment.value);
      router.back();
    });

    const { value: name } = useField('name');
    const { value: description } = useField('description');
    const { value: weekday } = useField('weekday');
    const { value: startTime } = useField('startTime');
    const { value: endTime } = useField('endTime');
    const { value: active } = useField('active');
    const { value: team } = useField('team');
    const { value: location } = useField('location');
    const { value: remark } = useField('remark');

    const weekdays = computed(() =>
      dayjs.weekdays(true).map((d, i) => ({
        value: i + 1,
        text: d
      }))
    );

    return {
      isSubmitting,
      submitForm,
      name,
      description,
      weekday,
      startTime,
      endTime,
      remark,
      active,
      errors: useFormErrors(),
      weekdays,
      teams,
      team,
      location
    };
  }
};
</script>
