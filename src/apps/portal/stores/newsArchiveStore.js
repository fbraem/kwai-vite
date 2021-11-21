import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useHttp } from '/src/common/useHttp.js';
import useState from '/src/composables/useState.js';
import { months } from '../../../common/useDayJS.js';

export const useNewsArchiveStore = defineStore('newsArchive', {
  state: () => ({
    archive: {}
  }),
  getters: {
    years: state => (Object.keys(state.archive)).reverse()
  },
  actions: {
    load() {
      const { data, loading, error } = useState(
        '/news/archive',
        () => useHttp
          .url('/news/archive')
          .get()
          .json()
      );

      watch(
        data,
        json => {
          this.archive = json.reduce(
            (result, value) => {
              if (!result[value.year]) {
                result[value.year] = [];
              }
              result[value.year].push({
                name: months()[value.month - 1],
                month: value.month,
                year: value.year,
                count: value.count
              });
              return result;
            },
            {}
          );
        }
      );

      return {
        loading,
        error
      };
    }
  }
});
