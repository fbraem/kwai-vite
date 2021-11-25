import wretch from 'wretch';
import { api } from '/@config';
import { useAuthenticationStore } from '/src/stores/authenticationStore.js';

/**
 * The base implementation for calling an API.
 */
export const useHttp = wretch(api, {
  options: {
    credentials: 'include',
    mode: 'cors'
  }
});

/**
 * Implementation for calling an API with an access token.
 */
export const useHttpAuth = useHttp.defer(w => {
  const authenticationStore = useAuthenticationStore();
  const token = authenticationStore.accessToken;
  if (token) {
    return w.auth(`Bearer ${token}`);
  }
  return w;
});

/**
 * Implementation that will retry authentication when a http code 401 is
 * received.
 */
export const useHttpApi = useHttpAuth
  .accept('application/vnd.api+json')
  .content('application/vnd.api+json')
  .catcher(401, async(err, request) => {
    const authenticationStore = useAuthenticationStore();
    await authenticationStore.refresh();
    if (!authenticationStore.accessToken) throw err;

    return request
      .auth(authenticationStore.accessToken)
      .replay()
      .unauthorized(err => { throw err; })
      .json()
    ;
  })
;
