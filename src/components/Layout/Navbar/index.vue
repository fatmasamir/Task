<template>
  <div class="Navbar d-flex w-100 justify-space-between align-center px-3">
    <h5 class="m-0 p-0">Logo</h5>
    <langButton class="text-end" />
    <span class="menu mx-3" @click="$emit('showingslider')"
      ><img
        src="@/assets/images/menu-svgrepo-com.svg"
        v-if="!props.showMobile" /><img
        src="@/assets/images/close-svgrepo-com.svg"
        v-else
    /></span>
  </div>
</template>
<script setup>
import langButton from "@/components/global/langButton/index.vue";
let props = defineProps(["showMobile"]);
</script>
<style lang="scss" scoped>
.menu {
  display: none;
  img {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}
.is-ar {
  .Navbar {
    direction: rtl !important;
  }
}
@media screen and (max-width: 1500px) {
  .menu {
    display: block;
  }
}
</style>
