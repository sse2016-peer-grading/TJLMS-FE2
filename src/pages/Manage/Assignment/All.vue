<template>
  <ui-section-container key="manage_assignment_all" v-loading.body="loading">
    <ui-section title="所有作业">
      <ui-section-content>
        <div class="typo"><table style="width: 100%">
          <colgroup>
            <col/>
            <col/>
            <col style="width: 100px"/>
            <col style="width: 200px"/>
            <col style="width: 200px"/>
            <col style="width: 250px"/>
          </colgroup>
          <thead>
            <tr>
              <th>名称</th>
              <th>操作</th>
              <th>可见性</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="row in data" :key="row._id">
            <td>{{ row.name }}</td>
            <td>
              <router-link :to="{ name: 'ManageAssignmentDetail', params: { id: row._id } }">编辑</router-link> |
              <router-link target="_blank" :to="{ name: 'ManageAssignmentSubmissions', params: { aid: row._id } }">递交情况</router-link>
            </td>
            <td>
              <el-tag v-if="row.visible" type="success">可见</el-tag>
              <el-tag v-if="!row.visible" type="gray">不可见</el-tag>
            </td>
            <td>{{ row.begin_at | moment("YYYY-MM-DD HH:mm:ss") }}</td>
            <td>{{ row.end_at | moment("YYYY-MM-DD HH:mm:ss") }}</td>
            <td><code>{{ row._id }}</code></td>
          </tr>
          </tbody>
        </table></div>
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
