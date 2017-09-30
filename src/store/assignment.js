import Vue from 'vue';
import _ from 'lodash';

export default {
  namespaced: true,
  state: {
    problems: {},
    submissions: {},
    submissionStates: {},
  },
  mutations: {
    setAssignment(state, assignment) {
      state.problems = _.keyBy(assignment.problems, '_id');
      state.submissions = _.keyBy(assignment.submissions, 'problem_id');
      state.submissionStates = {};
    },
    setSubmission(state, submission) {
      state.submissions[submission.problem_id] = submission;
    },
    updateSubmissionState(state) {
      state.submissionStates = {};
      for (let pid in state.problems) {
        const pdoc = state.problems[pid];
        if (pdoc.questions.length === 0) {
          state.submissionStates[pid] = 1;
          continue;
        }
        let answeredQuestions = 0;
        const submission = state.submissions[pdoc._id];
        if (submission) {
          const answers = _.keyBy(submission.answers, 'question_id');
          answeredQuestions = pdoc.questions.reduce((acc, qdoc) => {
            const answer = answers[qdoc._id];
            let value;
            if (answer && answer.text && answer.text.trim().length > 0) {
              value = 1;
            } else {
              value = 0;
            }
            return acc + value;
          }, 0);
        }
        state.submissionStates[pid] = answeredQuestions / pdoc.questions.length;
      }
    },
  },
  actions: {
    setAssignment({ commit }, assignment) {
      commit('setAssignment', assignment);
      commit('updateSubmissionState');
    },
    updateSubmission({ commit }, submission) {
      commit('setSubmission', submission);
      commit('updateSubmissionState');
    },
  },
}
