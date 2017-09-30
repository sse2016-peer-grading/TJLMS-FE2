<template>
  <ui-section-container key="assignment_creare">
    <ui-section title="创建作业" width="300px">
      <ui-section-content>
        <assignment-edit-form @create="handleAssignmentCreate" @cancel="handleAssignmentCancel"></assignment-edit-form>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
export default {
  name: 'page-manage-assignment-create',
  components: {
    'assignment-edit-form': require('./Form.vue').default,
  },
  methods: {
    handleAssignmentCreate(data) {
      this.$router.push({ name: 'ManageAssignmentDetail', params: { id: data._id }});
    },
    handleAssignmentCancel() {
      this.$router.go(-1);
    },
  },
}
</script>
