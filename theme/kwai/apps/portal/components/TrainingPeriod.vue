<template>
  <div class="flex flex-col lg:flex-row flex-wrap">
    <div class="flex w-full sm:w-1/2">
      <div>
        {{ startHour }}u
      </div>
      <div class="mx-2">
        <i class="fas fa-arrows-alt-h" />
      </div>
      <div>
        {{ endHour }}u
      </div>
    </div>
    <div class="w-full md:w-1/2">
      <ul>
        <li
          v-for="team in training.teams"
          :key="team.id"
        >
          <div>{{ team.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatDate } from '/src/common/useDayJS.js';

export default {
  props: {
    training: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const startHour = formatDate(props.training.start_date, 'HH:mm');
    const endHour = formatDate(props.training.end_date, 'HH:mm');

    return {
      startHour,
      endHour
    };
  }
};
</script>
