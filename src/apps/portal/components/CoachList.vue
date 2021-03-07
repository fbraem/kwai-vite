<template>
  <div>
    <Spinner v-if="loading"></Spinner>
    <div v-if="coaches">
      <slot :coaches="coaches">
      </slot>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { useCoachesService } from '/src/apps/portal/services/CoachService.js';
import Spinner from '/src/components/Spinner.vue';
import useSWRV from 'swrv';

export default {
  components: { Spinner },
  setup () {
    const service = useCoachesService();

    const { data: coaches, isValidating: loading } = useSWRV(
        'coaches',
        () => service.load()
    );

    return {
      coaches,
      loading
    }
  }
}
</script>
