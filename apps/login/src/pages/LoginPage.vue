<template>
  <div class="flex flex-col min-w-max break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
    <div class="rounded-t mb-0 p-6">
      <div class="text-center mb-3">
        <h6 class="text-gray-600 text-2xl font-bold">
          Login
        </h6>
      </div>
      <hr class="mt-6 border-b-1 border-gray-400">
    </div>
    <form
        class="flex-auto p-4 lg:px-10 pt-0"
        @submit="onSubmitForm"
    >
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
          class="mb-6"
          :required="true"
      >
        <template #label>Paswoord</template>
      </InputField>
      <div class="text-center">
        <SubmitButton
            id="submit"
            class="bg-gray-900 text-white focus:bg-gray-900 active:bg-gray-700 w-full"
        >
          Login
        </SubmitButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { InputField, SubmitButton } from '@kwai/ui'
import { useForm } from "vee-validate"

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

const onSubmitForm = handleSubmit(values => {
  console.log(values)
})
</script>
