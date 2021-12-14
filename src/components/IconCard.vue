<template>
  <div class="relative grid grid-columns-1 gap-4 min-w-0 break-normal shadow-lg rounded-lg text-center">
    <div
      v-if="icon"
      class="p-3 justify-self-center w-12 h-12 shadow-lg rounded-full"
      :class="[ iconTextColor, iconBgColor ]"
    >
      <i :class="icon" />
    </div>
    <h6 class="text-xl font-semibold mb-2">
      {{ title }}
    </h6>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    iconTextColor: {
      type: String,
      default: 'text-white'
    },
    iconBgColor: {
      type: String,
      default: 'bg-red-400'
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>
