import { defineStore } from 'pinia';
import { useAbility } from '/src/common/useAbility.js';
import { useHttp, useHttpAuth } from '/src/common/useHttp.js';
import Lockr from 'lockr';

function toRuleModel(data) {
  return {
    can_update: data.attributes.can_update,
    can_view: data.attributes.can_view,
    can_create: data.attributes.can_create,
    can_delete: data.attributes.can_delete,
    name: data.attributes.name,
    remark: data.attributes.remark,
    subject: data.attributes.subject
  };
}

function toRoleModel(data, included) {
  return {
    name: data.attributes.name,
    remark: data.attributes.remark,
    description: data.attributes.description,
    rules: data.relationships.rules.data.map(
      r => toRuleModel(included.find(i => i.type === 'rules' && i.id === r.id))
    )
  };
}

function toUserModel(data, included) {
  return {
    email: data.attributes.email,
    username: data.attributes.username,
    roles: data.relationships.roles.data.map(
      r => toRoleModel(included.find(i => i.type === 'roles' && i.id === r.id), included)
    )
  };
}

const USER_KEY = 'user';
const USER_RULES_KEYS = 'rules';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const useAuthenticationStore = defineStore('authentication', {
  state: () => {
    const state = {
      user: Lockr.get(USER_KEY, null),
      userRules: Lockr.get(USER_RULES_KEYS, []),
      accessToken: Lockr.get(ACCESS_TOKEN_KEY, null),
      refreshToken: Lockr.get(REFRESH_TOKEN_KEY, null),
      ability: useAbility()
    };
    state.ability.update(state.userRules);
    return state;
  },
  getters: {
    isLoggedIn: (state) => state.accessToken != null
  },
  actions: {
    async login(email, password) {
      const form = {
        username: email,
        password
      };
      await useHttp
        .url('/auth/login')
        .formData(form)
        .post()
        .json()
        .then(json => {
          Lockr.set(ACCESS_TOKEN_KEY, json.access_token);
          this.accessToken = json.access_token;
          Lockr.set(REFRESH_TOKEN_KEY, json.refresh_token);
          this.refreshToken = json.refresh_token;
        })
      ;

      await this.get();
    },
    async get() {
      await useHttpAuth
        .url('/auth')
        .get()
        .json()
        .then(json => {
          this.user = toUserModel(json.data, json.included);
        })
      ;

      Lockr.set(USER_KEY, this.user);
      this.userRules = [];
      for (const role of this.user.roles) {
        for (const rule of role.rules) {
          if (rule.can_update) {
            this.userRules.push({
              action: 'update',
              subject: rule.subject
            });
          }
          if (rule.can_view) {
            this.userRules.push({
              action: 'view',
              subject: rule.subject
            });
          }
          if (rule.can_delete) {
            this.userRules.push({
              action: 'delete',
              subject: rule.subject
            });
          }
          if (rule.can_create) {
            this.userRules.push({
              action: 'create',
              subject: rule.subject
            });
          }
        }
      }
      Lockr.set(USER_RULES_KEYS, this.userRules);
      this.ability.update(this.userRules);
    },
    async refresh() {
      if (this.refreshToken) {
        const form = {
          refresh_token: this.refreshToken
        };
        const json = await useHttp
          .url('/auth/access_token')
          .formData(form)
          .post()
          .json()
        ;
        Lockr.set(ACCESS_TOKEN_KEY, json.access_token);
        this.accessToken = json.access_token;
        Lockr.set(REFRESH_TOKEN_KEY, json.refresh_token);
        this.refreshToken = json.refresh_token;

        await this.get();
      }
    },
    async logout() {
      const form = {
        refresh_token: this.refreshToken
      };

      await useHttpAuth
        .url('/auth/logout')
        .formData(form)
        .post()
        .res()
        .catch(error => {
          if (error.response) {
            // Ignore 401, tokens are already revoked
            if (error.response.status !== 401) {
              throw error;
            }
          }
        })
      ;

      this.ability.update([]);
      this.user = null;
      Lockr.rm(USER_KEY);
      this.userRules = [];
      Lockr.rm(USER_RULES_KEYS);
      this.accessToken = null;
      Lockr.rm(ACCESS_TOKEN_KEY);
      this.refreshToken = null;
      Lockr.rm(REFRESH_TOKEN_KEY);
    }
  }
});
