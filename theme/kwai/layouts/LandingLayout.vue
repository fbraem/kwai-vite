<template>
  <div>
    <main>
      <div
          class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-1/2"
          :class="{ 'md:min-h-3/4': big }"
      >
        <div
            class="absolute top-0 w-full h-full bg-center md:bg-top bg-cover"
            :style="{ 'background-image': 'url(' + image + ')' }"
        >
          <span class="w-full h-full absolute opacity-60 bg-black"></span>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <slot name="title"></slot>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String
    },
    big: {
      type: Boolean,
      default: false
    }
  }
}
</script>
