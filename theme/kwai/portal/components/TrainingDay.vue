<template>
  <tr>
    <td class="text-center px-6 py-3">
      <div class="font-semibold">
        {{ day }}
      </div>
      <div class="text-sm">
        {{ formattedDate}}
      </div>
    </td>
    <td class="pl-6">
      <div class="divide-y divide-y-4 divide-gray-400 w-full">
        <div
            v-for="training in trainings"
            class="py-3"
        >
          <TrainingPeriod :training="training"></TrainingPeriod>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import TrainingPeriod from '/@theme/portal/components/TrainingPeriod.vue';
import { createDateFromFormat, formatDate } from '/src/common/useDayJS.js';

export default {
  components: {
    TrainingPeriod
  },
  props: {
    day: {
      type: String,
      required: true
    },
    trainings: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const date = createDateFromFormat(props.day, 'YYYY-MM-DD');
    const formattedDate = formatDate(date, 'L');
    const day = formatDate(date, 'dddd');

    return {
      formattedDate,
      day
    };
  }
}
</script>
