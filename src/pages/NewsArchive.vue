<template>
  <div>
    <slot name="title">
      <h3 class="text-3xl font-semibold">Archief</h3>
    </slot>
    <template v-for="year in years">
      <slot name="year" :year="year">
        <h4 class="text-xl mb-2">{{ year }}</h4>
      </slot>
      <ul class="mb-2">
        <li v-for="month in archive[year]">
          <slot name="month" :archive="archive[year]">
            <div class="relative flex justify-between leading-6">
              <div class="text-blue-600 flex-grow">
                {{ month.name }} {{ month.year }}
              </div>
              <div class="flex-none">
                <Badge class="bg-red-600 text-white">{{ month.count }}</Badge>
              </div>
            </div>
          </slot>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { useNewsService } from '/src/services/NewsService.js';
import { months } from '/src/common/useDayJS.js';
import useSWRV from 'swrv';
import { computed } from 'vue';

import Badge from '/src/components/Badge.vue';

export default {
  components: { Badge },
  setup() {
    const newsService = useNewsService();
    const { data, isValidating: loading } = useSWRV('/news/archive', newsService.archive);

    const archive = computed(() => {
      if ( data.value ) {
        return data.value.reduce(
            (result, value) => {
              if (! result[value.year]) {
                result[value.year] = [];
              }
              result[value.year].push({
                name: months()[value.month - 1],
                month: value.month,
                year: value.year,
                count: value.count
              });
              return result;
            },
            {}
        )
      } else {
        return {};
      }
    });

    const years = computed(() => {
      return Object.keys(archive.value).reverse();
    })

    return {
      archive,
      years
    }
  }
}
</script>
