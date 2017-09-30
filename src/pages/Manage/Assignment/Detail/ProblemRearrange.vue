<template>
  <ui-section-container key="manage_rearrange_problems" v-loading.body="loading">
    <ui-section title="重新排列" width="300px">
      <ui-section-content extend>
        <draggable v-model="data">
          <transition-group>
          <div v-for="p in data" :key="p._id" class="problem-list_item">
            <p>P{{ p._ordered_index }}</p>
            <div class="problem-list_item_description">{{ p.text }}</div>
          </div>
          </transition-group>
        </draggable>
      </ui-section-content>
      <ui-section-content>
        <el-button type="primary" @click="handleSaveClick">保存顺序</el-button>
        <el-button @click="handleCancelClick">取消</el-button>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
import API from '@/utils/api';
import _ from 'lodash';

export default {
  name: 'page-manage-assignment-detail-problem-rearrange',
  components: {
    draggable: require('vuedraggable'),
  },
  data() {
    return {
      data: [],
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
    sortProblems(problems) {
      if (!problems) {
        return problems;
      }
      return _
        .orderBy(problems, ['order'], ['asc'])
        .map((p, idx) => ({...p, _ordered_index: idx}));
    },
    async initData() {
      this.loading = true;
      try {
        const assignment = (await API.manage.assignment.detail(this.$route.params.id)).data;
        const problems = assignment.problems;
        this.data = this.sortProblems(problems);
      } finally {
        this.loading = false;
      }
    },
    handleCancelClick() {
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: this.$route.params.id }});
    },
    async handleSaveClick() {
      const submitData = this.data.map((p, idx) => ({...p, order: idx}));
      await API.manage.assignment.problem.rearrange({ problems: submitData });
      this.$message.success('顺序修改成功');
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: this.$route.params.id }});
    },
  },
}
</script>

<style scoped lang="stylus">
.problem-list_item
  display: block
  padding: 10px
  border-bottom: 1px solid oc-gray-3
  color: #666
  transition: all .5s ease-out-cubic

  &_description
    font-size: 0.85em
    line-height: 12px
    max-height: 36px
    overflow: hidden
    margin-top: 5px
    color: #999
    white-space: pre
</style>
