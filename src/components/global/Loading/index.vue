<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";
import AOS from "aos";
const { t } = useI18n();
onMounted(() => {
  AOS.init();
});
</script>
<template>
  <div class="text-center loading">
    <b-spinner label="Spinning"></b-spinner>
  </div>
</template>
<style scoped lang="scss">
.loading {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 99999;
  background: white;
  padding-top: 100px;
  padding-bottom: 100px;
  background: transparent;
  color: black;
  span {
    width: 50px;
    height: 50px;
    color: black;
  }
}
</style>
