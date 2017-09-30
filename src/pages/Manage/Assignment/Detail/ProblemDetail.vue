<template>
  <ui-section-container v-loading.body="loading" :key="data._id">
    <ui-section title="题目详情" width="500px">
      <ui-section-content>
        <problem-edit-form :assignmentId="$route.params.id" @update="handleProblemUpdate" @cancel="handleProblemCancel" :value="data"></problem-edit-form>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
import API from '@/utils/api';
import _ from 'lodash';

export default {
  name: 'page-manage-assignment-detail-problem-detail',
  components: {
    'problem-edit-form': require('./ProblemForm.vue').default,
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
        const assignment = (await API.manage.assignment.detail(this.$route.params.id)).data;
        this.data = _.find(assignment.problems, { _id: this.$route.params.pid });
      } finally {
        this.loading = false;
      }
    },
    handleProblemUpdate() {
      this.$message.success('题目保存成功');
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: this.$route.params.id }});
    },
    handleProblemCancel() {
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: this.$route.params.id }});
    },
  },
}
</script>
