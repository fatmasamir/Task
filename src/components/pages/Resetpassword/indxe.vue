<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import AOS from "aos";
import { useRouter } from "vue-router";

// router
const router = useRouter();

// i18n
const { t } = useI18n();

// formRef
const formRef = ref(null);

// meta
const { meta } = useForm();

// formLogin
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    password: Yup.string().min(6).required(),
    password_confirmation: Yup.string()
      .required(t("Rewrite new password"))
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  }),
});

//message ,Password
const password = defineInputBinds("password");
const password_confirmation = defineInputBinds("password_confirmation");
const error = ref(false);

// input password type
const passwordFieldType = ref<string>("password");
// input password type
const passwordFieldTypeComfirm = ref<string>("password");
// show/hide new password
const switchVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

// auth store
const authStore = useAuthStore();
// show/hide new password
const switchVisibilityComfirm = () => {
  passwordFieldTypeComfirm.value =
    passwordFieldTypeComfirm.value === "password" ? "text" : "password";
};
// handel submit
let onSubmit = handleSubmit((values: any) => {
  error.value = false;
  if (values) {
    console.log("values", JSON.stringify(values));
    authStore.resetPassword.password = values.password;
    authStore.resetPassword.password_confirmation =
      values.password_confirmation;
    console.log("authStore.resetPassword.login", authStore.resetPassword);
    authStore
      .PasswordReset(JSON.stringify(authStore.resetPassword))
      .then(() => {
        if (authStore.is_auth) {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          authStore.is_waiting = false;
        }
      });
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
      <h6>Reset password</h6>
      <form @submit.prevent="onSubmit">
        <div class="row mt-4">
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
          <div class="col-md-12 passwordField">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                :type="passwordFieldTypeComfirm"
                id="password_confirmation"
                name="password_confirmation"
                v-bind="password_confirmation"
                placeholder="Rewrite new password"
                :class="{ 'is-invalid': errors.password_confirmation }"
              />
              <img
                src="@/assets/images/eye-svgrepo.svg"
                @click="switchVisibilityComfirm"
                class="pass_icon"
                v-if="passwordFieldTypeComfirm == 'password'"
              /><img
                src="@/assets/images/eye-slash.svg"
                @click="switchVisibilityComfirm"
                class="pass_icon"
                v-else
              />

              <div class="invalid-feedback">
                {{ errors.password_confirmation }}
              </div>
            </SimpleInput>
          </div>
          <div class="col-12 mt-3">
            <SimpleButton type="send" class="register_lab">
              <button type="submit" v-if="!authStore.is_loading">
                Confirm
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
} /* passwordField */
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
.card {
  margin: auto;
}
</style>
