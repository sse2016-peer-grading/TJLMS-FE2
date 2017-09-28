<template>
  <ui-section-container key="create_problem">
    <ui-section title="创建题目" width="500px">
      <ui-section-content>
        <edit-form :assignmentId="$route.params.id" @create="handleCreate"></edit-form>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
export default {
  name: 'page-manage-assignment-detail-problem-create',
  components: {
    'edit-form': require('./ProblemForm.vue'),
  },
  methods: {
    handleCreate() {
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: this.$route.params.id }});
    },
  },
}
</script>
