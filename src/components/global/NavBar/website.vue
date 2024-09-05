<script setup lang="ts">
import { useI18n } from "vue-i18n";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { defineProps, ref, onMounted } from "vue";
// props
let props = defineProps(["Links"]);
// // emit
// let emit = defineEmits(["Logout"]);

// i18n
const { t } = useI18n();

//Login
const Login = ref();

// //Logout
// const LogoutFun = () => {
//   emit("Logout");
// };

//onMounted page :to="{ name: 'Home', hash: '#aboutUs' }"
onMounted(() => {
  Login.value = localStorage.getItem("access_token");
});
</script>

<template>
  <div class="website">
    <div>
      <div class="navbar-nav">
        <ul class="list_links">
          <li v-for="link in props.Links" :key="link.id">
            <router-link
              :to="link.path"
              class="nav-link"
              :class="link.id == 0 ? 'active' : ''"
            >
              {{ t(link.title) }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div
      class="navbar-btns navbar-btns-icons navbar-btns-icons-authonticaTION d-flex align-items-center"
    >
      <!-- Login / Register -->
      <SimpleButton type="send">
        <router-link to="/" class="btn btn-main">
          Login / Register
        </router-link></SimpleButton
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./NavbarStyling.scss";
.navbar .navbar-btns-icons .info-login {
  margin-right: 25px;
  .profile_link img,
  .notification,
  .messages {
    border: 2px solid #f4a71d;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background: transparent;
  }
  .notification,
  .messages {
    border: 2px solid #313131;
    margin-left: 15px;
  }
}
</style>
