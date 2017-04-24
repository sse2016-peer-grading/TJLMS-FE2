<template>
  <ui-section-container v-loading.body="loading">
    <ui-section title="所有作业">
      <el-table :data="data" border style="width: 100%">
        <el-table-column label="名称">
          <template scope="scope">
            <router-link :to="{ name: 'ManageAssignmentDetail', params: { id: scope.row._id } }">{{ scope.row.name }}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="可见性" width="100">
          <template scope="scope">
            <el-tag v-if="scope.row.visible" type="success">可见</el-tag>
            <el-tag v-if="!scope.row.visible" type="gray">不可见</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template scope="scope">
            {{ scope.row.begin_at | moment("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template scope="scope">
            {{ scope.row.end_at | moment("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="ID" width="250">
          <template scope="scope">
            <code>{{ scope.row._id }}</code>
          </template>
        </el-table-column>
      </el-table>
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
