import { AsyncStorage } from 'react-native';
// const baseURL = 'http://localhost:3000/api/';
const baseURL = 'https://kitchenfox.herokuapp.com/api/';

const objectToQueryString = (object) => {
  let keys = Object.keys(object);
  let queryString = [];
  keys.forEach(k => {
    let entry = `${k}=${object[k]}`
    queryString.push(entry);
  })
  queryString = queryString.join('&');
  return queryString;
}

export const signup = (state) => {
  const body = objectToQueryString(state);
  return fetch(`${baseURL}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
    },
    body: `${body}`,
  });
};

export const login = (state) => (
  fetch(`${baseURL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
    },
    body: `${objectToQueryString(state)}`,
  })
);

export const fetchItems = token => (
  fetch(`${baseURL}items`, {
    method: 'GET',
    headers: {
      authorization: `JWT ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
    },
  })
);

export const fetchUser = state => (
  const token = state.session.token;
  fetch(`${baseURL}user`, {
    method: 'GET',
    headers: {
      authorization: `JWT ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
    },
  })
);

export const patchItems = (state) => {
  const token = state.session.token;
  return fetch(`${baseURL}items`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
      authorization: `JWT ${token}`,
    },
    body: `${objectToQueryString(state)}`,
  });
};

export const deleteLocalData = () => (
  AsyncStorage.removeItem('user')
);

export const setLocalUserData = user => (
  AsyncStorage.setItem('user', user)
);

export const getLocalUserData = user => (
  AsyncStorage.getItem('user')
);
