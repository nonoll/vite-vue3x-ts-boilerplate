import {RouteLocationNormalized, NavigationGuardNext} from 'vue-router';

import {RouteMeta} from '../types';

import memberStore from '@/store/member';

const guardPermission = (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const {meta} = to as RouteMeta;

  // ! permission 설정이 없거나, permission 이 유효한 경우
  const validPermission = !meta?.permission || meta?.permission & memberStore.userPermission;

  if (!validPermission) {
    alert(`validPermission : ${validPermission}\npermission : ${memberStore.userPermission}`);
  }

  if (!meta || validPermission) {
    return next();
  } else {
    // ! 접근 권한이 유효하지 않을 경우
    return next({path: '/', replace: true});
  }
};

export const guardBeforeEach = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  guardPermission(to, from, next);
};
