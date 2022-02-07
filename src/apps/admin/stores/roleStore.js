import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRequest } from 'vue-request';
import dayjs from '/src/common/useDayJS.js';
import { useHttpApi } from '/src/common/useHttp.js';

const toRoleModel = json => {
  const map = d => {
    return {
      id: d.id,
      type: d.type,
      created_at: dayjs.utc(d.attributes.created_at, 'YYYY-MM-DD HH:mm:ss').tz(),
      remark: d.attributes.remark,
      updated_at: d.attributes.updated_at,
    };
  };
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useRoleStore = defineStore('roles', {
  state: () => ({
    count: 0,
    role: null,
    roles: []
  }),
  actions: {
    load({
      offset = ref(0),
      limit = ref(10)
    } = {}) {
      const { data, loading, error } = useRequest(
        () => {
          let api = useHttpApi.url('/users/roles');
          if (offset.value > 0) {
            api = api.query({ 'page[offset]': offset.value });
          }
          if (limit.value) {
            api = api.query({ 'page[limit]': limit.value });
          }
          return api.get().json();
        },
        {
          cacheKey: '/admin/roles/',
          errorRetryCount: 5,
          refreshDeps: [ offset, limit ]
        }
      );

      watch(
        data,
        json => {
          this.roles = toRoleModel(json);
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
