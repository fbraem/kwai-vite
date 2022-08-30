<template>
  <div class="grid grid-cols-5 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
    <div class="flex flex-col col-span-3 pt-12 px-24">
      <div class="mb-6">
        <div class="mb-3">
          <h6 class="text-gray-900 text-2xl font-bold">
            Login into your club
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
        &copy; Judokwai Kemzeke. All rights reserved
      </p>
    </div>
    <div class="bg-red-700 col-span-2 rounded-r-lg p-12">
      <div class="flex items-center">
        <div class="w-32">
          <img src="logo.png" />
        </div>
        <h1 class="text-white text-3xl font-bold text-center uppercase">
          Judokwai Kemzeke
        </h1>
      </div>
      <p class="text-gray-300 my-6">
        A club account is available for members of the board and coaches.
      </p>
      <p class="text-gray-300">
        Depending on the role in the club you will be able to manage several parts of the club.
        Such as adding news, writing content, add trainings, etc.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputField, Button } from '@kwai/ui'
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
