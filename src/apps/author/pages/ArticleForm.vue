<template>
  <div class="container mx-auto p-3">
    <Header v-if="id">
      Wijzig Artikel
    </Header>
    <Header v-else>
      Nieuw Artikel
    </Header>
    <div class="rounded bg-gray-300">
      <Form
        title="Artikel"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Geef het artikel een titel, samenvatting en tekst.
          </p>
        </template>
        <InputField
          id="title"
          v-model="title"
          :error="errors['title']"
          placeholder="titel"
          type="text"
          label="Titel"
        />
        <TextArea
          id="summary"
          v-model="summary"
          :error="errors['summary']"
          placeholder="Samenvatting"
          label="Samenvatting"
        />
        <TextArea
          id="content"
          v-model="content"
          :error="errors['content']"
          placeholder="Tekst"
          label="Tekst"
        />
      </Form>
      <Form
        title="Applicatie"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Koppel het artikel aan een applicatie.
          </p>
        </template>
        <Select
          id="application"
          v-model="application"
          :error="errors['application']"
          :options="articleApplications"
        />
      </Form>
      <Form
        title="Opmerking"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Een opmerking voor dit artikel. Een opmerking is niet
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
          id="enabled"
          v-model="enabled"
          label="Actief"
          color="text-yellow-400"
        >
          <p class="text-gray-600">
            Zolang een artikel niet actief is, zal een bezoeker het niet te zijn krijgen.
          </p>
        </CheckBox>
        <div class="text-right">
          <SubmitButton
            class="bg-yellow-300 text-black active:bg-gray-700 disabled:bg-gray-300"
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
  </div>
</template>

<style scoped>
</style>

<script>
import Header from '/@theme/components/Header.vue';
import Form from '/src/components/form/Form.vue';
import InputField from '/src/components/form/InputField.vue';
import TextArea from '/src/components/form/TextArea.vue';
import Select from '/src/components/form/Select.vue';
import CheckBox from '/src/components/form/CheckBox.vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';
import { useField, useForm, useFormErrors } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import dayjs from '/src/common/useDayJS.js';
import { useArticleStore } from '/src/apps/author/stores/articleStore.js';
import { useApplicationStore } from '/src/apps/author/stores/applicationStore.js';

export default {
  components: { Header, Form, InputField, TextArea, Select, CheckBox, SubmitButton },
  props: {
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const applicationStore = useApplicationStore();
    applicationStore.load();
    const articleApplications = computed(() => applicationStore.articleApplications);

    const dateFormat = dayjs().localeData().longDateFormat('L') + ' HH:mm';

    const store = useArticleStore();
    if (props.id) {
      store.get(props.id);
    }
    const article = ref({});
    watch(
      () => store.article,
      (nv) => {
        article.value = nv;
        title.value = nv.title;
        summary.value = nv.summary;
        content.value = nv.content;
        enabled.value = nv.enabled;
        application.value = nv.application.id;
        remark.value = nv.remark;
      }
    );

    const validationSchema = yup.object({
      title: yup.string().required('Dit is een verplicht veld'),
      summary: yup.string().required('Dit is een verplicht veld'),
      content: yup.string().required('Dit is een verplicht veld')
    });

    const { handleSubmit, isSubmitting } = useForm({
      validationSchema,
      initialValues: {
        publicationDate: dayjs().format(dateFormat)
      }
    });

    const router = useRouter();
    const route = useRoute();

    const submitForm = handleSubmit(async(values) => {
      article.value.enabled = values.enabled === true;
      article.value.remark = values.remark;
      article.value.title = values.title;
      article.value.content = values.content;
      article.value.summary = values.summary;
      article.value.application = {
        id: values.application
      };

      await store.save(article.value);

      if (route.meta.prev_route) {
        router.back();
      } else {
        await router.push({ name: 'author.articles' });
      }
    });

    const { value: title } = useField('title');
    const { value: summary } = useField('summary');
    const { value: content } = useField('content');
    const { value: enabled } = useField('enabled');
    const { value: application } = useField('application');
    const { value: remark } = useField('remark');

    return {
      articleApplications,
      handleSubmit,
      isSubmitting,
      submitForm,
      title,
      summary,
      content,
      application,
      enabled,
      remark,
      errors: useFormErrors()
    };
  }
};
</script>
