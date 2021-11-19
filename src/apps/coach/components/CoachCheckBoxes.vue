<template>
  <div v-if="error">
    {{ error.value }}
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
import CheckBoxes from '/src/components/form/CheckBoxes.vue';

export default {
  components: {
    CheckBoxes, Alert, IconLink
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    coaches: {
      type: Array,
      required: true
    },
    reload: {
      type: Function,
      required: true
    },
    error: {
      type: Object,
      required: false
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

    return {
      model
    };
  }
};
</script>
