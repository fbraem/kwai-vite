import { defineStore } from 'pinia';
import { watch, ref } from 'vue';
import { useRequest } from 'vue-request';
import { useHttpApi } from '/src/common/useHttp.js';
import dayjs from '/src/common/useDayJS.js';

const toUserModel = json => {
  const map = d => {
    return {
      id: d.id,
      type: d.type,
      username: d.attributes.username,
      first_name: d.attributes.first_name,
      last_name: d.attributes.last_name,
      email: d.attributes.email,
      last_login: d.attributes.last_login ? dayjs.utc(d.attributes.last_login, 'YYYY-MM-DD HH:mm:ss').format('L LTS') : null,
      last_unsuccessful_login: d.attributes.last_unsuccessful_login ? dayjs.utc(d.attributes.last_unsuccessful_login, 'YYYY-MM-DD HH:mm:ss').format('L LTS') : null,
      revoked: d.attributes.revoked,
      remark: d.attributes.remark,
      owner: d.attributes.owner
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
    get(uuid) {
      const { data, loading, error } = useRequest(
        () => useHttpApi
          .url('/users/')
          .url(uuid)
          .get()
          .json(),
        {
          cacheKey: `/admin/users/${uuid}`,
          errorRetryCount: 5
        }
      );
      watch(
        data,
        json => {
          this.user = toUserModel(json);
        }
      );

      return {
        loading,
        error
      };
    },
    load({
      offset = ref(0),
      limit = ref(10)
    } = {}) {
      const { data, loading, error } = useRequest(
        () => {
          let api = useHttpApi.url('/users/accounts');
          if (offset.value > 0) {
            api = api.query({ 'page[offset]': offset.value });
          }
          if (limit.value) {
            api = api.query({ 'page[limit]': limit.value });
          }
          return api.get().json();
        },
        {
          cacheKey: '/admin/users/',
          errorRetryCount: 5,
          refreshDeps: [ offset, limit ]
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
    },
    save(user) {
      const payload = {
        data: {
          type: 'users',
          id: user.id,
          attributes: {
            first_name: user.first_name,
            last_name: user.last_name,
            remark: user.remark
          }
        }
      };
      return useHttpApi
        .url('/users/')
        .url(user.id)
        .json(payload)
        .patch()
        .json()
        .then(json => { this.user = toUserModel(json); })
      ;
    }
  }
});
