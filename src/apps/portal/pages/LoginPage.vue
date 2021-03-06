<template>
  <div>
    <div class="rounded-t mb-0 p-6">
      <div class="text-center mb-3">
        <h6 class="text-gray-600 text-2xl font-bold">
          Login
        </h6>
      </div>
      <hr class="mt-6 border-b-1 border-gray-400" />
    </div>
    <div class="flex-auto p-4 lg:px-10 pt-0">
      <form>
        <InputField
            :error="emailError"
            v-model="email"
            placeholder="Email"
            id="login_email"
            type="email"
            label="Email"
            left-icon="fas fa-envelope"
        />
        <InputField
            :error="passwordError"
            v-model="password"
            placeholder="Paswoord"
            id="login_password"
            type="password"
            label="Paswoord"
            left-icon="fas fa-key"
        />
        <div class="text-center mt-6">
          <SubmitButton
              class="bg-gray-900 text-white active:bg-gray-700 disabled:bg-gray-300"
              @click="submitForm"
              :disabled="isSubmitting"
          >
            <i class="fas fa-lock fa-fw"></i> Login
          </SubmitButton>
        </div>
      </form>
    </div>
    <div
        class="w-full p-4 pt-0"
        v-if="loginError"
    >
      <Alert
          type="danger"
          title="Inloggen mislukt"
      >
        Email onbekend of verkeerd paswoord.
      </Alert>
    </div>
  </div>
</template>

<script>
import SubmitButton from '/src/components/form/SubmitButton.vue';
import { useAbility } from '@casl/vue';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import InputField from '/src/components/form/InputField.vue';
import useAuthentication from '/src/common/useAuthentication.js';
import Alert from '/src/components/Alert.vue';

export default {
  components: {
    Alert,
    InputField,
    SubmitButton
  },
  setup() {
    const { handleSubmit, isSubmitting } = useForm();
    const authenticationService = useAuthentication();
    const loginError = ref(0);

    const router = useRouter();
    const route = useRoute();

    const submitForm = handleSubmit(async (values) => {
      loginError.value = 0;
      try {
        await authenticationService.login(values.email, values.password);
        // Redirect to back, when meta contains a back property
        if (route.meta?.back && route.meta.back.name !== route.name) {
          await router.push(route.meta.back);
        } else {
          await router.push({ name: 'home' });
        }

      } catch(error) {
        if (error.response) {
          if (error.response.status === 401) {
            loginError.value = 401;
          } else {
            throw error;
          }
        }
      }
    });

    const {
      value: email,
      errorMessage: emailError
    } = useField(
        'email',
        yup.string()
            .required('Dit is een verplicht veld')
            .email('Ongeldig emailadres')
    );

    const {
      value: password,
      errorMessage: passwordError
    } = useField(
        'password',
        yup.string().required('Dit is een verplicht veld')
    );

    const ability = useAbility();

    return {
      email,
      emailError,
      password,
      passwordError,
      submitForm,
      isSubmitting,
      loginError,
      ability
    }
  }
};
</script>
