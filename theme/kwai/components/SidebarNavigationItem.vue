<template>
  <router-link
    class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4 hover:cursor-pointer"
    :class="[active ? activeClass : inactiveClass]"
    :to="route"
  >
    {{ route.meta.title }}
  </router-link>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const activeClass = ref(
      'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
    );
    const inactiveClass = ref(
      'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
    );

    const router = useRouter();
    const active = computed(() => {
      return router.currentRoute.value.name === props.route.name;
    });

    return {
      activeClass,
      inactiveClass,
      active
    };
  }
};
</script>
