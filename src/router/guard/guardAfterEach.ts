import {RouteLocationNormalized, NavigationFailure} from 'vue-router';

export const guardAfterEach = (to: RouteLocationNormalized, from: RouteLocationNormalized, failure?: NavigationFailure | void) => {
  // send google analytics
};
