<template>
  <router-link
    v-slot="{ route }"
    :to="{ name: routeName }"
    exact-active-class="bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100 border-white"
    class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
    @click="up()"
  >
    {{ route.meta.title ?? 'meta.title missing' }}
  </router-link>
</template>

<script>

export default {
  props: {
    routeName: {
      type: String,
      required: true
    }
  },
  setup() {
    const up = () => {
      const top = document.querySelector('#main');
      if (top) {
        top.scrollTo(0, 0);
      }
    };

    return {
      up
    };
  }
};
</script>
