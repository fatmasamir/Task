<script setup>
import Createaccount from "@/components/pages/Createaccount/index.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

//router
let router = useRouter();

//onMounted
onMounted(() => {
  // if (localStorage.getItem("access_token")) {
  //   router.push("/login");
  // }
});
</script>
<template>
  <div class="Createaccount">
    <Createaccount />
  </div>
</template>
<style scoped>
.Createaccount {
  padding-top: 10%;
  background: url("../../assets/images/Blackground.png") center center no-repeat;
  background-size: cover;
  height: 100vh;
}
</style>
