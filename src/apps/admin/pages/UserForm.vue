<template>
  <div>
    <PageSectionTitle>
      {{ $route.meta.title }}
    </PageSectionTitle>
    <PageSection>
      <div class="rounded bg-gray-300">
        <Form
          title="Naam"
          class="p-3"
        >
          <template #description>
            <p class="mt-1 text-sm text-gray-600">
              De naam van de gebruiker.
            </p>
          </template>
          <InputField
            id="first_name"
            v-model="firstName"
            :error="errors['first_name']"
            placeholder="Geef een voornaam in"
            type="text"
            label="Voornaam"
          />
          <InputField
            id="last_name"
            v-model="lastName"
            :error="errors['last_name']"
            placeholder="Geef een familienaam in"
            type="text"
            label="Familienaam"
          />
        </Form>
        <Form
          title="Opmerking"
          class="p-3"
        >
          <template #description>
            <p class="mt-1 text-sm text-gray-600">
              Een opmerking bij de gebruiker.
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
          <div class="text-right">
            <SubmitButton
              class="bg-gray-900 text-white active:bg-gray-700 disabled:bg-gray-300"
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
      {{ user }}
    </PageSection>
  </div>
</template>

<script setup>
import { useField, useForm, useFormErrors } from 'vee-validate';
import { computed, watch } from 'vue';
import { useUserStore } from '/src/apps/admin/stores/userStore.js';
import PageSection from '/@theme/components/PageSection.vue';
import PageSectionTitle from '/@theme/components/PageSectionTitle.vue';
import Form from '/src/components/form/Form.vue';
import InputField from '/src/components/form/InputField.vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';
import TextArea from '/src/components/form/TextArea.vue';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';

const props = defineProps({
  uuid: {
    type: String,
    required: true
  }
});
const store = useUserStore();
store.get(props.uuid);

const user = computed(() => store.user);
watch(
  user,
  (nv) => {
    firstName.value = nv.first_name;
    lastName.value = nv.last_name;
    remark.value = nv.remark;
  }
);

const validationSchema = yup.object({});
const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {}
});

const { value: firstName } = useField('first_name');
const { value: lastName } = useField('last_name');
const { value: remark } = useField('remark');

const errors = useFormErrors();

const router = useRouter();
const route = useRoute();

const submitForm = handleSubmit(async(values) => {
  user.value.first_name = values.first_name;
  user.value.last_name = values.last_name;
  user.value.remark = values.remark;

  await store.save(user.value);

  if (route.meta.prev_route) {
    router.back();
  } else {
    await router.push({ name: 'admin.users' });
  }
});
</script>
