<script setup>
import Login from "@/components/pages/Login/indxe.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

//router
let router = useRouter();

//onMounted
onMounted(() => {
  // if (localStorage.getItem("access_token")) {
  //   router.push("/");
  // }
});
</script>
<template>
  <div class="Login">
    <Login />
  </div>
</template>
<style scoped>
.Login {
  padding-top: 10%;
  background: url("../../assets/images/Blackground.png") center center no-repeat;
  background-size: cover;
  height: 100vh;
}
</style>
