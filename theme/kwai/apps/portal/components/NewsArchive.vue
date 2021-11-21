<template>
  <div>
    <slot name="title">
      <h3 class="text-3xl font-semibold mb-2">
        Archief
      </h3>
    </slot>
    <template
      v-for="year in years"
      :key="year"
    >
      <slot
        name="year"
        :year="year"
      >
        <div class="flex mb-2">
          <h4
            class="flex-grow text-xl hover:cursor-pointer"
            @click="toggleYear(year)"
          >
            {{ year }}
          </h4>
          <IconLink
            v-if="showYears[year]"
            class="hover:bg-gray-200"
            icon="fas fa-angle-up"
            :method="() => toggleYear(year)"
          />
          <IconLink
            v-else
            class="hover:bg-gray-200"
            icon="fas fa-angle-right"
            :method="() => toggleYear(year)"
          />
        </div>
      </slot>
      <ul
        v-if="showYears[year]"
        class="mb-2 divide-y divide-gray-300"
      >
        <li
          v-for="month in archive[year]"
          :key="`${year}_${month}`"
          class="py-1"
        >
          <slot
            name="month"
            :archive="archive[year]"
          >
            <div class="relative flex leading-6">
              <CoverLink :route="{ name: 'portal.news.archive', params: { year, month: month.month }}" />
              <div class="text-blue-600 flex-grow">
                {{ month.name }} {{ month.year }}
              </div>
              <div class="flex-none">
                <Badge class="bg-red-600 text-sm font-bold text-white align-middle">
                  {{ month.count }}
                </Badge>
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
import { ref, watch, computed } from 'vue';

import CoverLink from '/src/components/CoverLink.vue';
import Badge from '/src/components/Badge.vue';
import { useNewsArchiveStore } from '/src/apps/portal/stores/newsArchiveStore.js';

export default {
  components: { IconLink, CoverLink, Badge },
  setup() {
    const archiveStore = useNewsArchiveStore();
    archiveStore.load();

    const archive = computed(() => archiveStore.archive);
    const years = computed(() => archiveStore.years);

    const showYears = ref({});
    watch(
      years,
      (years) => {
        showYears.value = years.reduce(
          (a, year) => {
            a[year] = false;
            return a;
          },
          {}
        );
        showYears.value[years[0]] = true;
        if (years.length > 1) {
          showYears.value[years[1]] = true;
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
    };
  }
};
</script>
