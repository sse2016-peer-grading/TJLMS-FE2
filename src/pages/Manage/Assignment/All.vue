<template>
  <ui-section-container key="assignment_all" v-loading.body="loading">
    <ui-section title="所有作业">
      <ui-section-content>
        <el-table :data="data" border style="width: 100%">
          <el-table-column key="name" label="名称">
            <template scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column key="action" label="操作">
            <template scope="scope">
              <router-link :to="{ name: 'ManageAssignmentDetail', params: { id: scope.row._id } }">编辑</router-link> |
              <router-link target="_blank" :to="{ name: 'ManageAssignmentSubmissions', params: { aid: scope.row._id } }">递交情况</router-link>
            </template>
          </el-table-column>
          <el-table-column key="visible" label="可见性" width="100">
            <template scope="scope">
              <el-tag v-if="scope.row.visible" type="success">可见</el-tag>
              <el-tag v-if="!scope.row.visible" type="gray">不可见</el-tag>
            </template>
          </el-table-column>
          <el-table-column key="begin_at" label="开始时间" width="200">
            <template scope="scope">
              {{ scope.row.begin_at | moment("YYYY-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column key="end_at" label="结束时间" width="200">
            <template scope="scope">
              {{ scope.row.end_at | moment("YYYY-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column key="id" label="ID" width="250">
            <template scope="scope">
              <code>{{ scope.row._id }}</code>
            </template>
          </el-table-column>
        </el-table>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
import API from '@/utils/api';

export default {
  name: 'page-manage-assignment-all',
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
    async initData() {
      this.loading = true;
      try {
        this.data = (await API.manage.assignment.all()).data;
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>
