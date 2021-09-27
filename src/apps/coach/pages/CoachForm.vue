<template>
  <PageSection>
    <Header class="py-4">
      {{ $route.meta.title }}
    </Header>
    <div class="rounded bg-gray-300">
      <Form
        v-if="id"
        title="Lid"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Naam van de coach.
          </p>
        </template>
        <span v-if="coach">{{ coach.name }}</span>
      </Form>
      <Form
        v-else
        title="Lid"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            De coach moet lid zijn van de club. Selecteer het lid dat coach is.
          </p>
        </template>
        <AutoComplete
          id="member"
          v-model="member"
          :options="members"
        />
      </Form>
      <Form
        title="Informatie"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Informatie over de coach.
          </p>
        </template>
        <InputField
          id="diploma"
          v-model="diploma"
          :error="errors['diploma']"
          placeholder="Diploma van de coach"
          type="text"
          label="Diploma"
        />
        <TextArea
          id="bio"
          v-model="bio"
          :error="errors['bio']"
          placeholder="Biografie van de coach"
          label="Bio"
        />
      </Form>
      <Form
        title="Opmerking"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Een opmerking bij de coach. Een opmerking is niet
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
            Is de coach actief binnen de club?
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
import Header from '/@theme/components/Header.vue';
import PageSection from '/@theme/components/PageSection.vue';
import Form from '/src/components/form/Form.vue';
import InputField from '/src/components/form/InputField.vue';
import AutoComplete from '/src/components/form/AutoComplete.vue';
import TextArea from '/src/components/form/TextArea.vue';
import CheckBox from '/src/components/form/CheckBox.vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';

import { useCoachStore } from '/src/apps/coach/stores/coachStore.js';
import { useMemberStore } from '/src/apps/coach/stores/memberStore.js';
import { useField, useForm, useFormErrors } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

export default {
  components: {
    AutoComplete, Header, PageSection, Form, InputField, TextArea, SubmitButton, CheckBox
  },
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    }
  },
  setup(props) {
    const store = useCoachStore();
    if (props.id) {
      store.get(props.id);
    }

    const memberStore = useMemberStore();
    if (!props.id) {
      store.load();
      memberStore.load();
    }

    // options for autocomplete, filtering out members that are already coach.
    const members = computed(() => {
      return memberStore.members.map(m => ({
        value: m,
        label: m.name
      })).filter(m => !store.containsMember(m.value.id));
    });

    const coach = ref({});
    watch(
      () => store.coach,
      (nv) => {
        if (nv) {
          coach.value = nv;
          member.value = nv.member.id;
          diploma.value = nv.diploma;
          bio.value = nv.bio;
          active.value = nv.active;
          remark.value = nv.remark;
        }
      }
    );

    const validationSchema = yup.object({
    });
    const { handleSubmit, isSubmitting } = useForm({
      validationSchema,
      initialValues: {
      }
    });

    const router = useRouter();
    const submitForm = handleSubmit(async(values) => {
      if (!props.id) {
        coach.value.member = values.member.value;
      }
      coach.value.diploma = values.diploma;
      coach.value.bio = values.bio;
      coach.value.remark = values.remark;
      coach.value.active = values.active;

      await store.save(coach.value);

      router.back();
    });

    const { value: member } = useField('member');
    const { value: diploma } = useField('diploma');
    const { value: bio } = useField('bio');
    const { value: remark } = useField('remark');
    const { value: active } = useField('active');

    return {
      coach,
      handleSubmit,
      isSubmitting,
      submitForm,
      member,
      diploma,
      bio,
      remark,
      active,
      errors: useFormErrors(),
      members
    };
  }
};
</script>
