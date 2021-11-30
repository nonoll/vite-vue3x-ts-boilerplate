import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext, NavigationFailure } from 'vue-router';

import { PERMISSION_TYPES } from '@/constants/permission.constants';

import { guardAfterEach } from './guard/guardAfterEach';
import { guardBeforeEach } from './guard/guardBeforeEach';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Index.vue')
  },
  {
    path: '/home',
    // @see https://github.com/vitejs/vite/issues/339#issuecomment-639137515
    component: () => import('@/views/Home.vue'),
    meta: {
      permission: PERMISSION_TYPES.ADMIN
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  guardBeforeEach(to, from, next);
});

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized, failure?: NavigationFailure | void) => {
  guardAfterEach(to, from, failure);
});

export default router;
