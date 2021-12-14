<template>
  <div class="px-4 mx-auto">
    <h3 class="text-center text-3xl mb-2 font-semibold leading-normal">
      {{ title }}
    </h3>
    <div class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
      <div v-html="text" />
    </div>
  </div>
</template>

<script>
import { website } from '/@config';

export default {
  setup() {
    return {
      title: website.promotion.title,
      text: website.promotion.text
    };
  }
};
</script>
