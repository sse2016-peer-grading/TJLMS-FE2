import Vue from 'vue';
import API from '@/utils/api';

export default {
  namespaced: true,
  state: {
    session: null,
  },
  mutations: {
    setSession(state, session) {
      state.session = session;
    },
    clearSession(state) {
      state.session = null;
    },
  },
  actions: {
    async initSession({ commit }) {
      const resp = await API.user.session();
      commit('setSession', resp.data);
    },
  },
}
