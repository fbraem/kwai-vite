<template>
  <div>
    <main>
      <section class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-1/2">
        <div
            class="absolute top-0 w-full h-full bg-center bg-cover"
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
      </section>
      <section class="relative py-32 bg-gray-300">
        <div class="container mx-auto px-4 md:max-w-2xl lg:max-w-6xl">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div class="px-6">
              <slot></slot>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  props: {
    image: {
      type: String
    }
  }
}
</script>
