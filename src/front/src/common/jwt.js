const ID_TOKEN_KEY = "id_access_token";
const ID_REFRESH_TOKEN_KEY = "id_refresh_token";

export const getAccessToken = () => {
  return window.sessionStorage.getItem(ID_TOKEN_KEY);
};

export const saveAccessToken = token => {
  window.sessionStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyAccessToken = () => {
  window.sessionStorage.removeItem(ID_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return window.sessionStorage.getItem(ID_REFRESH_TOKEN_KEY);
};

export const saveRefreshToken = token => {
  window.sessionStorage.setItem(ID_REFRESH_TOKEN_KEY, token);
};

export const destroyRefreshToken = () => {
  window.sessionStorage.removeItem(ID_REFRESH_TOKEN_KEY);
};

export default {
  getAccessToken,
  saveAccessToken,
  destroyAccessToken,
  getRefreshToken,
  saveRefreshToken,
  destroyRefreshToken
};
