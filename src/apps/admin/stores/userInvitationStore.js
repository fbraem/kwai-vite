import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRequest } from 'vue-request';
import { useHttpApi } from '/src/common/useHttp.js';
import dayjs from '/src/common/useDayJS.js';

const toUserInvitationModel = json => {
  const map = d => {
    return {
      id: d.id,
      type: d.type,
      confirmed_at: d.attributes.confirmed_at ? dayjs.utc(d.attributes.confirmed_at, 'YYYY-MM-DD HH:mm:ss').tz() : null,
      created_at: dayjs.utc(d.attributes.created_at, 'YYYY-MM-DD HH:mm:ss').tz(),
      email: d.attributes.email,
      expired_at: dayjs.utc(d.attributes.expired_at, 'YYYY-MM-DD HH:mm:ss').tz(),
      expired_at_timezone: d.attributes.expired_at_timezone,
      remark: d.attributes.remark,
      updated_at: d.attributes.updated_at,
      name: d.attributes.name
    };
  };
  if (Array.isArray(json.data)) {
    return json.data.map(map);
  }
  return map(json.data);
};

export const useUserInvitationStore = defineStore('admin.user_invitations', {
  state: () => ({
    count: 0,
    invitation: null,
    invitations: []
  }),
  actions: {
    load({
      offset = ref(0),
      limit = ref(10),
      active = ref(true)
    } = {}) {
      const { data, loading, error } = useRequest(
        () => {
          let api = useHttpApi.url('/users/invitations');
          if (offset.value > 0) {
            api = api.query({ 'page[offset]': offset.value });
          }
          if (limit.value) {
            api = api.query({ 'page[limit]': limit.value });
          }
          if (active.value === true) {
            api = api.query({
              'filter[active]': dayjs().format('YYYY-MM-DD hh:mm:ss'),
              'filter[active_timezone]': dayjs.tz.guess()
            });
          }
          return api.get().json();
        },
        {
          cacheKey: '/admin/user_invitations/',
          errorRetryCount: 5,
          refreshDeps: [ offset, limit, active ]
        }
      );

      watch(
        data,
        json => {
          this.invitations = toUserInvitationModel(json);
          this.count = json.meta.count;
        }
      );

      return {
        loading,
        error
      };
    },
    save(invitation) {
      const payload = {
        data: {
          type: 'user_invitations',
          attributes: {
            name: invitation.name,
            email: invitation.email,
            remark: invitation.remark
          }
        }
      };
      useHttpApi
        .url('/users/invitations')
        .json(payload)
        .post()
        .json()
        .then(json => {
          this.invitation = toUserInvitationModel(json);
        })
      ;
    },
    remove(invitation) {
      useHttpApi
        .url('/users/invitations/')
        .url(invitation.id)
        .delete()
        .forbidden(error => console.log(error))
        .error(500, error => console.log(error))
        .res()
        .then(() => {
          const index = this.invitations.findIndex(item => item.id === invitation.id);
          if (index !== -1) {
            this.invitations.splice(index, 1);
            this.count--;
          }
        })
      ;
    }
  }
});
