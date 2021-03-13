import { computed, ref, watch } from 'vue';

export default function usePagination({
  limit= ref(10),
  count = ref(0),
  delta = ref(3),
} = {} ) {
  const _offset = ref(0);
  const _currentPage = ref(1);

  const offset = computed({
    get() { return _offset.value; },
    set(v) { _offset.value = Math.min(v, count.value); }
  });

  const pageCount = computed(
    () => {
      return count.value > 0 ? Math.ceil(count.value / limit.value) : 0
    }
  );

  const currentPage = computed({
    get() { return _currentPage.value; },
    set(v) {
      _currentPage.value = Math.min(v, Math.min(v, count.value));
      if (v < 1) {
        _currentPage.value = 1;
      } else if (v > pageCount.value) {
          _currentPage.value = pageCount.value;
      } else {
        _currentPage.value = v;
      }
      offset.value = (_currentPage.value - 1) * limit.value;
    }
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

  watch(
    [count, limit],
    _ => {
      if (currentPage.value > pageCount.value) {
        currentPage.value = pageCount.value;
      }
    },
    { immediate: false } // no need to run on first render
  );

  const prev = () => --currentPage.value;
  const next = () => ++currentPage.value;
  const first = () => { currentPage.value = 1; }
  const last = () => { currentPage.value = pageCount.value; }

  return {
    limit,
    count,
    currentPage,
    offset,
    pageCount,
    pages,
    next,
    prev,
    first,
    last
  };
};
