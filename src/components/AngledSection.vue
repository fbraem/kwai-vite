<template>
  <section
      class="relative pb-20"
      :class="bgColor"
  >
    <div
        class="top-0 bottom-auto left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style="height: 80px;"
    >
      <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
      >
        <polygon
            :class="textColor"
            class="fill-current"
            points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>
    <div class="container mx-auto px-4">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    textColor: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      required: true
    }
  }
}
</script>
