<template>
  <el-form ref="form" :model="data" label-position="top">
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
      <el-button :disabled="!assignmentId" type="primary" @click="submit()">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import API from '@/utils/api';
import uuid from 'uuid/v4';

export default {
  name: 'page-manage-assignment-detail-problem-form',
  data() {
    return {
      data: this.value,
    };
  },
  props: {
    value: {
      type: Object,
      default() {
        return {
          order: 1,
          visible: true,
          text: '',
          questions: [],
        };
      },
    },
    assignmentId: String,
  },
  watch: {
    value: {
      handler(value) {
        this.data = value;
      },
    },
  },
  methods: {
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
    async submit() {
      if (!this.assignmentId) {
        return;
      }
      if (!this.data._id) {
        const resp = await API.manage.assignment.problem.create(this.assignmentId, this.data);
        this.$emit('create', resp.data);
      } else {
        const resp = await API.manage.assignment.problem.update(this.data._id, this.data);
        this.$emit('update', resp.data);
      }
    },
    cancel() {
      this.$router.go(-1);
    },
  },
}
</script>
