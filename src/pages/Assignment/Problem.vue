<template>
  <ui-section-container :key="$route.params.pid" v-loading.body="loading">
    <ui-section title="题目详情" width="500px" class="problem_container">
      <div class="problem_content">
        <ui-section-content>
          <ui-markdown :markdown="data.text"></ui-markdown>
          <div :key="qdoc._id" v-for="(qdoc, index) in data.questions" class="question_item">
            <hr/>
            <div>Q{{ index+1 }}:</div>
            <ui-markdown :markdown="qdoc.text"></ui-markdown>
            <el-input
              type="textarea" class="ui-mono" spellcheck="false"
              :disabled="data.read_only" v-model="answers[qdoc._id]"
              :autosize="{ minRows: 2, maxRows: 7 }"
              @input="handleInput"
            ></el-input>
          </div>
        </ui-section-content>
      </div>
      <div class="problem_toolbar">
        <el-button :loading="submitting" :disabled="!changed || data.read_only" type="primary" @click="handleSaveClick(false)">保存</el-button>
        <span class="problem_toolbar_item" v-if="lastSubmitAt">最后保存于 {{ lastSubmitAt | moment("YYYY-MM-DD HH:mm:ss") }}</span>
        <span class="problem_toolbar_item" v-if="!data.read_only">每分钟自动保存</span>
      </div>
    </ui-section>
  </ui-section-container>
</template>

<script>
import _ from 'lodash';
import API from '@/utils/api';

const leaveConfirmText = '您还有未保存的答案，关闭后将丢失，仍然要继续关闭吗？';

export default {
  name: 'page-assignment-problem-detail',
  data() {
    return {
      data: {
        text: '加载中',
        questions: [],
        read_only: true,
      },
      answers: {},
      loading: false,
      changed: false,
      submitting: false,
      lastSubmitAt: null,
      autoSaveTimer: null,
    };
  },
  created() {
    this.initData();
  },
  watch: {
    $route: 'initData',
    changed(val) {
      if (val) {
        this.deferAutoSave();
      } else {
        this.cancelAutoSave();
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.handleLeave(next);
  },
  beforeRouteLeave(to, from, next) {
    this.handleLeave(next);
  },
  methods: {
    async initData() {
      this.loading = true;
      try {
        const data = (await API.assignment.problem.detail(this.$route.params.aid, this.$route.params.pid)).data;
        this.data = data;
        if (data.submission) {
          this.answers = _.fromPairs(
            data.submission.answers.map(adoc => [adoc.question_id, adoc.text])
          );
          this.lastSubmitAt = data.submission.updated_at;
        }
      } finally {
        this.loading = false;
      }
    },
    async handleSaveClick(isAutoSave) {
      if (this.submitting) {
        return;
      }
      this.submitting = true;
      const submitData = _
        .toPairs(this.answers)
        .map(pair => ({ question_id: pair[0], text: pair[1] }));
      try {
        const submission = (await API.assignment.problem.submit(this.$route.params.aid, this.$route.params.pid, submitData)).data;
        this.$store.dispatch('assignment/updateSubmission', submission);
        this.changed = false;
        this.lastSubmitAt = Date.now();
      } catch (e) {
        this.$notify.error({
          title: '保存答案失败',
          message: '未能' + (isAutoSave ? '自动' : '') + '保存此答案，错误信息：' + e.message,
        });
      } finally {
        this.submitting = false;
      }
    },
    async handleInput() {
      this.changed = true;
    },
    deferAutoSave() {
      if (this.autoSaveTimer) {
        return;
      }
      window.onbeforeunload = () => leaveConfirmText;
      this.autoSaveTimer = setInterval(() => this.handleSaveClick(true), 60*1000);
    },
    cancelAutoSave() {
      window.onbeforeunload = undefined;
      if (this.autoSaveTimer) {
        clearInterval(this.autoSaveTimer);
      }
      this.autoSaveTimer = null;
    },
    handleLeave(next) {
      if (this.changed) {
        if (!confirm(leaveConfirmText)) {
          return;
        }
      }
      this.cancelAutoSave();
      next();
    },
  },
}
</script>

<style scoped lang="stylus">
.question_item
  .markdown-content
    margin-top: 10px

.problem_content
  flex: 1
  overflow: scroll

.problem_toolbar
  padding: 10px
  background: #f0f0f0

  &_item
    font-size: 13px
    margin-left: 10px
</style>

<style lang="stylus">
.problem_container .section_body
  overflow: hidden
  display: flex
  flex-direction: column
</style>
