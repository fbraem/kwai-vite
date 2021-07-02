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
          :error="titleError"
          placeholder="titel"
          type="text"
          label="Titel"
        />
        <TextArea
          id="summary"
          v-model="summary"
          :error="summaryError"
          placeholder="Samenvatting"
          label="Samenvatting"
        />
        <TextArea
          id="summary"
          v-model="content"
          :error="contentError"
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
          :error="applicationError"
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
            label="Publicatiedatum"
            :error="publicationDateError"
          />
          <TimePicker
            id="publication_time"
            v-model="publicationTime"
            label="Tijdstip"
            :error="publicationTimeError"
          />
        </div>
        <DatePicker
          id="publication_end_date"
          v-model="publicationEndDate"
          label="Publicatie Einddatum"
          :error="publicationEndDateError"
        />
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
          :error="promotionPriorityError"
        />
        <DatePicker
          id="promotion_end_date"
          v-model="promotionEndDate"
          label="Einddatum"
          :error="promotionEndDateError"
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
import TimePicker from '/src/components/form/TimePicker.vue';

import useApplications from '/src/apps/author/composables/useApplications.js';
import useNewsStory from '/src/apps/author/composables/useNewsStory.js';
import { useField, useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { formatDate } from '/src/common/useDayJS.js';

export default {
  components: { TimePicker, DatePicker, Range, Select, CheckBox, SubmitButton, TextArea, InputField, Header, Form },
  props: {
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const { handleSubmit, isSubmitting } = useForm();
    const submitForm = handleSubmit(async(values) => {
    });

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
          ? formatDate(nv.promotion.end_date, 'L')
          : '';
        publicationDate.value = nv.publication.start_date
          ? formatDate(nv.publication.start_date, 'L')
          : '';
        publicationTime.value = nv.publication.start_date
          ? formatDate(nv.publication.start_date, 'HH:MM')
          : '';
        publicationEndDate.value = nv.publication.end_date
          ? formatDate(nv.publication.end_date, 'L')
          : '';
      }
    );

    const {
      value: title,
      errorMessage: titleError
    } = useField('title');

    const {
      value: summary,
      errorMessage: summaryError
    } = useField('summary');

    const {
      value: content,
      errorMessage: contentError
    } = useField('content');

    const {
      value: active,
      errorMessage: activeError
    } = useField('active');

    const {
      value: application,
      errorMessage: applicationError
    } = useField('application');

    const {
      value: publicationDate,
      errorMessage: publicationDateError
    } = useField('publication_date');

    const {
      value: publicationTime,
      errorMessage: publicationTimeError
    } = useField('publication_time');

    const {
      value: publicationEndDate,
      errorMessage: publicationEndDateError
    } = useField('publication_enddate');

    const {
      value: promotionPriority,
      errorMessage: promotionPriorityError
    } = useField('promotion_priority');

    const {
      value: promotionEndDate,
      errorMessage: promotionEndDateError
    } = useField('promotion_end_date');

    return {
      handleSubmit,
      isSubmitting,
      submitForm,
      title,
      titleError,
      summary,
      summaryError,
      content,
      contentError,
      active,
      activeError,
      application,
      applicationError,
      newsApplications,
      publicationDate,
      publicationDateError,
      publicationTime,
      publicationTimeError,
      publicationEndDate,
      publicationEndDateError,
      promotionPriority,
      promotionPriorityError,
      promotionEndDate,
      promotionEndDateError
    };
  }
};
</script>
