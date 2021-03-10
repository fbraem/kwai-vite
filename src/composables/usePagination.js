import { computed, ref } from 'vue';

export default function usePagination(options) {
  const limit = ref(options.limit ?? 10);
  const count = ref(options.count ?? 0);
  const delta = ref(options.delta ?? 3);
  const offset = ref(0);
  const pageCount = computed(
    () => count.value > 0 ? Math.ceil(count.value / limit.value) : 0
  );

  const currentPage = computed(() => {
    let current = 1;
    for (let o = 0; o < offset.value; current++) {
      o += limit.value;
    }
    return current;
  });

  const pages = computed(() => {
    let range = [];
    for (let i = Math.max(2, currentPage.value - delta.value);
        i <= Math.min(pageCount.value - 1,
            currentPage.value + delta.value); i++) {
      range.push(i);
    }
    if (currentPage.value - delta.value > 2) {
      range.unshift('...');
    }
    if (currentPage.value + delta.value < pageCount.value - 1) {
      range.push('...');
    }

    range.unshift(1);
    range.push(pageCount.value);

    return range;
  });

  const triggerPage = (newPage) => {
    let newOffset = 0;
    for (let page = 1; page < newPage; page++) {
      newOffset += limit.value;
    }
    offset.value = newOffset;
    options.setOffset(newOffset);
  };

  return {
    count,
    pageCount,
    currentPage,
    pages,
    triggerPage
  };
};
