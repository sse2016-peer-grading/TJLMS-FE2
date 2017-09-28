<template>
  <el-form ref="form" :model="data" :rules="rules" label-position="top">
    <el-form-item label="ID" v-if="data._id">
      <el-input v-model="data._id" disabled></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="data.name"></el-input>
    </el-form-item>
    <el-form-item label="时间">
      <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围" style="width: 100%"></el-date-picker>
    </el-form-item>
    <el-form-item label="可见">
      <el-switch on-text="" off-text="" v-model="data.visible"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit()">保存</el-button>
      <el-button @click="cancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from 'moment';
import API from '@/utils/api';

export default {
  name: 'page-manage-assignment-form',
  data() {
    return {
      data: this.value,
      rules: {
        name: [
          { required: true, message: '请输入作业名称', trigger: 'blur' },
        ],
      },
    };
  },
  props: {
    value: {
      type: Object,
      default() {
        return {
          name: 'New Assignment',
          visible: false,
          begin_at: moment().startOf('day').valueOf(),
          end_at: moment().endOf('day').valueOf(),
        };
      },
    },
  },
  computed: {
    dateRange: {
      get() {
        return [this.data.begin_at, this.data.end_at];
      },
      set([ tBegin, tEnd ]) {
        this.data.begin_at = moment(tBegin).startOf('day').valueOf();
        this.data.end_at = moment(tEnd).endOf('day').valueOf();
      },
    }
  },
  watch: {
    value: {
      handler(value) {
        this.data = value;
      },
    },
  },
  methods: {
    submit() {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        if (!this.data._id) {
          const resp = await API.manage.assignment.create(this.data);
          this.$emit('create', resp.data);
        } else {
          alert('not implemented');
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
}
</script>
