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
      component: require('@/pages/Login').default,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/',
      component: require('@/pages/Layout').default,
      children: [
        {
          path: '/',
          component: require('@/pages/Dashboard').default,
          name: 'Dashboard',
          meta: {
            title: '作业列表',
            roles: ['admin', 'ta', 'student'],
          },
        },
        {
          path: '/assignment/:aid',
          component: require('@/pages/Assignment').default,
          name: 'AssignmentDetail',
          meta: {
            title: '作业详情',
            roles: ['admin', 'ta', 'student'],
          },
          children: [
            {
              path: '/assignment/:aid/problem/:pid',
              component: require('@/pages/Assignment/Problem').default,
              name: 'AssignmentProblemDetail',
              meta: {
                title: '题目详情',
                roles: ['admin', 'ta', 'student'],
              },
            },
          ],
        },
        {
          path: '/manage/assignments',
          component: () => import(/* webpackChunkName: "chunk-manage" */ '@/pages/Manage/Assignment/All'),
          name: 'ManageAssignmentAll',
          meta: {
            title: '所有作业',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/manage/assignments/:aid/submissions',
          component: () => import(/* webpackChunkName: "chunk-manage" */ '@/pages/Manage/Submission/All'),
          name: 'ManageAssignmentSubmissions',
          meta: {
            title: '作业递交状态',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/manage/assignments/create',
          component: () => import(/* webpackChunkName: "chunk-manage" */ '@/pages/Manage/Assignment/Create'),
          meta: {
            title: '创建作业',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/manage/assignments/:id',
          component: () => import(/* webpackChunkName: "chunk-manage" */ '@/pages/Manage/Assignment/Detail'),
          name: 'ManageAssignmentDetail',
          meta: {
            title: '作业信息',
            roles: ['admin', 'ta'],
          },
          children: [
            {
              path: '/manage/assignments/:id/problem/create',
              component: () => import(/* webpackChunkName: "chunk-manage" */ '@/pages/Manage/Assignment/Detail/ProblemCreate'),
              name: 'ManageAssignmentDetailProblemCreate',
              meta: {
                roles: ['admin', 'ta'],
              },
            },
            {
              path: '/manage/assignments/:id/problem/rearrange',
              component: () => import(/* webpackChunkName: "chunk-manage" */ '@/pages/Manage/Assignment/Detail/ProblemRearrange'),
              name: 'ManageAssignmentDetailProblemRearrange',
              meta: {
                roles: ['admin', 'ta'],
              },
            },
            {
              path: '/manage/assignments/:id/problem/:pid',
              component: () => import(/* webpackChunkName: "chunk-manage" */ '@/pages/Manage/Assignment/Detail/ProblemDetail'),
              name: 'ManageAssignmentDetailProblemDetail',
              meta: {
                roles: ['admin', 'ta'],
              },
            },
          ],
        },
        {
          path: '/manage/submissions/:id',
          component: () => import(/* webpackChunkName: "chunk-manage" */ '@/pages/Manage/Submission/Detail'),
          name: 'ManageAssignmentSubmissionDetail',
          meta: {
            title: '递交详情',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/user/changePassword',
          component: require('@/pages/User/ChangePassword').default,
          meta: {
            title: '修改密码',
            roles: ['admin', 'ta', 'student'],
          },
        },
        {
          path: '/user/logout',
          component: require('@/pages/User/Logout').default,
          meta: {
            title: '登出',
            roles: ['admin', 'ta', 'student'],
          },
        },
      ],
    },
    {
      path: '/error/forbidden',
      component: require('@/pages/Error/Forbidden').default,
      meta: {
        title: 'Forbidden',
      },
    },
    {
      path: '*',
      component: require('@/pages/Error/NotFound').default,
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
    try {
      if (store.state.user.session.first && to.path !== '/user/changePassword') {
        return '/user/changePassword?initial=true';
      }
    } catch (ignore) {
    }
  } catch (err) {
    if (err.response.status === 401) {
      return '/login';
    }
    return false;
  }
}

router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

router.beforeResolve((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | TJLMS`;
  }
  checkAuth(to)
    .catch(err => console.error(err))
    .then(r => next(r));
  ;
});

export default router;
