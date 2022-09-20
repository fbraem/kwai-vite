<template>
  <InformationDialog>
    <template #information>
      <div class="flex flex-row sm:flex-col items-center">
        <div class="w-16 mr-2 sm:mb-4">
          <img src="logo.png" />
        </div>
        <h1 class="text-white text-2xl sm:text-center font-bold uppercase">
          {{ config.website.title }}
        </h1>
      </div>
      <p class="text-gray-300 my-6">
        A club account is available for members of the board and coaches.
      </p>
      <p class="text-gray-300">
        Depending on the role in the club you will be able to manage several parts of the club.
        Such as adding news, writing content, add trainings, etc.
      </p>
    </template>
    <div class="mb-6">
      <div class="mb-3">
        <h6 class="text-gray-900 text-2xl font-bold">
          {{ t('login.title') }}
        </h6>
        <p class="text-sm text-gray-500">
          Need an account? <a class="text-blue-400 font-medium" href="#">Contact us</a>
        </p>
      </div>
    </div>
    <form class="flex-auto">
      <InputField
          name="email"
          placeholder="Geef uw email adres in"
          class="mb-6"
          :required="true"
      >
        <template #label>Email</template>
      </InputField>
      <InputField
          name="password"
          type="password"
          placeholder="Geef uw paswoord in"
          :required="true"
      >
        <template #label>Paswoord</template>
      </InputField>
      <p class="text-right text-sm mt-1">
        <a
            class="text-blue-400"
            href="#"
        >
          Forgot password?
        </a>
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
            Login
          </Button>
      </div>
    </form>
    <p class="mt-12 mb-3 text-center text-xs text-gray-500">
      &copy; {{ config.website.copyright }}
    </p>
  </InformationDialog>
</template>

<script setup lang="ts">
import config from "@root/config.toml"
import { InputField, Button, ErrorAlert, InformationDialog } from "@kwai/ui"
import { useForm } from "vee-validate"
import { useHttpLogin } from "@kwai/api"
import { ref } from "vue"
import type { Ref } from "vue"
import { useI18n } from "vue-i18n"

function isRequired(value: string): string|boolean {
  if (value && value.trim()) {
    return true
  }
  return 'Dit is een verplicht veld'
}

function isEmail(value: string): string|boolean {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'Dit is geen geldig emailadres'
  }
  return true
}

const { handleSubmit } = useForm({
  validationSchema: {
    email: [ isRequired, isEmail ],
    password: isRequired
  }
})

const errorMessage: Ref<string|null> = ref(null)
const onSubmitForm = handleSubmit(async values => {
  errorMessage.value = null
  const formData = {
    username: values.email,
    password: values.password
  }
  await useHttpLogin(formData).catch(error => {
    if (error.response.status == 401) {
      errorMessage.value = 'Login failed. Check your email and/or password.'
    }
  });
})

const { t } = useI18n({ useScope: 'global' })
</script>
