<template>
  <ui-section-container key="assignment_detail" v-loading.body="loading">
    <ui-section :title="data.name" width="300px">
      <ui-section-content>
        <p>开始时间：{{ data.begin_at | moment("YYYY-MM-DD HH:mm:ss") }}</p>
        <p>结束时间：{{ data.end_at | moment("YYYY-MM-DD HH:mm:ss") }}</p>
        <p>题量：{{ data.problems.length }} 题</p>
      </ui-section-content>
      <ui-section-content extend>
        <ul>
          <li v-for="(problem, index) in data.problems" class="problem-list_item" :key="problem._id">
            <router-link
              class="problem-list_link"
              :to="{ name: 'AssignmentProblemDetail', params: { aid: $route.params.aid, pid: problem._id } }"
            >
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="12">
                  P{{ index+1 }}
                </el-col>
                <el-col :span="12" class="problem-list_link_tags">
                  <el-tag type="danger" v-if="submissionStates[problem._id] == 0">未回答</el-tag>
                  <el-tag type="warning" v-if="submissionStates[problem._id] > 0 && submissionStates[problem._id] < 1">部分回答</el-tag>
                  <el-tag type="success" v-if="submissionStates[problem._id] == 1">已回答</el-tag>
                </el-col>
              </el-row>
            </router-link>
          </li>
        </ul>
      </ui-section-content>
    </ui-section>
    <transition name="transition-page" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
  </ui-section-container>
</template>

<script>
import { mapState } from 'vuex'
import API from '@/utils/api';

export default {
  name: 'page-assignment-detail',
  data() {
    return {
      data: {
        name: '作业详情',
        problems: [],
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
  computed: {
    ...mapState('assignment', ['submissionStates']),
  },
  methods: {
    async initData() {
      this.loading = true;
      try {
        const assignment = (await API.assignment.detail(this.$route.params.aid)).data;
        this.$store.dispatch('assignment/setAssignment', assignment);
        this.data = assignment;
      } finally {
        this.loading = false;
      }
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

  &_tags
    text-align: right

  &:hover
    background: oc-gray-1

  &.router-link-active
    background: oc-blue-4
    color: #FFF

    .el-tag
      border-color: rgba(#FFF, 0.3)
      color: rgba(#FFF, 0.7)
      background: none

</style>
