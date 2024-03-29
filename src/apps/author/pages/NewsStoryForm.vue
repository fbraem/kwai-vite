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
            bij een einddatum.
          </p>
        </template>
        <div class="flex flex-row justify-between">
          <DatePicker
            id="publication_date"
            v-model="publicationDate"
            label="Start Publicatie"
            :error="errors['publicationDate']"
            :time="true"
            :placeholder="`Datum in formaat ${dateFormat}`"
          />
        </div>
        <div class="flex flex-row justify-between">
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
        <div class="flex flex-row justify-between">
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
        title="Opmerking"
        class="p-3"
      >
        <template #description>
          <p class="mt-1 text-sm text-gray-600">
            Een opmerking voor dit nieuwsbericht. Een opmerking is niet
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

import { useField, useForm, useFormErrors } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import dayjs from '/src/common/useDayJS.js';
import { useApplicationStore } from '/src/apps/author/stores/applicationStore.js';
import { useNewsStore } from '/src/apps/author/stores/newsStore.js';

yup.addMethod(yup.date, 'format', function(format) {
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
    const applicationStore = useApplicationStore();
    applicationStore.load();
    const newsApplications = computed(() => applicationStore.newsApplications);

    const dateFormat = dayjs().localeData().longDateFormat('L') + ' HH:mm';

    const store = useNewsStore();
    if (props.id) {
      store.get(props.id);
    }
    const story = ref({});
    watch(
      () => store.story,
      (nv) => {
        story.value = nv;
        title.value = nv.title;
        summary.value = nv.summary;
        content.value = nv.content;
        enabled.value = nv.enabled;
        application.value = nv.application.id;
        promotionPriority.value = nv.promotion.priority;
        promotionEndDate.value = nv.promotion.end_date;
        promotionEndDate.value = nv.promotion.end_date
          ? nv.promotion.end_date.format(dateFormat)
          : '';
        publicationDate.value = nv.publication.start_date
          ? nv.publication.start_date.format(dateFormat)
          : '';
        publicationEndDate.value = nv.publication.end_date
          ? nv.publication.end_date.format(dateFormat)
          : '';
        remark.value = nv.remark;
      }
    );

    const validationSchema = yup.object({
      title: yup.string().required('Dit is een verplicht veld'),
      summary: yup.string().required('Dit is een verplicht veld'),
      application: yup.number().required('Dit is een verplicht veld'),
      publicationDate: yup.date().format(dateFormat)
        .typeError(`Ongeldige datum (formaat ${dateFormat})`)
        .required('Dit is een verplicht veld'),
      publicationEndDate: yup.date().format(dateFormat)
        .typeError(`Ongeldige datum (formaat ${dateFormat})`)
        .nullable()
        .when('publicationDate', (publicationDate, schema) => {
          return schema.test(
            'date-after',
            'Datum moet na publicatiedatum vallen',
            (value) => {
              if (publicationDate instanceof Date && value instanceof Date) {
                return dayjs(value).isAfter(dayjs(publicationDate));
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
                return dayjs(value).isAfter(dayjs(publicationDate));
              }
              return true;
            }
          );
        })
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
      story.value.enabled = values.enabled === true;
      story.value.promotion = {
        priority: values.promotionPriority,
        end_date: values.promotionEndDate?.length ? dayjs(values.promotionEndDate, dateFormat) : null
      };
      story.value.publication = {
        start_date: values.publicationDate?.length ? dayjs(values.publicationDate, dateFormat) : null,
        end_date: values.publicationEndDate?.length ? dayjs(values.publicationEndDate, dateFormat) : null
      };
      story.value.remark = values.remark;
      story.value.title = values.title;
      story.value.content = values.content;
      story.value.summary = values.summary;
      story.value.application = {
        id: values.application
      };

      await store.save(story.value);

      if (route.meta.prev_route) {
        router.back();
      } else {
        await router.push({ name: 'author.news' });
      }
    });

    const { value: title } = useField('title');
    const { value: summary } = useField('summary');
    const { value: content } = useField('content');
    const { value: enabled } = useField('enabled');
    const { value: application } = useField('application');
    const { value: publicationDate } = useField('publicationDate');
    const { value: publicationEndDate } = useField('publicationEndDate');
    const { value: promotionPriority } = useField('promotionPriority');
    const { value: promotionEndDate } = useField('promotionEndDate');
    const { value: remark } = useField('remark');

    return {
      handleSubmit,
      isSubmitting,
      submitForm,
      title,
      summary,
      content,
      enabled,
      application,
      newsApplications,
      publicationDate,
      publicationEndDate,
      promotionPriority,
      promotionEndDate,
      remark,
      errors: useFormErrors(),
      dateFormat
    };
  }
};
</script>
