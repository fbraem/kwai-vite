<template>
  <Toolbar class="bg-yellow-500">
    <div class="ml-3 text-md sm:text-2xl">
      Coach
    </div>
    <div class="flex items-center space-x-2">
      <div class="relative">
        <IconRoundLink
          v-if="isLoggedIn"
          class="bg-black text-yellow-500"
          icon="fas fa-user"
          @click="dropdownOpen = !dropdownOpen"
        />
        <IconRoundLink
          v-else
          class="bg-black text-yellow-500"
          icon="fas fa-lock"
          @click="gotoLogin()"
        />
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
            class="block px-4 py-2 text-sm text-gray-500 hover:bg-yellow-500 hover:text-black hover:cursor-pointer"
          >Profiel</a>
          <a
            class="block px-4 py-2 text-sm text-gray-500 hover:bg-yellow-500 hover:text-black hover:cursor-pointer"
            @click="logout"
          >Log out</a>
        </div>
      </div>
    </div>
  </Toolbar>
</template>

<script>
import Toolbar from '/src/components/sidebar/Toolbar.vue';
import IconRoundLink from '/src/components/IconRoundLink.vue';
import useAuthentication from '/src/common/useAuthentication.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { IconRoundLink, Toolbar },
  setup() {
    const dropdownOpen = ref(false);

    const { isLoggedIn, logout: doLogout } = useAuthentication();

    const router = useRouter();

    const gotoLogin = async() => {
      await router.push({ name: 'login' });
    };
    const logout = async() => {
      await doLogout();
      await router.push({ name: 'coach.home' });
      dropdownOpen.value = false;
    };

    return {
      isLoggedIn,
      gotoLogin,
      logout,
      dropdownOpen
    };
  }
};
</script>
