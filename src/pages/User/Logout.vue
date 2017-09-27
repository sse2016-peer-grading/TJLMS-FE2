<template>
  <ui-section-container key="logout">
    <ui-section title="登出用户">
      <ui-section-content>
        <p>当前用户：{{ session.username }}</p>
        <p>当前权限：{{ session.role }}</p>
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
      this.$router.push('/');
    },
  },
}
</script>
