import { useApplicationService } from '/src/apps/author/services/ApplicationService.js';
import useState from '/src/composables/useState.js';

const service = useApplicationService();

export default function useApplications() {
  const { data: applications, loading, error } = useState(
    '/author/applications',
    service.load
  );

  return {
    applications,
    loading,
    error
  };
};
