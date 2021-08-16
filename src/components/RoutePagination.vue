<!--
  Based on paginator from tailwind ui:
  https://tailwindui.com/components/application-ui/navigation/pagination
  and
  https://raoulkramer.de/vue-js-router-pagination/
  https://github.com/djpogo/vue-pagination
-->
<!-- eslint-disable max-len -->
<template>
  <div
    class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <router-link
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:text-gray-500"
        :disabled="currentPage === 1"
        :to="paginate(currentPage - 1)"
      >
        {{ previousText }}
      </router-link>
      <router-link
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:text-gray-500"
        :disabled="currentPage === pageCount"
        :to="paginate(currentPage + 1)"
      >
        {{ nextText }}
      </router-link>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <slot
          name="showing"
          :from="from"
          :to="to"
          :count="count"
        >
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ from }}</span>
            to
            <span class="font-medium">{{ to }}</span>
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
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm leading-5 font-medium text-gray-500"
          >
            <i class="fas fa-chevron-left" />
          </span>
          <router-link
            v-else
            class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous"
            :to="paginate(currentPage - 1)"
          >
            <i class="fas fa-chevron-left" />
          </router-link>
          <template
            v-for="(page, index) in pages"
            :key="index"
          >
            <span
              v-if="page === '...'"
              class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium text-gray-700"
            >
              ...
            </span>
            <span
              v-else-if="page === currentPage"
              class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-bold text-gray-700"
            >
              {{ page }}
            </span>
            <router-link
              v-else
              class="cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              :to="paginate(page)"
            >
              {{ page }}
            </router-link>
          </template>
          <span
            v-if="currentPage === pageCount"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm leading-5 font-medium text-gray-500"
          >
            <i class="fas fa-chevron-right" />
          </span>
          <router-link
            v-else
            class="cursor-pointer -ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
            :to="paginate(currentPage + 1)"
          >
            <i class="fas fa-chevron-right" />
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      default: 10
    },
    delta: {
      type: Number,
      default: 3
    },
    pageParameter: {
      type: String,
      default: 'page'
    },
    previousText: {
      type: String,
      default: 'Previous'
    },
    nextText: {
      type: String,
      default: 'Next'
    }
  },
  setup(props) {
    const route = useRoute();

    const currentPage = ref(parseInt(route.query[props.pageParameter], 10) || 1);
    const pageCount = computed(() => props.count > 0 ? Math.ceil(props.count / props.limit) : 0);

    watch(
      () => route.query[props.pageParameter],
      () => { currentPage.value = parseInt(route.query[props.pageParameter], 10) || 1; }
    );

    const offset = computed(() => (currentPage.value - 1) * props.limit);

    const from = computed(() => offset.value + 1);
    const to = computed(
      () => offset.value + props.limit < props.count ? offset.value + props.limit : props.count
    );

    const pages = computed(() => {
      const range = [];
      for (let i = Math.max(2, currentPage.value - props.delta);
        i <= Math.min(pageCount.value - 1,
          currentPage.value + props.delta); i++) {
        range.push(i);
      }
      if (currentPage.value - props.delta > 2) {
        range.unshift('...');
      }
      if (currentPage.value + props.delta < pageCount.value - 1) {
        range.push('...');
      }

      range.unshift(1);
      range.push(pageCount.value);

      return range;
    });

    const paginate = (page) => {
      return {
        query: {
          ...route.query,
          [props.pageParameter]: page
        }
      };
    };

    return {
      currentPage,
      pageCount,
      pages,
      paginate,
      offset,
      from,
      to
    };
  }
};
</script>
