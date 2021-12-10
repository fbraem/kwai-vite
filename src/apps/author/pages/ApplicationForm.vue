<template>
  <div class="container mx-auto p-3">
    <Header v-if="id">
      Wijzig Applicatie
    </Header>
    <Header v-else>
      Nieuwe Applicatie
    </Header>
    <Form
      title="Applicatie"
      class="p-3 rounded-lg bg-gray-300"
    >
      <template #description>
        <p class="mt-1 text-sm text-gray-600">
          Een applicatie is een onderdeel van de website.
        </p>
      </template>
      <InputField
        id="title"
        v-model="title"
        :error="titleError"
        placeholder="Titel"
        type="text"
        label="Titel"
      />
      <TextArea
        id="short_description"
        v-model="shortDescription"
        :error="shortDescriptionError"
        placeholder="Korte Omschrijving"
        label="Korte Omschrijving"
      />
      <TextArea
        id="long_description"
        v-model="longDescription"
        :error="longDescriptionError"
        placeholder="Omschrijving"
        label="Omschrijving"
      />
      <div class="text-right">
        <SubmitButton
          class="bg-yellow-300 text-black active:bg-gray-700 disabled:bg-gray-300"
          :disabled="isSubmitting"
          @click="submitForm"
        >
          <i class="fas fa-save fa-fw" /> Bewaar
        </SubmitButton>
      </div>
    </Form>
  </div>
</template>

<script>
import Header from '/@theme/components/Header.vue';
import Form from '/src/components/form/Form.vue';
import InputField from '/src/components/form/InputField.vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';
import TextArea from '/src/components/form/TextArea.vue';
import { useField, useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import { useApplicationStore } from '/src/apps/author/stores/applicationStore.js';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: { TextArea, SubmitButton, InputField, Header, Form },
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    }
  },
  setup(props) {
    const store = useApplicationStore();
    if (props.id) {
      store.get(props.id);
    }

    const application = ref({});
    watch(
      () => store.application,
      (nv) => {
        application.value = nv;
        title.value = nv.title;
        shortDescription.value = nv.short_description;
        longDescription.value = nv.description;
      }
    );

    const router = useRouter();
    const route = useRoute();

    const { handleSubmit, isSubmitting } = useForm();
    const submitForm = handleSubmit(async(values) => {
      application.value.title = values.title;
      application.value.description = values.longDescription;
      application.value.short_description = values.shortDescription;

      await store.save(application.value);

      if (route.meta.prev_route) {
        router.back();
      } else {
        await router.push({ name: 'author.applications' });
      }
    });

    const {
      value: title,
      errorMessage: titleError
    } = useField('title');

    const {
      value: shortDescription,
      errorMessage: shortDescriptionError
    } = useField('shortDescription');

    const {
      value: longDescription,
      errorMessage: longDescriptionError
    } = useField('longDescription');

    return {
      submitForm,
      isSubmitting,
      title,
      titleError,
      shortDescription,
      shortDescriptionError,
      longDescription,
      longDescriptionError,
      application
    };
  }
};
</script>
