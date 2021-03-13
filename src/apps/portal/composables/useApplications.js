import { useApplicationService } from '/src/apps/portal/services/ApplicationService.js';
import useSWRV from 'swrv';

const service = useApplicationService();

export default function useApplications() {
  const { data: applications, isValidation: loading, error } = useSWRV(
    '/applications',
    service.load
  );

  return {
    applications,
    loading,
    error
  };
};
