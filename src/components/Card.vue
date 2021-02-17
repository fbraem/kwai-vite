<template>
  <div class="relative flex flex-col min-w-0 break-normal w-full mb-8 shadow-lg rounded-lg text-center">
    <div class="px-4 py-5 flex-auto">
      <div
          v-if="icon"
          class="p-3 inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full"
          :class="[ iconTextColor, iconBgColor ]"
      >
        <i :class="icon"></i>
      </div>
      <h6 class="text-xl font-semibold mb-2">{{ title }}</h6>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
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
}
</script>
