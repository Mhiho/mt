import { adresse } from '../../config';
import axios from 'axios';

export const isBrowser = () => typeof window != 'undefined';
export const getUser = () =>
  isBrowser() && window.localStorage.getItem('currentUser')
    ? JSON.parse(window.localStorage.getItem('currentUser'))
    : {};
export const getAvatar = () =>
  isBrowser() && window.localStorage.getItem('userAvatar')
    ? window.localStorage.getItem('userAvatar')
    : {};

const setUser = (user) => window.localStorage.setItem('currentUser', JSON.stringify(user));
export const setUserAvatar = (avatar) => window.localStorage.setItem('userAvatar', avatar);

export const removeAvatar = () => {
  console.log(window);
  console.log(window.localStorage);
  window.localStorage.removeItem('userAvatar');
};
export const login = async (email, password) => {
  const body = JSON.stringify({ email, password });
  const headers = { 'Content-Type': 'application/json' };
  const data = await axios
    .post(`${adresse}/users/authenticate`, body, { headers })
    .catch((e) => console.log(e));
  const user = { details: data.data.response, token: data.data.token };
  const avatar = data.data.response.avatar;
  if (user.token !== undefined) {
    setUser(user);
    setUserAvatar(avatar);
  }
  return user;
};

export const sendMeResetPasswordEmail = async (email) => {
  const body = JSON.stringify({ email });
  const headers = { 'Content-Type': 'application/json' };
  const response = await axios
    .post(`${adresse}/users/sendEmailToResetPassword`, body, { headers })
    .catch((e) => console.log(e));
  return response;
};
//
export const resetPassword = async (password, token) => {
  const body = JSON.stringify({ password });
  const headers = { 'Content-Type': 'application/json' };
  const response = await axios
    .post(`${adresse}/users/resetPassword/${token}`, body, { headers })
    .catch((e) => console.log(e));
  return response;
};
//
export const isLoggedIn = () => {
  const user = getUser();
  return !!user.token;
};
export const logoutCurrent = () => {
  const url = `${adresse}/users/logoutCurrent`;
  const headers = {
    Authorization: 'Bearer ' + `${getUser().token}`,
  };
  fetch(url, {
    method: 'POST',
    headers: headers,
  })
    .then((response) => {
      return response;
    })
    .then((data) => data);
  setUser({});
  setAvatar({});
};

export const logoutAll = () => {
  const url = `${adresse}/users/logoutAll`;
  const headers = {
    Authorization: 'Bearer ' + `${getUser().token}`,
  };
  fetch(url, {
    method: 'POST',
    headers: headers,
  })
    .then((response) => {
      return response;
    })
    .then((data) => data);
  setUser({});
  setAvatar({});
};
