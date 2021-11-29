import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import store from '@/store';

import App from './App.vue';

const delay = (duration = 1) => {
  return new Promise(resolve => {
    // do something
    setTimeout(() => resolve(true), 1000 * duration);
  });
}

const beforeInitializeAppWork = async () => {
  console.log('beforeInitializeAppWork');

  // do something
  await delay();

  return {};
}

const initializeApp = async (rootContainer: string, res: any) => {
  console.log('initializeApp');

  // do something
  await delay();

  createApp(App)
    .use(store)
    .use(createPinia())
    .use(router)
    .mount(rootContainer);
};


beforeInitializeAppWork()
  .then(res => initializeApp('#app', res))
  .finally(() => {});
