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
    login: Yup.string().email().required("reqired email filed"),
  }),
});

//message ,phone
const login = defineInputBinds("login");
const error = ref(false);

// handel submit
let onSubmit = handleSubmit((values: any) => {
  if (values) {
    const data = { login: values.login };
    try {
      authStore.resetPassword.login = values.login;
      authStore.forgetPassword(JSON.stringify(values)).then(() => {
        if (authStore.is_auth) {
          setTimeout(() => {
            router.push("/forget-password-otp");
          }, 1000);
          authStore.is_waiting = false;
        }
      });
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
      <h6>Forget password</h6>
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
          <div class="col-12 mt-3">
            <SimpleButton type="send" class="register_lab">
              <button type="submit" v-if="!authStore.is_loading">
                {{ t("Send") }}
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
</style>
