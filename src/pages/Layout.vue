<template>
  <div class="vcContainer">
    <div class="layoutLeft">
      <el-menu
        class="leftMenu"
        theme="dark"
        :default-active="$route.fullPath"
        :default-openeds="['manage', 'user']"
        router
      >
        <el-menu-item index="/">仪表盘</el-menu-item>
        <el-submenu index="manage" v-if="['admin', 'ta'].indexOf(session.role) > -1">
          <template slot="title">管理</template>
          <el-menu-item index="/manage/submission-status">递交状态</el-menu-item>
        </el-submenu>
        <el-submenu index="user">
          <template slot="title">用户 ({{ session.username }})</template>
          <el-menu-item index="/user/change-password">修改密码</el-menu-item>
          <el-menu-item index="/user/logout">登出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="layoutMain">
      <transition name="transition-page" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'layout',
  computed: {
    ...mapState('user', [
      'session',
    ]),
  },
  methods: {
    handleSelect(index) {
      this.$router.push(index);
    },
  },
}
</script>

<style scoped lang="stylus">
.vcContainer
  width: 100%
  height: 100%
  overflow: hidden
  position: relative

.layoutLeft, .layoutMain
  position: absolute

.layoutLeft
  left: 0
  top: 0
  width: 250px
  height: 100%

.layoutMain
  left: 250px
  top: 0
  right: 0
  height: 100%

.leftMenu
  height: 100%
</style>
