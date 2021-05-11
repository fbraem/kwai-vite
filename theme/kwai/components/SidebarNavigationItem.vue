<template>
  <router-link
    v-slot="{ href, navigate, isExactActive, route }"
    custom
    :to="{ name: routeName }"
  >
    <a
      :href="href"
      class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4 hover:cursor-pointer"
      :class="[isExactActive ? activeClass : inactiveClass]"
      @click="navigate"
    >
      {{ route.meta.title ?? 'meta.title missing' }}
    </a>
  </router-link>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    routeName: {
      type: String,
      required: true
    }
  },
  setup() {
    const activeClass = ref(
      'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
    );
    const inactiveClass = ref(
      'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
    );

    return {
      activeClass,
      inactiveClass
    };
  }
};
</script>
