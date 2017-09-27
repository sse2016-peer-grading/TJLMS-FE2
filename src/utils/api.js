import request from 'axios';
import { Message } from 'element-ui';

request.interceptors.response.use(resp => {
  if (resp.status === 200) {
    const serverData = resp.data;
    resp.status = serverData.code;
    resp.data = serverData.data;
    if (resp.status !== 200) {
      const err = new Error(`Error: ${serverData.reason}`);
      err.response = resp;
      throw err;
    }
  }
  return resp;
}, err => {
  Message.error(err.message);
  return Promise.reject(err);
});

const API = {
  user: {
    session() {
      return request.get('/api/user/status');
    },
    login({ username, password }) {
      return request.post('/api/user/login', { username, password });
    },
    logout() {
      return request.get('/api/user/logout');
    },
  },
  manage: {
    assignment: {
      all() {
        return request.get('/api/manage/assignment');
      },
      detail(id) {
        return request.get(`/api/manage/assignment/${id}`);
      },
    },
    submission: {
      all(id) {
        return request.get(`/api/manage/assignment/${id}/submissions`);
      },
      detail(id) {
        return request.get(`/api/manage/submission/${id}`);
      },
    },
  },
};

export default API;
