<template>
  <ui-section-container v-loading.body="loading">
    <ui-section title="题目详情" width="500px">
      <el-form ref="form" :model="data" label-position="top">
        <el-form-item label="ID">
          <el-input v-model="data._id" disabled></el-input>
        </el-form-item>
        <el-form-item label="可见">
          <el-switch on-text="" off-text="" v-model="data.visible"></el-switch>
        </el-form-item>
        <el-form-item label="排序编号">
          <el-input v-model="data.order"></el-input>
        </el-form-item>
        <el-form-item label="题目">
          <el-input type="textarea" v-model="data.text" :autosize="{ minRows: 2 }" class="ui-mono"></el-input>
        </el-form-item>
      </el-form>
    </ui-section>
  </ui-section-container>
</template>

<script>
import API from '@/utils/api';
import _ from 'lodash';

export default {
  name: 'page-manage-assignment-detail-problem-detail',
  data() {
    return {
      data: {},
      loading: false,
    };
  },
  created() {
    this.initData();
  },
  watch: {
    $route: 'initData',
  },
  methods: {
    async initData() {
      this.loading = true;
      try {
        const assignment = (await API.manage.assignment.detail(this.$route.params.id)).data;
        this.data = _.find(assignment.problems, { _id: this.$route.params.pid });
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>
