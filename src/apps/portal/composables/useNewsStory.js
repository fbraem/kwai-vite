// Composable for reading a news story.

import { useNewsService } from '/src/apps/portal/services/NewsService.js';
import useSWRV from 'swrv';

const service = useNewsService();

export default function useNewsStory(id) {
  const { data: story, isValidating: loading, error } = useSWRV(
    '/news/story',
    () => service.get(id),
    {
      revalidateOnFocus: false
    }
  );

  return {
    story,
    loading,
    error
  };
}
