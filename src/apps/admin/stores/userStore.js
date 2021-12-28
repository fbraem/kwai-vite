import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useRequest } from 'vue-request';
import { useHttpApi } from '/src/common/useHttp.js';
import dayjs from '../../../common/useDayJS.js';

const toUserModel = json => {
  const map = d => {
    return {
      id: d.id,
      username: d.attributes.username,
      email: d.attributes.email,
      last_login: d.attributes.last_login ? dayjs.utc(d.attributes.last_login, 'YYYY-MM-DD HH:mm:ss').format('L LTS') : null,
      last_unsuccessful_login: d.attributes.last_unsuccessful_login ? dayjs.utc(d.attributes.last_unsuccessful_login, 'YYYY-MM-DD HH:mm:ss').format('L LTS') : null,
      revoked: d.attributes.revoked
    };
  };

  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useUserStore = defineStore('admin.users', {
  state: () => ({
    count: 0,
    user: null,
    users: []
  }),
  actions: {
    load() {
      const { data, loading, error } = useRequest(
        () => useHttpApi.url('/users/accounts').get().json(),
        {
          cacheKey: '/admin/users',
          errorRetryCount: 5
        }
      );

      watch(
        data,
        json => {
          this.users = toUserModel(json);
          this.count = json.meta.count;
        }
      );

      return {
        loading,
        error
      };
    }
  }
});
