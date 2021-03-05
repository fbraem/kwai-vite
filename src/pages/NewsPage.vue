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
    <template v-if="news && news.items">
      <div v-for="story in news.items">
        <slot :story="story">
        </slot>
      </div>
    </template>
    <Paginator
        class="mt-10"
        :limit="limit"
        :count="count"
        :offset="offset"
        @page="setOffset"
        previous="Vorige"
        next="Volgende"
    >
      <template #showing :data="data">
        <p class="text-sm text-gray-700">
          <span class="font-medium">{{ offset + 1 }}</span>
          tot
          <span class="font-medium">{{ offset + limit }}</span>
          nieuwsberichten van in totaal
          <span class="font-medium">{{ count }}</span>.
        </p>
      </template>
    </Paginator>
  </div>
</template>

<script>
import { useNewsService } from '/src/services/NewsService.js';
import { useApplicationService } from '/src/services/ApplicationService.js';
import Spinner from '/src/components/Spinner.vue';
import Paginator from '/src/components/Paginator.vue';
import useSWRV from 'swrv';
import { computed, ref } from 'vue';
import { months } from '/src/common/useDayJS.js';

export default {
  components: { Paginator, Spinner },
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
    const offset = ref(0);
    const limit = ref(10);

    const newsService = useNewsService();

    const { data: news, isValidating: loading } = useSWRV(
      // the cache key: news_<offset>_<limit>[_<year>][_<month>][_<application>]
      () => [
          'news',
          offset.value,
          limit.value,
          props.year, props.month,
          props.app
        ].filter(e => e !== undefined).join('_'),
      () => newsService.load({
        year: props.year,
        month: props.month,
        offset: offset.value,
        limit: limit.value,
        application: props.app
      })
    );
    const count = computed(() => { return news.value?.meta.count ?? 0; });
    const setOffset = (newOffset) => {
      console.log(newOffset);
      offset.value = newOffset;
    }

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
      application,
      count,
      limit,
      offset,
      setOffset
    }
  }
};
</script>
