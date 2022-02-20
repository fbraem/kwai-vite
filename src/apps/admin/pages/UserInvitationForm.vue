<template>
  <div>
    <PageSectionTitle>
      <PageSectionHeader>
        {{ $route.meta.title }}
      </PageSectionHeader>
    </PageSectionTitle>
    <PageSection>
      <div class="rounded bg-gray-300">
        <Form
          title="Gebruiker"
          class="p-3"
        >
          <template #description>
            <p class="mt-1 text-sm text-gray-600">
              Geef de naam en het email adres van de gebruiker in.
            </p>
          </template>
          <InputField
            id="name"
            v-model="name"
            :error="errors['name']"
            placeholder="Geef een naam in"
            type="text"
            label="Naam"
          />
          <InputField
            id="email"
            v-model="email"
            :error="errors['email']"
            placeholder="Geef een email adres in"
            type="email"
            label="Email"
          />
        </Form>
        <Form
          title="Uitnodiging"
          class="p-3"
        >
          <template #description>
            <p class="mt-1 text-sm text-gray-600">
              Tekst die opgenomen wordt in de uitnodiging.
            </p>
          </template>
          <TextArea
            id="remark"
            v-model="remark"
            :error="errors['remark']"
            placeholder="Uitnodiging"
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
    </PageSection>
  </div>
</template>

<script setup>
import { useField, useForm, useFormErrors } from 'vee-validate';
import PageSection from '/@theme/components/PageSection.vue';
import PageSectionHeader from '/@theme/components/PageSectionHeader.vue';
import PageSectionTitle from '/@theme/components/PageSectionTitle.vue';
import Form from '/src/components/form/Form.vue';
import InputField from '/src/components/form/InputField.vue';
import TextArea from '/src/components/form/TextArea.vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import { useUserInvitationStore } from '/src/apps/admin/stores/userInvitationStore.js';

const props = defineProps({
  id: {
    type: String,
    default: null
  }
});
const store = useUserInvitationStore();
if (props.id) {
  store.get(props.id);
}

const invitation = ref({});
watch(
  invitation,
  (nv) => {
    name.value = nv.name;
    email.value = nv.email;
    remark.value = nv.remark;
  }
);

const validationSchema = yup.object({
  name: yup.string()
    .required('Dit is een verplicht veld'),
  email: yup.string()
    .required('Dit is een verplicht veld')
    .email('Ongeldig emailadres')
});
const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {}
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: remark } = useField('remark');

const errors = useFormErrors();
const router = useRouter();
const route = useRoute();

const submitForm = handleSubmit(async(values) => {
  invitation.value.name = values.name;
  invitation.value.email = values.email;
  invitation.value.remark = values.remark;

  await store.save(invitation.value);

  if (route.meta.prev_route) {
    router.back();
  } else {
    await router.push({ name: 'admin.users_invitations' });
  }
});
</script>
