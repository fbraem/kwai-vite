// Composable for reading a news story.

import { useNewsService } from '/src/apps/author/services/NewsService.js';
import useState from '/src/composables/useState.js';

const service = useNewsService();

export default function useNewsStory(id) {
  const { data: story, loading, error, reload } = useState(
    () => `/author/news/story/${id}`,
    () => service.get(id)
  );

  return {
    story,
    reload,
    loading,
    error
  };
}
