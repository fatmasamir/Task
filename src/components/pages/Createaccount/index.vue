<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import { useRouter } from "vue-router";
import AOS from "aos";

// i18n
const { t } = useI18n();
// router
const router = useRouter();

// auth store
const authStore = useAuthStore();

// formRef
const formRef = ref(null);

// meta
const { meta } = useForm();

// formLogin
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  }),
});

//message ,name,phone
const name = defineInputBinds("name");
const email = defineInputBinds("email");
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
    authStore.registertion.name = values.name;
    authStore.registertion.email = values.email;
    authStore.registertion.password = values.password;
    await authStore
      .register(JSON.stringify(authStore.registertion))
      .then(() => {
        setTimeout(() => {
          router.push("/otp-verification");
        }, 1000);
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
      <h6>Create account</h6>
      <form @submit.prevent="onSubmit">
        <div class="row mt-4">
          <div class="col-md-12">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                type="text"
                id="name"
                name="name"
                v-bind="name"
                placeholder="Name"
                :class="{ 'is-invalid': errors.name }"
              />

              <div class="invalid-feedback">{{ errors.name }}</div>
            </SimpleInput>
          </div>
          <div class="col-md-12">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                type="email"
                id="email"
                name="email"
                v-bind="email"
                placeholder="email"
                :class="{ 'is-invalid': errors.email }"
              />

              <div class="invalid-feedback">{{ errors.email }}</div>
            </SimpleInput>
          </div>
          <div class="col-md-12 passwordField">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                :type="passwordFieldType"
                id="password"
                name="password"
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
          <div class="col-12 mt-3">
            <SimpleButton type="send" class="register_lab">
              <button type="submit" v-if="!authStore.is_loading">
                {{ t("Signup") }}
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
</style>
