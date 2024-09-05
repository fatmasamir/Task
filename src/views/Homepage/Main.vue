<script setup>
import Hompage from "@/components/pages/Hompage/index.vue";
import Slidebar from "@/components/global/Slidebar/index.vue";
</script>
<template>
  <div class="Pages">
    <div class="row p-0 m-0">
      <div class="col-md-2 col-0 p-0 m-0"><Slidebar /></div>
      <div class="col-md-10 col-12">
        <h2 class="logo-mobile">Logo</h2>
        <Hompage />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
