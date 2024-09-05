<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import AOS from "aos";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

//router
let router = useRouter();

// auth store
const authStore = useAuthStore();

// i18n
const { t } = useI18n();

// formRef
const formRef = ref(null);

// meta
const { meta } = useForm();

// formLogin
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    login: Yup.string().email().required("required email"),
    password: Yup.string().min(6).required(),
  }),
});

//message ,phone
const login = defineInputBinds("login");
const password = defineInputBinds("password");
const error = ref(false);

// input password type
const passwordFieldType = ref<string>("password");

// show/hide new password
const switchVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

// handel submit
let onSubmit = handleSubmit(async (values: any) => {
  if (values) {
    try {
      await authStore.login(JSON.stringify(values));
    } catch (err) {
      console.log(err);
    }
  }
});

onMounted(() => {
  AOS.init();
});
</script>
<template>
  <div
    class="card"
    data-aos="fade-in"
    data-aos-easing="linear"
    data-aos-duration="900"
  >
    <div class="card-body">
      <h6>Welcome back</h6>
      <form @submit.prevent="onSubmit">
        <div class="row mt-4">
          <div class="col-md-12">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                type="email"
                id="email"
                name="email"
                v-bind="login"
                placeholder="email"
                :class="{ 'is-invalid': errors.login }"
              />

              <div class="invalid-feedback">{{ errors.login }}</div>
            </SimpleInput>
          </div>
          <div class="col-md-12 passwordField">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                :type="passwordFieldType"
                id="Password"
                name="Password"
                v-bind="password"
                placeholder="Password"
                :class="{ 'is-invalid': errors.password }"
              />
              <img
                src="@/assets/images/eye-svgrepo.svg"
                @click="switchVisibility"
                class="pass_icon"
                v-if="passwordFieldType == 'password'"
              /><img
                src="@/assets/images/eye-slash.svg"
                @click="switchVisibility"
                class="pass_icon"
                v-else
              />

              <div class="invalid-feedback">{{ errors.password }}</div>
            </SimpleInput>
          </div>
          <div class="col-md-12 mt-1 forget_password">
            <div class="">
              <router-link to="/create-account">{{ t("Signup") }}</router-link>
            </div>
            <router-link to="/forget-password">{{
              t("forgetPass")
            }}</router-link>
          </div>
          <div class="col-12 mt-3">
            <SimpleButton type="send" class="register_lab">
              <button type="submit" v-if="!authStore.is_loading">
                {{ t("Log in") }}
              </button>
              <button type="submit" disabled v-else>
                {{ t("wait") }}
              </button>
            </SimpleButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../Hompage/FormStyling.scss";
.simple-button.send button {
  width: 100%;
}
.card {
  margin: auto;
}
/* passwordField */
.passwordField {
  position: relative;
  z-index: 1;
  /* pass_icon */
  .pass_icon {
    position: absolute;
    right: 25px;
    top: 16px;
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
}
.forget_password {
  justify-content: space-between;
  display: flex;
  a {
    color: rgba(0, 16, 99, 1) !important;
  }
}
</style>
