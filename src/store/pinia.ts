import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
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
