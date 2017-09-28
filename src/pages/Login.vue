<template>
  <el-row type="flex" justify="center" align="middle" class="vcContainer">
    <el-col :md="6"><el-card>
      <div slot="header">
        <h1>登录系统</h1>
      </div>
      <el-form ref="form" :model="form" :rules="formRules" label-width="80" @submit.prevent.native="handleSubmit">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" nativeType="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card></el-col>
  </el-row>
</template>

<script>
import API from '@/utils/api';

export default {
  name: 'page-login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return;
        }
        try {
          await API.user.login(this.form);
          this.$router.replace({ name: 'Dashboard' });
        } catch (err) {
          this.$message.error(err.message);
        }
      });
    },
  },
}
</script>

<style scoped lang="stylus">
.vcContainer
  background: #222
</style>
