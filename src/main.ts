import { createApp } from 'vue';
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

  createApp(App).mount(rootContainer);
};


beforeInitializeAppWork()
  .then(res => initializeApp('#app', res))
  .finally(() => {});
