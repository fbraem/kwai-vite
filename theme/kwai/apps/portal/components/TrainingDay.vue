<template>
  <tr>
    <td class="text-left px-6 py-3">
      <div class="font-semibold">
        {{ nameOfDay }}
      </div>
      <div class="text-sm">
        {{ formattedDate }}
      </div>
    </td>
    <td class="pl-6">
      <div class="divide-y divide-y-1 divide-gray-400 w-full">
        <div
          v-for="training in trainings"
          :key="training.id"
          class="py-3"
        >
          <TrainingPeriod :training="training" />
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import TrainingPeriod from '/@theme/apps/portal/components/TrainingPeriod.vue';
import dayjs from '/src/common/useDayJS.js';

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
    const date = dayjs(props.day, 'YYYY-MM-DD');
    const formattedDate = date.format('L');
    const nameOfDay = date.format('dddd');

    return {
      formattedDate,
      nameOfDay
    };
  }
};
</script>
