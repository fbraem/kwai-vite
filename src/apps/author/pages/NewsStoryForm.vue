<template>
  <div class="container mx-auto p-3">
    <Header v-if="id">
      Wijzig Nieuwsbericht
    </Header>
    <Header v-else>
      Maak Nieuwsbericht
    </Header>
    <div class="rounded bg-gray-300">
      <Form
        title="Nieuwsbericht"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Geef het nieuwsbericht een titel, samenvatting en tekst.
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
          id="summary"
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
            Koppel het nieuwsbericht aan een applicatie.
          </p>
        </template>
        <Select
          id="application"
          v-model="application"
          :error="errors['application']"
          :options="newsApplications"
        />
      </Form>
      <Form
        title="Publicatie"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-700">
            Wanneer moet het bericht gepubliceerd worden? Het bericht zal automatisch verdwijnen
            bij een eiddatum.
          </p>
        </template>
        <div class="flex flex-row justify-between w-full">
          <DatePicker
            id="publication_date"
            v-model="publicationDate"
            label="Start Publicatie"
            :error="errors['publicationDate']"
            :time="true"
            :placeholder="`Datum in formaat ${dateFormat}`"
          />
        </div>
        <div class="flex flex-row justify-between w-full">
          <DatePicker
            id="publication_end_date"
            v-model="publicationEndDate"
            label="Einde Publicatie"
            :error="errors['publicationEndDate']"
            :time="true"
            :placeholder="`Datum in formaat ${dateFormat}`"
          />
        </div>
      </Form>
      <Form
        title="Promotie"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Een nieuwsbericht kan op de startpagina geplaatst worden.
          </p>
        </template>
        <Range
          id="promotion_priority"
          v-model="promotionPriority"
          label="Prioriteit"
          :error="errors['promotionPriority']"
        />
        <div class="flex flex-row justify-between w-full">
          <DatePicker
            id="promotion_end_date"
            v-model="promotionEndDate"
            label="Einddatum"
            :error="errors['promotionEndDate']"
            :placeholder="`Datum in formaat ${dateFormat}`"
          />
        </div>
      </Form>
      <Form
        title=""
        class="p-3"
      >
        <CheckBox
          id="active"
          v-model="active"
          label="Actief"
          color="text-yellow-400"
        >
          <p class="text-gray-600">
            Zolang een bericht niet actief is, zal een bezoeker het niet te zijn krijgen.
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
      </Form>
    </div>
  </div>
</template>

<script>
import Header from '/@theme/components/Header.vue';
import Form from '/src/components/form/Form.vue';
import InputField from '/src/components/form/InputField.vue';
import TextArea from '/src/components/form/TextArea.vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';
import CheckBox from '/src/components/form/CheckBox.vue';
import Select from '/src/components/form/Select.vue';
import Range from '/src/components/form/Range.vue';
import DatePicker from '/src/components/form/DatePicker.vue';

import useApplications from '/src/apps/author/composables/useApplications.js';
import useNewsStory from '/src/apps/author/composables/useNewsStory.js';
import { useField, useForm, useFormErrors } from 'vee-validate';
import { computed, watch } from 'vue';
import * as yup from 'yup';
import dayjs from '/src/common/useDayJS.js';

yup.addMethod(yup.date, "format", function (format) {
  return this.transform(function(value, original) {
    if (original === '') return null;

    const d = dayjs(original, format, true);
    if (d.isValid()) {
      return d.toDate();
    }
    return original;
  });
});

export default {
  components: { DatePicker, Range, Select, CheckBox, SubmitButton, TextArea, InputField, Header, Form },
  props: {
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const { applications } = useApplications();
    const newsApplications = computed(() => {
      if (applications.value) {
        return applications.value
          .filter(application => application.has_news)
          .map(application => ({
            value: application.id,
            text: application.title
          }));
      }
      return [];
    });

    const { story, reload } = useNewsStory(props.id);
    watch(
      story,
      (nv) => {
        title.value = nv.title;
        summary.value = nv.summary;
        content.value = nv.content;
        active.value = nv.active;
        application.value = nv.application.id;
        promotionPriority.value = nv.promotion.priority;
        promotionEndDate.value = nv.promotion.end_date;
        promotionEndDate.value = nv.promotion.end_date
          ? nv.promotion.end_date.format('L HH:MM')
          : '';
        publicationDate.value = nv.publication.start_date
          ? nv.publication.start_date.format('L HH:MM')
          : '';
        publicationEndDate.value = nv.publication.end_date
          ? nv.publication.end_date.format('L HH:MM')
          : '';
      }
    );

    const dateFormat = dayjs().localeData().longDateFormat('L') + ' HH:mm';
    const validationSchema = yup.object({
      title: yup.string().required('Dit is een verplicht veld'),
      publicationDate: yup.date().format(dateFormat)
          .typeError(`Ongeldige datum (formaat ${dateFormat})`)
          .nullable(),
      publicationEndDate: yup.date().format(dateFormat)
          .typeError(`Ongeldige datum (formaat ${dateFormat})`)
          .nullable()
          .when('publicationDate', (publicationDate, schema) => {
            return schema.test(
                'date-after',
                'Datum moet na publicatiedatum vallen',
                (value) => {
                  if (publicationDate instanceof Date && value instanceof Date) {
                    return dayjs(value).isAfter(dayjs(publicationDate))
                  }
                  return true;
                }
            );
        }),
      promotionEndDate: yup.date().format(dateFormat)
          .typeError(`Ongeldige datum (formaat ${dateFormat})`)
          .nullable()
          .when('publicationDate', (publicationDate, schema) => {
            return schema.test(
                'date-after',
                'Datum moet na publicatiedatum vallen',
                (value) => {
                  if (publicationDate instanceof Date && value instanceof Date) {
                    return dayjs(value).isAfter(dayjs(publicationDate))
                  }
                  return true;
                }
            );
          })
    });
    const { handleSubmit, isSubmitting } = useForm({
      validationSchema
    });
    const submitForm = handleSubmit(async(values) => {
      console.log(values);
    });

    const { value: title } = useField('title');
    const { value: summary } = useField('summary');
    const { value: content } = useField('content');
    const { value: active } = useField('active');
    const { value: application } = useField('application');
    const { value: publicationDate } = useField('publicationDate');
    const { value: publicationEndDate } = useField('publicationEndDate');
    const { value: promotionPriority } = useField('promotionPriority');
    const { value: promotionEndDate } = useField('promotionEndDate');

    return {
      handleSubmit,
      isSubmitting,
      submitForm,
      title,
      summary,
      content,
      active,
      application,
      newsApplications,
      publicationDate,
      publicationEndDate,
      promotionPriority,
      promotionEndDate,
      errors: useFormErrors(),
      dateFormat
    };
  }
};
</script>
