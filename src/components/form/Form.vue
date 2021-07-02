<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          {{ title }}
        </h3>
        <slot name="description" />
      </div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div class="shadow sm:rounded-md">
        <div
          :class="formBgColor"
          class="px-4 py-5 space-y-6 sm:p-6"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    formBgColor: {
      type: String,
      default: 'bg-white'
    }
  }
};
</script>
