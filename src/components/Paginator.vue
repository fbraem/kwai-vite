<template>
  <!--
    Based on paginator from tailwindui:
    https://tailwindui.com/components/application-ui/navigation/pagination
  -->
  <!-- eslint-disable max-len -->
  <div
      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <button
         @click="triggerPage(currentPage - 1)"
         class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
         :disabled="currentPage === 1"
      >
        {{ previous }}
      </button>
      <button
         @click="triggerPage(currentPage + 1)"
         class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
         :disabled="currentPage === pageCount"
      >
        {{ next }}
      </button>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <slot name="showing" :data="{ from: offset + 1, to: offset + limit, count }">
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ offset + 1 }}</span>
            to
            <span class="font-medium">{{ offset + limit }}</span>
            of
            <span class="font-medium">{{ count }}</span>
            results
          </p>
        </slot>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm">
          <span
              v-if="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500"
          >
            <i class="fas fa-chevron-left"></i>
          </span>
          <a
              v-else
              @click="triggerPage(currentPage - 1)"
              class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Previous"
          >
            <i class="fas fa-chevron-left"></i>
          </a>
          <template v-for="(page, index) in pages" :key="index">
            <span
                v-if="page === '...'"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700"
            >
              ...
            </span>
            <span
                v-else-if="page === currentPage"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-bold text-gray-700"
            >
              {{ page }}
            </span>
            <a
                v-else
                @click="triggerPage(page)"
                class="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
              {{ page }}
            </a>
          </template>
          <span
              v-if="currentPage === pageCount"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500"
          >
            <i class="fas fa-chevron-right"></i>
          </span>
          <a
              v-else
              @click="triggerPage(currentPage + 1)"
              class="cursor-pointer -ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Next"
          >
            <i class="fas fa-chevron-right"></i>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import usePagination from '/src/composables/usePagination.js';
import { watch } from 'vue';

export default {
  props: {
    limit: Number,
    offset: Number,
    count: Number,
    previous: {
      type: String,
      default: 'Previous'
    },
    next: {
      type: String,
      default: 'Next'
    }
  },
  setup(props, { emit }) {
    const pagination = usePagination({
      limit: props.limit,
      count: props.count,
      setOffset: (offset) => emit('page', offset)
    });

    watch(() => props.count, () => { pagination.count.value = props.count; });

    return {
      ...pagination
    }
  }
};
</script>
