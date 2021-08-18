import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default function useRoutePagination({
  limit = ref(10),
  parameter = 'page'
} = {}) {
  const count = ref(0);

  const route = useRoute();
  if (!route.query[parameter]) {
    route.query[parameter] = '1';
  }

  const offset = ref((parseInt(route.query[parameter], 10) - 1) * limit.value);
  watch(
    () => route.query.page,
    (nv) => {
      if (nv) {
        offset.value = (parseInt(nv, 10) - 1) * limit.value;
      }
    }
  );

  return {
    count,
    limit,
    offset
  };
};
