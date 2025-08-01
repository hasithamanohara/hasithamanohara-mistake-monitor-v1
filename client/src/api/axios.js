import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mistake-monitor-v1.onrender.com/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
