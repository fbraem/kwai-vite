/* Composable for getting a specific application */

import useApplications from '/src/apps/portal/composables/useApplications.js';
import { computed } from 'vue';

export default function useApplication(name) {
  const { applications } = useApplications();

  const application = computed(() => {
    if (applications.value) {
      return applications.value.find(
        (d) => d.name === name
      );
    }
  });

  return {
    application
  }
}
