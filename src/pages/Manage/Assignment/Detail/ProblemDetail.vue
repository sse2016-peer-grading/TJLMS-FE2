<template>
  <ui-section-container v-loading.body="loading" :key="data._id">
    <ui-section title="题目详情" width="500px">
      <ui-section-content>
        <el-form ref="form" :model="data" label-position="top">
          <el-form-item key="id" label="ID">
            <el-input v-model="data._id" disabled></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="11">
              <el-form-item label="排序编号">
                <el-input v-model="data.order"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="可见">
                <el-switch on-text="" off-text="" v-model="data.visible"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="题目">
            <el-input type="textarea" v-model="data.text" :autosize="{ minRows: 2 }" class="ui-mono"></el-input>
          </el-form-item>
          <transition-group name="transition-highlight">
            <el-form-item v-for="(question, idx) in data.questions" :key="question._id" :label="`问题 ${idx + 1}`">
              <p>
                <span>
                  ID:
                  <span v-if="question.is_new">(New) {{ question._id }}</span>
                  <span v-if="!question.is_new">{{ question._id }}</span>
                </span>
                <a href="javascript:;" @click="insertQuestion(idx)">插入</a>
                <a href="javascript:;" @click="deleteQuestion(idx)">删除</a>
              </p>
              <el-input type="textarea" v-model="question.text" :autosize="{ minRows: 2 }" class="ui-mono"></el-input>
            </el-form-item>
          </transition-group>
          <el-form-item>
            <el-button @click="appendQuestion()">添加问题</el-button>
            <el-button disabled @click="submit()">保存</el-button>
            <el-button disabled @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </ui-section-content>
    </ui-section>
  </ui-section-container>
</template>

<script>
import API from '@/utils/api';
import _ from 'lodash';
import uuid from 'uuid/v4';

export default {
  name: 'page-manage-assignment-detail-problem-detail',
  data() {
    return {
      data: {},
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
        const assignment = (await API.manage.assignment.detail(this.$route.params.id)).data;
        this.data = _.find(assignment.problems, { _id: this.$route.params.pid });
      } finally {
        this.loading = false;
      }
    },
    insertQuestion(index) {
      this.data.questions.splice(index, 0, {
        _id: uuid(),
        text: '',
        is_new: true,
      });
    },
    appendQuestion() {
      this.data.questions.push({
        _id: uuid(),
        text: '',
        is_new: true,
      });
    },
    deleteQuestion(index) {
      this.data.questions.splice(index, 1);
    },
    submit() {

    },
    cancel() {

    },
  },
}
</script>
