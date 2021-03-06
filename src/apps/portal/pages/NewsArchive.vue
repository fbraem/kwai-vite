<template>
  <div>
    <slot name="title">
      <h3 class="text-3xl font-semibold mb-2">Archief</h3>
    </slot>
    <template v-for="year in years">
      <slot name="year" :year="year">
        <div class="flex mb-2">
          <h4 class="flex-grow text-xl hover:cursor-pointer" @click="toggleYear(year)">
            {{ year }}
          </h4>
          <IconLink
            v-if="showYears[year]"
            class="hover:bg-gray-200"
            icon="fas fa-angle-up"
            :method="() => toggleYear(year)"
          ></IconLink>
          <IconLink
            v-else
            class="hover:bg-gray-200"
            icon="fas fa-angle-right"
            :method="() => toggleYear(year)"
          ></IconLink>
        </div>
      </slot>
      <ul
          class="mb-2 divide-y divide-gray-300"
          v-if="showYears[year]"
      >
        <li class="py-1" v-for="month in archive[year]">
          <slot name="month" :archive="archive[year]">
            <div class="relative flex leading-6">
              <CoverLink :route="{ name: 'news.archive', params: { year, month: month.month }}">
              </CoverLink>
              <div class="text-blue-600 flex-grow">
                {{ month.name }} {{ month.year }}
              </div>
              <div class="flex-none">
                <Badge class="bg-red-600 text-white align-middle">{{ month.count }}</Badge>
              </div>
            </div>
          </slot>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { useNewsService } from '/src/apps/portal/services/NewsService.js';
import { months } from '/src/common/useDayJS.js';
import IconLink from '/src/components/IconLink.vue';
import useSWRV from 'swrv';
import { computed, ref } from 'vue';

import CoverLink from '/src/components/CoverLink.vue';
import Badge from '/src/components/Badge.vue';

export default {
  components: { IconLink, CoverLink, Badge },
  setup() {
    const newsService = useNewsService();
    const { data } = useSWRV(
      '/news/archive',
      newsService.archive,
      {
        revalidateOnFocus: false
      }
    );

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

    // All years found in the archive
    const showYears = ref({});
    const years = computed(() => {
      const reversedYears = Object.keys(archive.value).reverse();

      showYears.value = reversedYears.reduce(
        (a, c) => {
          a[c] = false;
          return a;
        },
        {}
      );
      showYears.value[reversedYears[0]] = true;
      if (reversedYears.length > 1) {
        showYears.value[reversedYears[1]] = true;
      }

      return reversedYears;
    });

    const toggleYear = (year) => {
      showYears.value[year] = !showYears.value[year];
    };

    return {
      archive,
      years,
      showYears,
      toggleYear
    }
  }
}
</script>
