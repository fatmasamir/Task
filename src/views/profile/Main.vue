<script setup>
import Profile from "@/components/pages/Profile/index.vue";
import Slidebar from "@/components/global/Slidebar/index.vue";
</script>
<template>
  <div class="Pages">
    <div class="row p-0 m-0">
      <div class="col-md-2 col-0 p-0 m-0"><Slidebar /></div>
      <div class="col-md-10 col-12">
        <h2 class="logo-mobile">Logo</h2>
        <Profile />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.body {
  background: #f0f0f0 !important;
}
</style>
