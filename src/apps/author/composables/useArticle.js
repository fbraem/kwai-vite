import useState from '/src/composables/useState.js';

import { useArticleService } from '/src/apps/author/services/ArticleService.js';

const service = useArticleService();

export function useArticle(id) {
  const { data: article, loading, error, reload } = useState(
    () => `/author/article/${id}`,
    () => service.get(id)
  );

  return {
    article,
    reload,
    loading,
    error
  };
}
