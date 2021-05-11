/* A wrapper around useSWRV */
import useSWRV from 'swrv';
import { computed } from 'vue';

export default function(key, fetcher, options = {}) {
  if (!options.revalidateOnFocus) {
    options.revalidateOnFocus = false;
  }
  const swr = useSWRV(key, fetcher, options);

  return {
    ...swr,
    loading: swr.isValidating,
    loaded: computed(() => swr.data.value !== undefined),
    reload: () => swr.mutate()
  };
};
