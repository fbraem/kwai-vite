/**
 * Composable that can be used for year/month paging of data.
 */
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from '/src/common/useDayJS.js';

export default function useYearMonth() {
  const route = useRoute();
  if (!route.query.year) {
    route.query.year = dayjs().year().toString();
  }
  if (!route.query.month) {
    route.query.month = (dayjs().month() + 1).toString();
  }

  const year = computed(() => {
    const queryYear = parseInt(route.query.year, 10);
    if (isNaN(queryYear)) {
      return dayjs().year();
    }
    return queryYear;
  });

  const month = computed(() => {
    const queryMonth = parseInt(route.query.month, 10);
    if (isNaN(queryMonth)) {
      return dayjs().month() + 1;
    }
    return queryMonth;
  });

  const previous = computed(() => {
    const query = {
      ...route.query
    };
    if (month.value === 1) {
      query.month = '12';
      query.year = (year.value - 1).toString();
    } else {
      query.month = (month.value - 1).toString();
    }
    return { query };
  });

  const next = computed(() => {
    const query = {
      ...route.query
    };
    if (month.value === 12) {
      query.month = '1';
      query.year = (year.value + 1).toString();
    } else {
      query.month = (month.value + 1).toString();
    }
    return { query };
  });

  const start = computed(() =>
    dayjs().year(year.value).month(month.value - 1).startOf('month')
  );
  const end = computed(() =>
    dayjs().year(year.value).month(month.value - 1).endOf('month')
  );

  const monthName = computed(() => dayjs.months()[month.value - 1]);

  return {
    year,
    month,
    monthName,
    previous,
    next,
    start,
    end
  };
};
