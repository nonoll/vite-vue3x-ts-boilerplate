<script setup lang="ts">
import memberStore from '@/store/member';
import { usePiniaStore } from '@/store/pinia';

const piniaStore = usePiniaStore();

const setPermission = (permission: number) => {
  memberStore.setPermission(permission);
}

const onPiniaCountClick = () => {
  console.log('piniaStore', piniaStore);
  piniaStore.increment();
}
</script>

<template>
  Index.vue
  <button @click="setPermission(1)">permission USER</button>
  <button @click="setPermission(4)">permission ADMIN</button>
  <div>
    <p>pinia</p>
    <button type="button" @click="onPiniaCountClick">piniaStore count is: {{ piniaStore.counter }}</button>
  </div>
  <router-link :to="'/home'">Home</router-link>
</template>

<style scoped>
div {
  border: 1px solid red;
}
</style>
