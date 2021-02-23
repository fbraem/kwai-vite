<template>
  <div>
    <main>
      <section class="relative block" style="height: 500px;">
        <div
            class="absolute top-0 w-full h-full bg-center bg-cover"
            :style="{ 'background-image': 'url(' + image + ')' }"
        >
          <span
              id="blackOverlay"
              class="w-full h-full absolute opacity-60 bg-black"
          ></span>
        </div>
      </section>
      <AngledSection bg-color="bg-gray-300" text-color="text-gray-300">
      </AngledSection>
      <section class="relative py-16 bg-gray-300">
        <div class="container mx-auto px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <slot></slot>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
</style>

<script>
import AngledSection from '/src/components/AngledSection.vue';
export default {
  components: { AngledSection },
  props: {
    image: {
      type: String
    }
  }
}
</script>
