<template>
  <div>
    <img
      src="/assets/portal/logo2.png"
      class="w-24 mx-auto"
      alt="logo"
    >
    <p class="mt-4 text-md lg:text-xl text-gray-100">
      {{ text }}
    </p>
  </div>
</template>

<script>
import { website } from '/@config';

export default {
  setup() {
    return {
      title: website.title,
      text: website.hero
    };
  }
};
</script>
