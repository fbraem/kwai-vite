/* Composable for getting a specific application */

import { useApplicationService } from '/src/apps/author/services/ApplicationService.js';
import useState from '/src/composables/useState.js';

const service = useApplicationService();

export default function useApplication(id) {
  const { data: application, reload } = useState(
    () => id && `/author/applications/${id}`,
    () => service.get(id)
  );

  return {
    application,
    reload
  };
}
