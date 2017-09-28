import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      component: require('@/pages/Login'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/',
      component: require('@/pages/Layout'),
      children: [
        {
          path: '/',
          component: require('@/pages/Dashboard'),
          name: 'Dashboard',
          meta: {
            title: '仪表盘',
            roles: ['admin', 'ta', 'student'],
          },
        },
        {
          path: '/manage/assignments',
          component: require('@/pages/Manage/Assignment/All'),
          meta: {
            title: '所有作业',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/manage/assignments/:aid/submissions',
          component: require('@/pages/Manage/Submission/All'),
          name: 'ManageAssignmentSubmissions',
          meta: {
            title: '作业递交状态',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/manage/assignments/create',
          component: require('@/pages/Manage/Assignment/Create'),
          meta: {
            title: '创建作业',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/manage/assignments/:id',
          component: require('@/pages/Manage/Assignment/Detail'),
          name: 'ManageAssignmentDetail',
          meta: {
            title: '作业信息',
            roles: ['admin', 'ta'],
          },
          children: [
            {
              path: '/manage/assignments/:id/problem/create',
              component: require('@/pages/Manage/Assignment/Detail/ProblemCreate'),
              name: 'ManageAssignmentDetailCreateProblem',
              meta: {
                roles: ['admin', 'ta'],
              },
            },
            {
              path: '/manage/assignments/:id/problem/:pid',
              component: require('@/pages/Manage/Assignment/Detail/ProblemDetail'),
              name: 'ManageAssignmentDetailProblemDetail',
              meta: {
                roles: ['admin', 'ta'],
              },
            },
          ],
        },
        {
          path: '/manage/submissions/:id',
          component: require('@/pages/Manage/Submission/Detail'),
          name: 'ManageAssignmentSubmissionDetail',
          meta: {
            title: '递交详情',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/user/logout',
          component: require('@/pages/User/Logout'),
          meta: {
            title: '登出',
            roles: ['admin', 'ta', 'student'],
          },
        },
      ],
    },
    {
      path: '/error/forbidden',
      component: require('@/pages/Error/Forbidden'),
      meta: {
        title: 'Forbidden',
      },
    },
    {
      path: '*',
      component: require('@/pages/Error/NotFound'),
      meta: {
        title: 'Page Not Found',
      },
    }
  ],
});

async function checkAuth(to) {
  if (!to.meta.roles) {
    return;
  }
  try {
    await store.dispatch('user/initSession');
    if (to.meta.roles.indexOf(store.state.user.session.role) === -1) {
      return '/error/forbidden';
    }
  } catch (err) {
    if (err.response.status === 401) {
      return '/login';
    }
    return false;
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | TJ-LMS`;
  }
  checkAuth(to)
    .catch(err => console.error(err))
    .then(r => next(r));
  ;
});

export default router;
