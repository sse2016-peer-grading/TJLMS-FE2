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
      return Promise.reject(err);
    }
  }
  return resp;
});

request.interceptors.response.use(null, err => {
  Message.error(err.message);
  return Promise.reject(err);
});

export default {
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
      create({ name, begin_at, end_at, visible }) {
        return request.post('/api/manage/create/assignment', { name, begin_at, end_at, visible });
      },
      detail(id) {
        return request.get(`/api/manage/assignment/${id}`);
      },
      problem: {
        create(assignmentId, { order, visible, text, questions }) {
          return request.post(`/api/manage/create/problem/${assignmentId}`, { order, visible, text, questions });
        },
        async update(problemId, { assignment_id, order, visible, text, questions }) {
          await request.post(`/api/manage/update/problem/${problemId}/meta`, { assignment_id, order, visible });
          return await request.post(`/api/manage/update/problem/${problemId}/content`, { questions, text });
        },
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
