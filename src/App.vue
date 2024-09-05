<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import { useLang } from "@/stores/lang";
import { useLight } from "@/stores/light";
import ScrollTop from "./components/global/ScrollTop/index.vue";
import { useRouter } from "vue-router";
import LoadingSpinner from "./components/global/Loading/index.vue";

//router
let router = useRouter();
//Language
const Language = useLang();

//loading
const loading = ref(true);

//onMounted
onMounted(() => {
  //onMounted
  Language.changeLayout();
  if (!localStorage.getItem("access_token")) {
    router.push("/login");
  }
  //setTimeout
  setTimeout(function () {
    loading.value = false;
  }, 1000);
});
</script>
<template>
  <LoadingSpinner v-if="loading" />
  <div class="scrollTop"><a href="#"></a></div>
  <router-view></router-view><ScrollTop />
</template>
<style scoped lang="scss">
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99999;
  padding-top: 20%;
  background: #f0f0f0 !important;
  color: rgb(0, 16, 99);
  span {
    width: 40px;
    height: 40px;
  }
}
</style>
