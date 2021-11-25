<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import memberStore from '@/store/member';

const setPermission = (permission: number) => {
  memberStore.userPermission = permission;
}
</script>

<template>
  Index.vue
  <hello-world msg="msg" />
  <button @click="setPermission(1)">permission USER</button>
  <button @click="setPermission(4)">permission ADMIN</button>
  <router-link :to="'/home'">Home</router-link>
</template>

<style scoped></style>
