import wretch from 'wretch';
import { computed } from 'vue';
import type { Ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';
import config from '@kwai/config';

const api = config.api.base_url;

interface LocalStorage {
    accessToken: Ref<string|null>,
    refreshToken: Ref<string|null>
}
const localStorage: LocalStorage = {
  accessToken: useLocalStorage('access_token', null),
  refreshToken: useLocalStorage('refresh_token', null),
};

export const isLoggedIn = computed((): boolean => localStorage.accessToken.value != null);

interface Options {
    baseUrl?: string,
    accessToken?: Ref<string|null>,
    refreshToken?: Ref<string|null>
}

export const useHttp = (options: Options = {}) => wretch(
  options.baseUrl ?? api,
  {
    credentials: 'include',
    mode: 'cors',
  }
).addon(FormDataAddon).addon(QueryStringAddon);

export const useHttpAuth = (options: Options) => useHttp(options).defer(
  w => {
    const accessToken = options.accessToken ?? localStorage.accessToken;
    if (accessToken.value) {
      return w.auth(`Bearer ${accessToken.value}`);
    }
    return w;
  }
);

interface AccessTokenJSON {
    access_token: string,
    refresh_token: string
}
interface LoginFormData {
    username: string,
    password: string
}

export const useHttpLogin = (formData: LoginFormData, options: Options = {}) => {
  const accessToken = options.accessToken ?? localStorage.accessToken;
  accessToken.value = null;
  const refreshToken = options.refreshToken ?? localStorage.refreshToken;
  refreshToken.value = null;

  return useHttp(options)
    .url('/auth/login')
    .formData(formData)
    .post()
    .json<AccessTokenJSON>()
    .then(json => {
      accessToken.value = json.access_token;
      refreshToken.value = json.refresh_token;
    });
};

export const useHttpApi = (options: Options = {}) => useHttpAuth(options)
  .accept('application/vnd.api+json')
  .content('application/vnd.api+json')
  // eslint-disable-next-line n/handle-callback-err
  .catcher(401, async(err, request) => {
    const accessToken = options.accessToken ?? localStorage.accessToken;
    const refreshToken = options.refreshToken ?? localStorage.refreshToken;
    if (refreshToken.value) {
      const form = {
        refresh_token: refreshToken,
      };
      await useHttp(options)
        .url('/auth/access_token')
        .formData(form)
        .post()
        .json()
        .then(json => {
          const token = <AccessTokenJSON> json;
          accessToken.value = token.access_token;
          refreshToken.value = token.refresh_token;
        })
        .catch(error => {
          accessToken.value = null;
          refreshToken.value = null;
          console.log(error);
        })
      ;
    }

    return request
      .addon(FormDataAddon)
      .addon(QueryStringAddon)
      .auth(accessToken.value as string)
      .fetch()
      .unauthorized(err => { throw err; })
      .json()
    ;
  })
;

export const useHttpLogout = async(options: Options = {}) => {
  const accessToken = options.accessToken ?? localStorage.accessToken;
  const refreshToken = options.refreshToken ?? localStorage.refreshToken;

  const form = {
    refresh_token: refreshToken.value,
  };

  await useHttpAuth(options)
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
    });

  accessToken.value = null;
  refreshToken.value = null;
};
