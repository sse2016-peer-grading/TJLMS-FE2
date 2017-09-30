<template>
  <ui-section-container key="create_problem">
    <ui-section title="创建题目" width="500px">
      <ui-section-content>
        <problem-edit-form :assignmentId="$route.params.id" @create="handleProblemCreate" @cancel="handleProblemCancel"></problem-edit-form>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
export default {
  name: 'page-manage-assignment-detail-problem-create',
  components: {
    'problem-edit-form': require('./ProblemForm.vue').default,
  },
  methods: {
    handleProblemCreate() {
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: this.$route.params.id }});
    },
    handleProblemCancel() {
      this.$router.go(-1);
    },
  },
}
</script>
