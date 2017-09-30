<template>
  <ui-section-container v-loading.body="loading" key="submission_all">
    <ui-section :title="`${data.udoc.realname} (${data.udoc.username}) 在 ${data.adoc.name} 的递交详情`" width="500px">
      <ui-section-content>
        <ui-markdown :markdown="data.pdoc.text"></ui-markdown>>
        <div :key="qdoc._id" v-for="(qdoc, index) in data.pdoc.questions" class="question_item">
          <div class="title">Q{{ index+1 }}:</div>
          <ui-markdown :markdown="qdoc.text"></ui-markdown>>
          <div class="title">A{{ index+1 }}:</div>
          <pre>{{ getAnswer(qdoc._id) }}</pre>
        </div>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
import _ from 'lodash';
import API from '@/utils/api';

export default {
  name: 'page-manage-submission-all',
  data() {
    return {
      data: {
        adoc: {
          name: '(Loading)',
        },
        pdoc: {
          text: 'Loading',
          questions: [],
        },
        udoc: {
          realname: '(Loading)',
          username: '(Loading)',
        },
      },
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
        this.data = (await API.manage.submission.detail(this.$route.params.id)).data;
      } finally {
        this.loading = false;
      }
    },
    getAnswer(qid) {
      const adoc = _.find(this.data.sdoc.answers, { question_id: qid });
      if (!adoc) {
        return '(未填写)';
      } else {
        return adoc.text;
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.question_item
  border-top: 1px solid #DDD
  padding: 10px 0
  margin: 10px 0

  line-height: 1.2

  .title
    margin-top: 10px
    margin-bottom: 5px
    font-weight: bold

  pre
    margin: 0
    padding: 0
    white-space: pre-wrap
</style>
