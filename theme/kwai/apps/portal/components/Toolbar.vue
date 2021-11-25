<template>
  <MainToolbar class="bg-red-700">
    <p class="text-white text-md sm:text-2xl">
      {{ title }}
    </p>
    <div class="flex items-center space-x-2">
      <IconRoundLink
        v-if="facebook"
        :href="facebook"
        class="bg-white text-red-700"
        icon="fab fa-facebook"
      />
      <div class="relative">
        <IconRoundLink
          v-if="isLoggedIn"
          class="bg-white text-red-700"
          icon="fas fa-user"
          @click="dropdownOpen = !dropdownOpen"
        />
        <IconRoundLink
          v-else
          class="bg-white text-red-700"
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
import IconRoundLink from '/src/components/IconRoundLink.vue';
import { useAuthenticationStore } from '/src/stores/authenticationStore.js';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { website, contact } from '/@config';

export default {
  components: { IconRoundLink, MainToolbar },
  setup() {
    const authenticationStore = useAuthenticationStore();

    const dropdownOpen = ref(false);

    const router = useRouter();
    const gotoLogin = async() => {
      if (router.hasRoute('login')) {
        await router.push({ name: 'login' });
      } else {
        window.location.href = '/#/login';
      }
    };
    const logout = async() => {
      await authenticationStore.logout();
      if (router.hasRoute('portal.home')) {
        await router.push({ name: 'portal.home' });
      } else {
        window.location.href = '/';
      }
      dropdownOpen.value = false;
    };

    const isLoggedIn = computed(() => authenticationStore.isLoggedIn);

    return {
      dropdownOpen,
      isLoggedIn,
      logout,
      gotoLogin,
      title: website.title,
      facebook: contact.facebook
    };
  }
};
</script>
