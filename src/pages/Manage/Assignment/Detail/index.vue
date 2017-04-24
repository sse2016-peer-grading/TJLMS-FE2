<template>
  <ui-section-container v-loading.body="loading">
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
      <ui-section-content>
        <ul>
          <li v-for="(problem, index) in sortProblems(data.problems)" class="problem-list_item">
            <router-link
              class="problem-list_link"
              :to="{ name: 'ManageAssignmentDetailProblemDetail', params: { id: $route.params.id, pid: problem._id } }"
            >
              <p>
                P{{ index+1 }} (index {{ problem._index }})
              </p>
              <p>
                {{ problem.questions.length }} 个问题
                <el-tag type="gray" v-if="!problem.visible">不可见</el-tag>
              </p>
            </router-link>
          </li>
        </ul>
      </ui-section-content>
    </ui-section>
    <transition name="transition-page" mode="out-in">
      <router-view></router-view>
    </transition>
  </ui-section-container>
</template>

<script>
import API from '@/utils/api';
import moment from 'moment';
import _ from 'lodash';

export default {
  name: 'page-manage-assignment-detail',
  data() {
    return {
      data: {},
      loading: false,
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
      this.loading = true;
      try {
        this.data = (await API.manage.assignment.detail(this.$route.params.id)).data;
      } finally {
        this.loading = false;
      }
    },
    sortProblems(problems) {
      if (!problems) {
        return problems;
      }
      return _(problems)
        .map((p, idx) => ({...p, _index: idx}))
        .orderBy(['order'], ['asc'])
        .value();
    },
  },
}
</script>

<style scoped lang="stylus">
.problem-list_link
  display: block
  padding: 10px
  border-bottom: 1px solid oc-gray-3
  color: #666
  transition: background .1s linear

  &:hover
    background: oc-gray-1

  &.router-link-active
    background: oc-blue-4
    color: #FFF
</style>
