<script setup>
import History from "@/components/pages/History/index.vue";
import Slidebar from "@/components/global/Slidebar/index.vue";
import { onMounted } from "vue";
import { UseHistory } from "@/stores/History/index";
let Histories = UseHistory();

onMounted(() => {
  Histories.get_history();
});
</script>
<template>
  <div class="Pages">
    <div class="row p-0 m-0">
      <div class="col-md-2 col-0 p-0 m-0"><Slidebar /></div>
      <div class="col-md-10 col-12">
        <h2 class="logo-mobile">Logo</h2>
        <History v-if="Histories.Histories" :Histories="Histories.Histories" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.body {
  background: #f0f0f0 !important;
}
</style>
