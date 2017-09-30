<template>
  <ui-section-container key="change_password">
    <ui-section title="修改密码" width="300px">
      <ui-section-content v-if="$route.query && $route.query.initial">
        <el-alert title="您是第一次登录，必须修改密码后才能继续操作" type="info" show-icon></el-alert>
      </ui-section-content>
      <ui-section-content>
        <el-form ref="form" :rules="rules" :model="data" label-position="top" @submit.prevent.native="handleSubmit">
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="data.password"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="passwordRepeat">
            <el-input type="password" v-model="data.passwordRepeat"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" nativeType="submit">保存</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
import API from '@/utils/api';

export default {
  name: 'page-change-password',
  data() {
    return {
      data: {
        password: '',
        passwordRepeat: '',
      },
      rules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        passwordRepeat: [
          { required: true, message: '请重复输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        if (this.data.password !== this.data.passwordRepeat) {
          this.$alert('您两次输入的密码不一致', '修改密码失败', {
            type: 'error',
          });
          return;
        }
        await API.user.changePassword(this.data);
        this.$message.success('修改密码成功');
        this.$router.push({ name: 'Dashboard' });
      });
    },
    handleCancel() {
      this.$router.go(-1);
    },
  },
}
</script>
