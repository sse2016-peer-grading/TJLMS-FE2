<template>
  <ui-section-container key="assignment_creare">
    <ui-section title="创建作业" width="300px">
      <ui-section-content>
        <edit-form @create="handleCreate"></edit-form>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
export default {
  name: 'page-manage-assignment-create',
  components: {
    'edit-form': require('./Form.vue'),
  },
  methods: {
    handleCreate(data) {
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: data._id }});
    },
  },
}
</script>
