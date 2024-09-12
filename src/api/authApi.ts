/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-promise-reject-errors */
import {getToken} from './common';
import {configApi} from './config';
import {ROUTE_API} from './route';

export const onApiLogin = (
  email: string,
  password: string,
  infoDevices: string
): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.auth;
  return fetch(fullUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      device: JSON.stringify(infoDevices),
    }),
  })
    .then((data) => data.json())
    .then((d) => {
      if (d.success) {
        return d.data.data;
      }
      if (typeof d.errors === 'string') {
        return d.errors;
      }
      return d.errors?.[0] || 'Email or Password not correct';
    })
    .catch(() => {
      Promise.reject('');
    });
};
export const onApiLogout = (): void => {
  const fullUrl = configApi.baseUrl + ROUTE_API.logout;
  fetch(fullUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateUidForUser = async (uid: string): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.updateUserUID;

  return fetch(fullUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: uid,
    }),
  })
    .then((data) => data.json())
    .then((d) => {
      if (d.success) {
        return d.data.accessToken;
      }
      Promise.reject('');
      return '';
    })
    .catch(() => {
      Promise.reject('');
    });
};

export const getProfile = (): Promise<boolean> => {
  const token = getToken();
  const fullUrl = configApi.baseUrl + ROUTE_API.userProfile;
  return fetch(fullUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then((d) => {
      if (d.code === 401) { 
        return false;
      }
      return true;
    })
    .catch(() => {
      return true;
    });
};
