<template>
  <ui-section-container>
    <ui-section title="作业信息" width="300px">
      <el-form ref="form" :model="data" label-position="top">
        <el-form-item label="ID">
          <el-input v-model="data._id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="可见">
          <el-switch on-text="" off-text="" v-model="data.visible"></el-switch>
        </el-form-item>
      </el-form>
    </ui-section>
    <ui-section title="题目" width="300px">
      aaa
    </ui-section>
  </ui-section-container>
</template>

<script>
import API from '@/utils/api';
import moment from 'moment';

export default {
  name: 'page-manage-assignment-create',
  data() {
    return {
      data: {},
      datevalue: null,
    };
  },
  computed: {
    dateRange: {
      get() {
        return [this.data.begin_at, this.data.end_at];
      },
      set([ tBegin, tEnd ]) {
        this.data.begin_at = moment(tBegin).startOf('day').toDate();
        this.data.end_at = moment(tEnd).endOf('day').toDate();
      },
    },
  },
  created() {
    this.initData();
  },
  watch: {
    $route: 'initData',
  },
  methods: {
    async initData() {
      this.data = (await API.manage.assignment.detail(this.$route.params.id)).data;
      console.log(this.data);
    },
  },
}
</script>
