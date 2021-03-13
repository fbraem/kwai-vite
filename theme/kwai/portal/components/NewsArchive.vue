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
import IconLink from '/src/components/IconLink.vue';
import useNewsArchive from '/src/apps/portal/composables/useNewsArchive.js';
import { ref, watch } from 'vue';

import CoverLink from '/src/components/CoverLink.vue';
import Badge from '/src/components/Badge.vue';

export default {
  components: { IconLink, CoverLink, Badge },
  setup() {
    const { archive, years } = useNewsArchive();

    const showYears = ref({});
    watch(
        years,
        (nv, ov) => {
          showYears.value = nv.reduce(
              (a, year) => {
                a[year] = false;
                return a;
              },
              {}
          );
          showYears.value[years.value[0]] = true;
          if (years.value.length > 1) {
            showYears.value[years.value[1]] = true;
          }
        }
    );
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
