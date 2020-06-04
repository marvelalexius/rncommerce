import axios from 'axios';
import {connect} from 'react-redux';
import config from './../config';
import store from './../modules/store';

const instance = axios.create({
  baseURL: `${config.api.host}/api`,
  timeout: config.api.timeout,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

instance.interceptors.request.use(
  async authConfig => {
    const token = store.getState().user.token;

    if (token) {
      authConfig.headers.Authorization = `Bearer ${token}`;
    }

    return authConfig;
  },
  error => Promise.reject(error),
);

export default instance;
