<template>
  <ui-section-container key="assignment_detail" v-loading.body="loading">
    <ui-section title="作业信息" width="300px">
      <ui-section-content>
        <edit-form @update="handleUpdate" :value="data"></edit-form>
      </ui-section-content>
    </ui-section>
    <ui-section title="题目" width="300px">
      <ui-section-content>
        <el-button type="primary" @click="createProblem()">添加题目</el-button>
      </ui-section-content>
      <ui-section-content extend>
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
import _ from 'lodash';

export default {
  name: 'page-manage-assignment-detail',
  components: {
    'edit-form': require('../Form.vue'),
  },
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
    createProblem() {
      this.$router.push({ name: 'ManageAssignmentDetailCreateProblem', params: { id: this.$route.params.id }});
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
