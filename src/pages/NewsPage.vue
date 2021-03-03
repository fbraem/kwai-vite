<template>
  <div>
    <Spinner v-if="loading"></Spinner>
    <slot v-if="application" name="application" :application="application">
      <h2 class="font-semibold text-3xl">{{ application.title }}</h2>
      <p class="text-sm text-gray-500"> Alle nieuwsberichten van deze categorie</p>
    </slot>
    <slot v-if="archive" name="archive" :archive="archive">
      <h2>{{ archive.year }} {{ archive.month }}</h2>
    </slot>
    <div v-for="story in news">
      <slot :story="story">
      </slot>
    </div>
  </div>
</template>

<script>
import { useNewsService } from '/src/services/NewsService.js';
import { useApplicationService } from '/src/services/ApplicationService.js';
import Spinner from '/src/components/Spinner.vue';
import useSWRV from 'swrv';
import { computed, ref } from 'vue';
import { months } from '/src/common/useDayJS.js';

export default {
  components: { Spinner },
  props: {
    year: {
      type: Number
    },
    month: {
      type: Number
    },
    app: {
      type: String
    }
  },
  setup(props) {
    const newsService = useNewsService();

    const paginator = ref({
      offset: 0,
      count: 0,
      limit: 10
    });

    const { data: news, isValidating: loading } = useSWRV(
      // the cache key: news_<offset>_<limit>[_<year>][_<month>][_<application>]
      () => [
          'news',
          paginator.value.offset,
          paginator.value.limit,
          props.year, props.month,
          props.app
        ].filter(e => e !== undefined).join('_'),
      () => newsService.load({
        year: props.year,
        month: props.month,
        offset: paginator.value.offset,
        limit: paginator.value.limit,
        application: props.app
      })
    );

    const archive = computed(() => {
      if (props.year) {
        return {
          year: props.year,
          month: months()[props.month -1]
        };
      }
      return null;
    });

    const applicationService = useApplicationService();
    const { data: applications } = useSWRV(
      `/applications`,
      () => applicationService.load()
    );
    const application = computed(() => {
      if (applications.value) {
        return applications.value.find(e => e.id === props.app);
      }
    });

    return {
      news,
      loading,
      archive,
      paginator,
      application
    }
  }
};
</script>
