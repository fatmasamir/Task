<template>
  <div class="Navbar d-flex w-100 justify-space-between align-center px-3">
    <h1 class="m-0 p-0">Logo</h1>
    <langButton class="text-end" />
  </div>
</template>
<script setup>
import langButton from "@/components/global/langButton/index.vue";
</script>
<style lang="scss" scoped>
.is-ar {
  .Navbar {
    direction: rtl !important;
  }
}
</style>
