<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div
    v-else-if="teams.length === 0"
  >
    <Alert
      title="Geen teams"
      type="info"
      class="text-sm"
    >
      <div class="flex w-full">
        <div class="flex-grow">
          Er zijn geen teams gedefinieerd.
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
    id="team"
    v-model="model"
    class="grid sm:grid-cols-2"
    :items="teams.map(team => ({key: team.id, value: team.name}))"
    color="text-yellow-500"
  />
</template>

<script>
import Alert from '/src/components/Alert.vue';
import IconLink from '/src/components/IconLink.vue';

import { computed } from 'vue';
import { useTeamStore } from '/src/apps/coach/stores/teamStore.js';
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
    const store = useTeamStore();

    const { loading, error, reload } = store.load();

    const teams = computed(() => store.teams);

    return {
      model,
      loading,
      error,
      reload,
      teams
    };
  }
};
</script>
