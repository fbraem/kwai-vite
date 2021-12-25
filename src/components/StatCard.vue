<template>
  <div class="flex items-center px-5 py-6 shadow-md rounded-md">
    <div
      class="p-3 rounded-full bg-opacity-75"
      :class="iconBgColor"
    >
      <i
        class="fa-2x h-8 w-8 text-center text-white"
        :class="icon"
      />
    </div>
    <div class="mx-5">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iconBgColor: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
};
</script>
