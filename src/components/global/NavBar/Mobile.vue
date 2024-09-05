<script setup lang="ts">
import { useI18n } from "vue-i18n";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { defineProps } from "vue";

// props
let props = defineProps(["Links"]);

// //Login
// const Login = localStorage.getItem("access_token");

// emit;
let emit = defineEmits(["changeshowMobile", "Logout"]);
// i18n
const { t } = useI18n();

const showMobile = () => {
  emit("changeshowMobile");
};
//Logout
// const LogoutFun = () => {
//   emit("Logout");
// };
</script>

<template>
  <div class="mobile pb-5">
    <div class="mobile_sec">
      <div class="close">
        <button class="navbar-toggler" type="button" @click="showMobile()">
          X
        </button>
      </div>
      <div>
        <div class="navbar-nav">
          <ul class="list_links">
            <li v-for="link in props.Links" :key="link.id">
              <router-link
                :to="link.path"
                class="nav-link"
                :class="link.id == 0 ? 'active' : ''"
                href="#aboutUs"
              >
                {{ t(link.title) }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-btns">
        <!-- Login / Register -->
        <SimpleButton type="send">
          <router-link to="/" class="btn btn-main">
            Login / Register
          </router-link></SimpleButton
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./NavbarStyling.scss";
</style>
