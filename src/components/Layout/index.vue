<template>
  <v-layout class="rounded rounded-md">
    <div :class="showMobile ? 'show' : ''" class="slider">
      <Slidbar @showingslider="showingslider" />
    </div>
    <div class="content">
      <navbar :showMobile="showMobile" @showingslider="showingslider"></navbar>
      <router-view @click="showMobile = false"></router-view></div
  ></v-layout>
</template>
<script setup>
import Slidbar from "./Slidbar/index.vue";
import navbar from "./Navbar/index.vue";
import { ref } from "vue";
let showMobile = ref(false);
const showingslider = () => {
  showMobile.value = !showMobile.value;
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
}
@media screen and (max-width: 1500px) {
  .slider {
    display: none;
  }
  .slider.show {
    display: block;
    position: fixed;
    z-index: 999;
  }
}
</style>
