<template>
  <div>
    <div class="relative min-h-3/4 sm:min-h-1/2 flex items-center">
      <div
        class="absolute top-0 w-full h-full bg-center md:bg-top bg-cover"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <span class="w-full h-full absolute opacity-50 bg-black" />
      </div>
      <div class="container relative mx-auto">
        <div class="items-center flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <slot name="title" />
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    }
  }
};
</script>
