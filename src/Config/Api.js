import axios from 'axios';
import { BASE_URL } from './constant';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('user token');
  const auth = JSON.parse(token);
  
  if (auth) {
    config.headers['Authorization'] = auth;
  }

  return config;
});

export default instance;
