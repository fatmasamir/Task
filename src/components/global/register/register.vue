<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import AOS from "aos";
import FormRegister from "./FormRegister.vue";
import ContinueSocial from "../ContinueSocial/index.vue";
import { useRouter } from "vue-router";

// i18n
const { t } = useI18n();
// router
const router = useRouter();

onMounted(() => {
  AOS.init();
  if (localStorage.getItem("access_token")) {
    router.push("/");
  }
});
</script>

<template>
  <section class="auth-form">
    <div class="row">
      <div class="col-lg-7 col-12 m-0 p-0 logo_box">
        <div
          class="logo"
          data-aos="flip-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-out"
        >
          <router-link to="/">
            <img src="../../../assets/images/global/icons/global/logo.svg"
          /></router-link>
        </div>
        <div class="logo_box_img">
          <img src="@/assets/images/global/icons/global/Carbackground.svg" />
        </div>
      </div>
      <div
        class="col-lg-5 col-12 main-box"
        data-aos="zoom-in-up"
        data-aos-offset="200"
        data-aos-easing="ease-in-out"
      >
        <div class="middle">
          <div class="auth_header text-start">
            <h3>{{ t("Register") }}</h3>
            <p>{{ t("Register_msg") }}</p>
            <ContinueSocial type="Register" />
            <div class="Or">
              <p>{{ t("OR") }}</p>
            </div>
          </div>
          <FormRegister />
        </div>
      </div>
    </div>
    <!-- main box -->
  </section>
</template>
<style lang="scss" scoped>
@import "../Login/AuthSyling.scss";
.auth-form {
  /* main-box */
  .main-box {
    height: 100%;
  }
  a {
    cursor: pointer;
  }
}
</style>
