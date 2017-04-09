import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from '@/pages/Login';
import LayoutPage from '@/pages/Layout';
import DashboardPage from '@/pages/Dashboard';
import ManageSubmissionStatusPage from '@/pages/Manage/SubmissionStatus';
import UserLogoutPage from '@/pages/User/Logout';
import ErrorNotFoundPage from '@/pages/Error/NotFound';
import ErrorForbiddenPage from '@/pages/Error/Forbidden';
import store from '@/store';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      component: LoginPage,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/',
      component: LayoutPage,
      children: [
        {
          path: '/',
          component: DashboardPage,
          meta: {
            title: '仪表盘',
            roles: ['admin', 'ta', 'student'],
          },
        },
        {
          path: '/manage/submission-status',
          component: ManageSubmissionStatusPage,
          meta: {
            title: '递交状态',
            roles: ['admin', 'ta'],
          },
        },
        {
          path: '/user/logout',
          component: UserLogoutPage,
          meta: {
            title: '登出',
            roles: ['admin', 'ta', 'student'],
          },
        },
      ],
    },
    {
      path: '/error/forbidden',
      component: ErrorForbiddenPage,
      meta: {
        title: 'Forbidden',
      },
    },
    {
      path: '*',
      component: ErrorNotFoundPage,
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
