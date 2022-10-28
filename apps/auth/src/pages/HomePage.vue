<template>
  <div class="flex-grow">
    <div class="mb-6">
      <h6 class="text-gray-900 text-2xl font-bold">
        {{ t('home.title') }}
      </h6>
      <p class="text-sm text-gray-500">
        {{ t('home.problem') }}
        <a
          class="text-blue-400 font-medium"
          href="#"
        >
          {{ t('home.contact_us') }}
        </a>
      </p>
    </div>
    <div>
      <h2 class="text-2xl text-gray-800 mb-3">
        Welke actie wil je uitvoeren?
      </h2>
      <ul>
        <li v-if="isLoggedIn">
          <a
            class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:cursor-pointer"
            @click="logout"
          >
            <div class="font-semibold">Uitloggen</div>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Je wil niet meer actief zijn op onze website.
            </span>
          </a>
        </li>
        <li v-else>
          <router-link
            :to="{ name: 'login' }"
            class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            <div class="font-semibold">
              Inloggen
            </div>
            <span class="text-sm font-light text-gray-500 dark:text-gray-400">
              Je wil inloggen op onze website.
            </span>
          </router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link
            :to="{ name: 'reset' }"
            class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div class="font-semibold">
              Paswoord wijzigen
            </div>
            <span class="text-sm font-light text-gray-500 dark:text-gray-400">
              Je wilt uw paswoord wijzigen?
            </span>
          </router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link
            :to="{ name: 'recover' }"
            class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div class="font-semibold">
              Paswoord vergeten?
            </div>
            <span class="text-sm font-light text-gray-500 dark:text-gray-400">
              Je bent uw paswoord vergeten? Met een code kan je het paswoord wijzigen.
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isLoggedIn, useHttpLogout } from '@kwai/api';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

const logout = () => {
  useHttpLogout();
};
</script>
