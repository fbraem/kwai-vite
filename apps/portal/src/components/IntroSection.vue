<template>
  <section>
    <div
      class="relative"
      style="height:600px;"
    >
      <div
        class="absolute w-full h-full bg-center xl:bg-top bg-cover"
        :style="{ 'background-image': 'url(' + heroImageUrl + ')' }"
      >
        <span class="w-full h-full absolute opacity-50 bg-gradient-to-br from-black to-red-600" />
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  heroImageUrl: string
}

defineProps<Props>();
</script>
