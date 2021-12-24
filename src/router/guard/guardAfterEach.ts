import {RouteLocationNormalized, NavigationFailure} from 'vue-router';

export const guardAfterEach = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, _failure?: NavigationFailure | void) => {
  // send google analytics
};
