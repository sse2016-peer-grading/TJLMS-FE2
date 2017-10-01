<template>
  <ui-section-container v-loading.body="loading" key="submission_all">
    <ui-section :title="`${data.adoc.name} 递交状态`">
      <ui-section-content>
        <div class="typo"><table style="width: 100%" class="status_table">
          <colgroup>
            <col style="width: 100px"/>
            <col style="width: 100px"/>
            <col v-for="pdoc in data.pdocs" :key="pdoc._id" />
          </colgroup>
          <thead>
            <tr>
              <th>姓名</th>
              <th>学号</th>
              <th v-for="(pdoc, index) in data.pdocs" :key="pdoc._id">P{{ index+1 }}</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="row in data.udocs" :key="row._id">
            <td>{{ row.realname }}</td>
            <td>{{ row.username }}</td>
            <td v-for="(pdoc, index) in data.pdocs" :key="pdoc._id" class="submission_cell">
              <router-link
                target="_blank"
                :to="{ name: 'ManageAssignmentSubmissionDetail', params: { id: getUserSubmissionId(pdoc._id, row._id) } }"
                :class="getUserStatusClassName(pdoc._id, row._id)"
                v-if="getUserSubmissionId(pdoc._id, row._id)"
              >
                {{ getUserStatus(pdoc._id, row._id) }}%
              </router-link>
              <span
                :class="getUserStatusClassName(pdoc._id, row._id)"
                v-if="!getUserSubmissionId(pdoc._id, row._id)"
              >
                {{ getUserStatus(pdoc._id, row._id) }}%
              </span>
            </td>
          </tr>
          </tbody>
        </table></div>
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
        adoc: {
          name: '(Loading)',
        },
      },
      pdocs_by_pid: {},
      ssdocs_by_pid_uid: {},
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
        this.pdocs_by_pid = _.keyBy(this.data.pdocs, '_id');
        this.ssdocs_by_pid_uid = _.keyBy(this.data.ssdocs, ssdoc => `${ssdoc.problem_id}_${ssdoc.user_id}`);
      } finally {
        this.loading = false;
      }
    },
    getUserSubmissionId(pid, uid) {
      const key = `${pid}_${uid}`;
      if (this.ssdocs_by_pid_uid[key]) {
        return this.ssdocs_by_pid_uid[key]._id;
      } else {
        return '';
      }
    },
    getUserStatus(pid, uid) {
      if (this.pdocs_by_pid[pid].questions.length === 0) {
        return 100;
      }
      const key = `${pid}_${uid}`;
      let v = 0;
      if (this.ssdocs_by_pid_uid[key]) {
        v = this.ssdocs_by_pid_uid[key].complete;
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
  .submission_cell
    position: relative
    padding: 0

  .status
    display: flex
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: oc-yellow-4
    justify-content: center
    flex-direction: column
    text-align: center
    text-decoration: none !important
    color: #FFF !important

  .status_0
    background: oc-red-5

  .status_100
    background: none
    color: #000 !important
</style>
