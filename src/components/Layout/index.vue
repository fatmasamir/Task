<template>
  <v-layout class="rounded rounded-md">
    <Slidbar />
    <div class="content"><navbar></navbar><router-view></router-view></div
  ></v-layout>
</template>
<script setup>
import Slidbar from "./Slidbar/index.vue";
import navbar from "./Navbar/index.vue";
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
}
</style>
