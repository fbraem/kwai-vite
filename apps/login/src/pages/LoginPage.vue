<template>
  <InformationDialog>
    <template #information>
      <div class="flex flex-row sm:flex-col items-center">
        <div class="w-16 mr-2 sm:mb-4">
          <img
            :src="logoUrl"
            alt="logo"
          >
        </div>
        <h1 class="text-white text-2xl sm:text-center font-bold uppercase">
          {{ config.website.title }}
        </h1>
      </div>
      <p class="text-gray-300 my-6">
        {{ t('login.description.intro') }}
      </p>
      <p class="text-gray-300">
        {{ t('login.description.text') }}
      </p>
    </template>
    <div class="mb-6">
      <div class="mb-3">
        <h6 class="text-gray-900 text-2xl font-bold">
          {{ t('login.title') }}
        </h6>
        <p class="text-sm text-gray-500">
          {{ t('login.need_account') }}
          <a
            class="text-blue-400 font-medium"
            href="#"
          >
            {{ t('login.contact_us') }}
          </a>
        </p>
      </div>
    </div>
    <form class="flex-auto">
      <InputField
        name="email"
        :placeholder="t('login.form.email.placeholder')"
        class="mb-6"
        :required="true"
      >
        <template #label>
          {{ t('login.form.email.label') }}
        </template>
      </InputField>
      <InputField
        name="password"
        type="password"
        :placeholder="t('login.form.password.placeholder')"
        :required="true"
      >
        <template #label>
          {{ t('login.form.password.label') }}
        </template>
      </InputField>
      <p class="text-right text-sm mt-1">
        <router-link
          class="text-blue-400"
          to="recover"
        >
          {{ t('login.forgotten') }}
        </router-link>
      </p>
      <ErrorAlert v-if="errorMessage">
        <div class="text-sm">
          {{ errorMessage }}
        </div>
      </ErrorAlert>
      <div class="flex flex-col items-end mt-6">
        <Button
          id="submit"
          class="bg-gray-700 text-white focus:bg-gray-900 z-20"
          @click="onSubmitForm"
        >
          {{ t('login.form.submit.label') }}
        </Button>
      </div>
    </form>
    <p class="mt-12 mb-3 text-center text-xs text-gray-500">
      &copy; {{ config.website.copyright }}
    </p>
  </InformationDialog>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-absolute-path
import logoUrl from '/logo.png';

import config from '@kwai/config';
import { InputField, Button, ErrorAlert, InformationDialog } from '@kwai/ui';
import { useForm } from 'vee-validate';
import { useHttpLogin } from '@kwai/api';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

function isRequired(value: string): string|boolean {
  if (value && value.trim()) {
    return true;
  }
  return t('login.required');
}

function isEmail(value: string): string|boolean {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return t('login.invalid_email');
  }
  return true;
}

const { handleSubmit } = useForm({
  validationSchema: {
    email: [isRequired, isEmail],
    password: isRequired
  }
});

const errorMessage: Ref<string|null> = ref(null);
const onSubmitForm = handleSubmit(async values => {
  errorMessage.value = null;
  const formData = {
    username: values.email,
    password: values.password
  };
  await useHttpLogin(formData).catch(error => {
    if (error.response.status === 401) {
      errorMessage.value = t('login.failed');
    }
  });
});
</script>
