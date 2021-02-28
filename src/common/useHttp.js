import wretch from 'wretch';
import { api } from '/src/config/config.toml';
import useAuthentication from './useAuthentication.js';

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
    const { accessToken } = useAuthentication();
    const token = accessToken?.value;
    if (token) {
        return w.auth( `Bearer ${token}`);
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
      const { refresh, accessToken } = useAuthentication();
      await refresh();
      if (!accessToken?.value) throw err;

      return request
        .auth(accessToken.value)
        .replay()
        .unauthorized(err => { throw err; })
        .json()
        ;
  })
;
