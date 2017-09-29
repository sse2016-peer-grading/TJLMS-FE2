<template>
  <ui-section-container v-loading.body="loading" key="submission_all">
    <ui-section :title="`${data.adoc.name} 递交状态`">
      <ui-section-content>
        <!--<el-table :data="data.udocs" border style="width: 100%" class="status_table">
          <el-table-column label="姓名" width="100">
            <template scope="scope">
              {{ scope.row.realname }}
            </template>
          </el-table-column>
          <el-table-column label="学号" width="100">
            <template scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column
            v-for="(pdoc, index) in data.pdocs"
            :label="`P${index+1}`"
            :key="pdoc._id"
            width="80"
          >
            <template scope="scope">
              <router-link
                target="_blank"
                :to="{ name: 'ManageAssignmentSubmissionDetail', params: { id: getUserSubmissionId(pdoc._id, scope.row._id) } }"
                :class="getUserStatusClassName(pdoc._id, scope.row._id)"
              >
                {{ getUserStatus(pdoc._id, scope.row._id) }}%
              </router-link>
            </template>
          </el-table-column>
        </el-table>-->
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
import _ from 'lodash';
import API from '@/utils/api';

export default {
  name: 'page-manage-submission-all',
  data() {
    return {
      data: {
        udocs: [],
        pdocs: [],
        ssdocs_by_pid_uid: {},
        adoc: {
          name: '(Loading)',
        },
      },
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
        this.data = (await API.manage.submission.all(this.$route.params.aid)).data;
        this.data.ssdocs_by_pid_uid = _.keyBy(this.data.ssdocs, ssdoc => `${ssdoc.problem_id}_${ssdoc.user_id}`);
      } finally {
        this.loading = false;
      }
    },
    getUserSubmissionId(pid, uid) {
      const key = `${pid}_${uid}`;
      if (this.data.ssdocs_by_pid_uid[key]) {
        return this.data.ssdocs_by_pid_uid[key]._id;
      } else {
        return '_';
      }
    },
    getUserStatus(pid, uid) {
      const key = `${pid}_${uid}`;
      let v = 0;
      if (this.data.ssdocs_by_pid_uid[key]) {
        v = this.data.ssdocs_by_pid_uid[key].complete;
      }
      return Math.floor(v * 100);
    },
    getUserStatusClassName(pid, uid) {
      const v = this.getUserStatus(pid, uid);
      return ['status', `status_${v}`];
    },
  },
}
</script>

<style scoped lang="stylus">
.status_table
  .cell, .status
    padding: 0
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%

  .status
    display: block
    background: oc-yellow-4
    text-align: center
    text-decoration: none !important
    color: #FFF !important

  .status_0
    background: oc-red-5
    cursor: default

  .status_100
    background: none
    color: #000 !important
</style>
