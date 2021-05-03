/* Composable for getting a specific application */

import useApplications from '/src/apps/portal/composables/useApplications.js';
import { isRef } from 'vue';
import useSWRV from 'swrv';

export default function useApplication({
  name, id
}) {
  const { applications } = useApplications();
  const { data: application } = useSWRV(
    () => {
      if (!applications.value) return null;

      if (isRef(id)) {
        if (id.value) {
          return `/application/${id.value}`;
        }
        return null;
      }
      if (id) return `/application/${id}`;
      if (isRef(name)) {
        return `/application/${name.value}`;
      }
      if (name) return `/application/${name}`;
      return null;
    },
    () => {
      let application = null;
      if (name) {
        application = applications.value.find(
          (d) => d.name === (isRef(name) ? name.value : name)
        );
      }
      if (id) {
        application = applications.value.find(
          (d) => {
            return d.id === (isRef(id) ? id.value : id).toString();
          }
        );
      }
      return application;
    }
  );

  return {
    application
  };
}
