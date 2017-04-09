<template>
  <div class="section">
    <div>
      <h1>登出当前用户</h1>
      <p>当前用户：{{ session.username }}</p>
      <p>当前权限：{{ session.role }}</p>
      <el-button type="primary" @click="handleClick">点击此处登出</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import API from '@/utils/api';

export default {
  name: 'page-logout',
  computed: {
    ...mapState('user', [
      'session',
    ]),
  },
  methods: {
    async handleClick() {
      await API.user.logout();
      this.$router.push('/');
    },
  },
}
</script>
