import { defineStore } from 'pinia'

export const usePiniaStore = defineStore('pinia', {
  state: () => {
    return {
      counter: 0
    }
  },
  getters: {
    doubleCount: state => {
      return state.counter * 2;
    }
  },
  actions: {
    increment() {
      this.counter++;
    }
  }
});
