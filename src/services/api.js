import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.0.3.2:3333',
  // baseURL: 'http://3.128.83.104:3333',
  // baseURL: 'http://3.130.183.174:3333',
  baseURL: 'http://3.142.16.89:3333',
});
export default api;
