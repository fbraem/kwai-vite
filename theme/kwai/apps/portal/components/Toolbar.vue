<template>
  <MainToolbar class="bg-red-700">
    <p class="text-white text-md sm:text-2xl">{{ title }}</p>
    <div class="flex items-center space-x-2">
      <button class="block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none bg-white text-red-700">
        <i class="fab fa-facebook" />
      </button>
      <div class="relative">
        <button
          v-if="isLoggedIn"
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none bg-white text-red-700"
          @click="dropdownOpen = !dropdownOpen"
        >
          <i class="fas fa-user" />
        </button>
        <button
          v-else
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none bg-white text-red-700"
          @click="gotoLogin()"
        >
          <i class="fas fa-lock" />
        </button>
        <div
          v-show="dropdownOpen"
          class="fixed inset-0 h-full w-full z-10"
          @click="dropdownOpen = false"
        />
        <div
          v-show="dropdownOpen"
          class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
        >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-700 hover:text-white hover:cursor-pointer"
          >Profiel</a>
          <a
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-700 hover:text-white hover:cursor-pointer"
            @click="logout"
          >Log out</a>
        </div>
      </div>
    </div>
  </MainToolbar>
</template>

<script>
import MainToolbar from '/src/components/sidebar/Toolbar.vue';
import useAuthentication from '/src/common/useAuthentication.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { website } from '/@config';

export default {
  components: { MainToolbar },
  setup() {
    const dropdownOpen = ref(false);

    const { isLoggedIn, logout: doLogout } = useAuthentication();

    const router = useRouter();
    const gotoLogin = async() => {
      if (router.hasRoute('login')) {
        await router.push({ name: 'login' });
      } else {
        window.location.href = '/#/login';
      }
    };
    const logout = async() => {
      await doLogout();
      if (router.hasRoute('portal.home')) {
        await router.push({ name: 'portal.home' });
      } else {
        window.location.href = '/';
      }
      dropdownOpen.value = false;
    };

    return {
      dropdownOpen,
      isLoggedIn,
      logout,
      gotoLogin,
      title: website.title
    };
  }
};
</script>
