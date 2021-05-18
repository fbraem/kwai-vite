import { Ability } from '@casl/ability';
import Lockr from 'lockr';
import { computed, ref } from 'vue';
import { useUserService } from '/src/apps/portal/services/UserService.js';
import { useHttp, useHttpAuth } from './useHttp.js';

const USER_KEY = 'user';
const USER_RULES_KEYS = 'rules';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const user = ref(Lockr.get(USER_KEY, null));
const userRules = ref(Lockr.get(USER_RULES_KEYS, []));
const accessToken = ref(Lockr.get(ACCESS_TOKEN_KEY, null));
const refreshToken = ref(Lockr.get(REFRESH_TOKEN_KEY, null));

export const ability = new Ability();
ability.update(userRules.value);

export default function useAuthentication() {
  const login = async(email, password) => {
    const form = {
      username: email,
      password
    };
    const json = await useHttp
      .url('/auth/login')
      .formData(form)
      .post()
      .json()
    ;
    Lockr.set(ACCESS_TOKEN_KEY, json.access_token);
    accessToken.value = json.access_token;
    Lockr.set(REFRESH_TOKEN_KEY, json.refresh_token);
    refreshToken.value = json.refresh_token;

    const userService = useUserService();
    user.value = await userService.get();
    Lockr.set(USER_KEY, user.value);

    userRules.value = [];
    for (const ability of user.value.abilities) {
      for (const rule of ability.rules) {
        userRules.value.push({
          action: rule.action,
          subject: rule.subject
        });
      }
    }
    Lockr.set(USER_RULES_KEYS, userRules.value);
    ability.update(userRules.value);
  };

  const refresh = async() => {
    if (refreshToken.value) {
      const form = {
        refresh_token: refreshToken.value
      };
      const json = await useHttp
        .url('/auth/access_token')
        .formData(form)
        .post()
        .json()
      ;
      Lockr.set(ACCESS_TOKEN_KEY, json.access_token);
      accessToken.value = json.access_token;
      Lockr.set(REFRESH_TOKEN_KEY, json.refresh_token);
      refreshToken.value = json.refresh_token;

      const userService = useUserService();
      user.value = await userService.get();
      Lockr.set(USER_KEY, user.value);

      userRules.value = [];
      for (const ability of user.value.abilities) {
        for (const rule of ability.rules) {
          userRules.value.push({
            action: rule.action,
            subject: rule.subject
          });
        }
      }
      Lockr.set(USER_RULES_KEYS, userRules.value);
      ability.update(userRules.value);
    }
  };

  const logout = async() => {
    const form = {
      refresh_token: refreshToken.value
    };

    try {
      await useHttpAuth
        .url('/auth/logout')
        .formData(form)
        .post()
      ;
    } catch (error) {
      if (error.response) {
        // Ignore 401, tokens are already revoked
        if (error.response.status !== 401) {
          throw error;
        }
      }
    }

    reset();
  };

  const reset = () => {
    ability.update([]);
    user.value = null;
    Lockr.rm(USER_KEY);
    userRules.value = [];
    Lockr.rm(USER_RULES_KEYS);
    accessToken.value = null;
    Lockr.rm(ACCESS_TOKEN_KEY);
    refreshToken.value = null;
    Lockr.rm(REFRESH_TOKEN_KEY);
  };

  return {
    login,
    refresh,
    logout,
    reset,
    user,
    userRules,
    accessToken,
    refreshToken,
    isLoggedIn: computed(() => accessToken.value != null)
  };
}
