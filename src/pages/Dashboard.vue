<template>
  <ui-section-container key="dashboard" v-loading.body="loading">
    <ui-section title="作业列表" width="700px">
      <ui-section-content>
        <div class="typo"><table style="width: 100%">
          <colgroup>
            <col/>
            <col style="width: 200px"/>
            <col style="width: 200px"/>
          </colgroup>
          <thead>
            <tr>
              <th>名称</th>
              <th>开始时间</th>
              <th>结束时间</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="row in data" :key="row._id">
            <td><router-link :to="{ name: 'AssignmentDetail', params: { aid: row._id } }">{{ row.name }}</router-link></td>
            <td>{{ row.begin_at | moment("YYYY-MM-DD HH:mm:ss") }}</td>
            <td>{{ row.end_at | moment("YYYY-MM-DD HH:mm:ss") }}</td>
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
  name: 'page-dashboard',
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
        this.data = (await API.assignment.all()).data;
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>
