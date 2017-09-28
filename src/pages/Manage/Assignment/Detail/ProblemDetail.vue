<template>
  <ui-section-container v-loading.body="loading" :key="data._id">
    <ui-section title="题目详情" width="500px">
      <ui-section-content>
        <edit-form :assignmentId="$route.params.id" @update="handleUpdate" :value="data"></edit-form>
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
    'edit-form': require('./ProblemForm.vue'),
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
    handleUpdate() {
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: this.$route.params.id }});
    },
  },
}
</script>
