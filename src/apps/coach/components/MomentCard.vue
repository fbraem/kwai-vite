<template>
  <Card class="mx-2">
    <template #title>
      <h2 class="text-gray-900 font-bold text-lg mb-2">
        {{ moment.name }}
      </h2>
      <p class="text-sm text-gray-600">
        {{ weekday }} {{ moment.start_time }} - {{ moment.end_time }}
      </p>
    </template>
    <p>{{ moment.description }}</p>
    <template #footer>
      <div class="flex flex-row justify-between w-full">
        <ButtonLink
          class="bg-yellow-500"
          :route="{ name: 'coach.training_moment', params: { id: moment.id } }"
        >
          <i class="fa fa-calendar" /> Trainingen
        </ButtonLink>
        <div>
          <ButtonLink
            class="bg-yellow-500"
          >
            <i class="fa fa-edit" /> Wijzig
          </ButtonLink>
          <ButtonLink
            class="bg-red-600 text-white"
          >
            <i class="far fa-trash-alt" /> Verwijder
          </ButtonLink>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from '/src/components/Card.vue';
import { computed } from 'vue';
import dayjs from '/src/common/useDayJS.js';
import ButtonLink from '/src/components/ButtonLink.vue';

export default {
  components: { ButtonLink, Card },
  props: {
    moment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const weekday = computed(() => {
      return dayjs.weekdays()[props.moment.weekday];
    });

    return {
      weekday
    }
  }
};
</script>
