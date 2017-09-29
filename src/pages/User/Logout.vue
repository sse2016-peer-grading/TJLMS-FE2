<template>
  <ui-section-container key="logout">
    <ui-section title="登出用户" width="300px">
      <ui-section-content>
        <p>当前用户：{{ session.username }}</p>
        <p>当前权限：{{ session.role }}</p>
      </ui-section-content>
      <ui-section-content>
        <el-button type="primary" @click="handleClick">点击此处登出</el-button>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
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
      this.$message.success('登出成功');
      this.$router.push('/login');
    },
  },
}
</script>
