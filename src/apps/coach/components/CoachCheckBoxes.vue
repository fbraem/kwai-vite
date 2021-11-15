<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div
    v-else-if="coaches.length === 0"
  >
    <Alert
      title="Geen coaches"
      type="info"
      class="text-sm"
    >
      <div class="flex w-full">
        <div class="flex-grow">
          Er zijn geen coaches.
        </div>
        <div>
          <IconLink
            :method="reload"
            icon="fas fa-sync-alt"
          />
        </div>
      </div>
    </Alert>
  </div>
  <CheckBoxes
    v-else
    id="coach"
    v-model="model"
    class="grid sm:grid-cols-2"
    :items="coaches"
    color="text-yellow-500"
  />
</template>

<script>
import Alert from '/src/components/Alert.vue';
import IconLink from '/src/components/IconLink.vue';

import { computed } from 'vue';
import { useCoachStore } from '/src/apps/coach/stores/coachStore.js';
import CheckBoxes from '/src/components/form/CheckBoxes.vue';

export default {
  components: {
    CheckBoxes, Alert, IconLink
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, { emit }) {
    const model = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit('update:modelValue', value);
      }
    });
    const store = useCoachStore();

    const { loading, error, reload } = store.load();

    const coaches = computed(
      () => store.activeCoaches.map(
        coach => ({
          key: coach.id,
          value: coach.name
        })
      )
    );

    return {
      model,
      loading,
      error,
      reload,
      coaches
    };
  }
};
</script>
