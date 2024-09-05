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

// meta
const { meta } = useForm();

// formRegister
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    first_name: Yup.string().required(t("requiredFiled")),
    last_name: Yup.string().required(t("requiredFiled")),
    email: Yup.string()
      .email(t("requiredFiledemail"))
      .required(t("requiredFiled")),
    phone: Yup.string().required(t("requiredFiled")),
    password: Yup.string().min(8).required(t("requiredFiled")),
    password_confirmation: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  }),
});

//first_name ,last_name
const first_name = defineInputBinds("first_name");
const last_name = defineInputBinds("last_name");
const email = defineInputBinds("email");
const phone = defineInputBinds("phone");
const password = defineInputBinds("password");
const password_confirmation = defineInputBinds("password_confirmation");
const terms_and_conditions = ref(0);

// input password type
const passwordFieldType = ref<string>("password");

// input password_confirmation type
const password_confirmationFieldType = ref<string>("password");

// error
const error = ref<number>();

// show/hide new password
const switchVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

// show/hide new password
const switchVisibility2 = () => {
  password_confirmationFieldType.value =
    password_confirmationFieldType.value === "password" ? "text" : "password";
};
let onSubmit = handleSubmit((values) => {
  if (values) {
    try {
      authStore.registertion.first_name = values.first_name;
      authStore.registertion.last_name = values.last_name;
      authStore.registertion.email = values.email;
      authStore.registertion.phone = values.phone;
      authStore.registertion.password = values.password;
      authStore.registertion.password_confirmation =
        values.password_confirmation;
      authStore.registertion.terms_and_conditions = terms_and_conditions.value
        ? 1
        : 0;
      setTimeout(() => {
        router.push("/register-continue/account");
      }, 1000);
    } catch (err) {
      error.value = err as number;
    }
  }
});

onMounted(() => {
  AOS.init();
  if (localStorage.getItem("access_token")) {
    router.push("/");
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form mt-4">
      <div
        class="row mt-3 mx-0 px-0 nameInput"
        data-aos="zoom-in-up"
        data-aos-easing="linear"
        data-aos-duration="500"
      >
        <div class="col-md-6 mx-0">
          <SimpleInput>
            <!-- <label>Email <span class="text-red">*</span> </label> -->
            <input
              type="text"
              id="fristName"
              name="fristName"
              :placeholder="t('fristName')"
              required
              v-bind="first_name"
              :class="{ 'is-invalid': errors.first_name }"
            />

            <div class="invalid-feedback">{{ errors.first_name }}</div>
          </SimpleInput>
        </div>
        <div class="col-md-6">
          <SimpleInput>
            <!-- <label>Email <span class="text-red">*</span> </label> -->
            <input
              type="text"
              id="lastName"
              name="lastName"
              :placeholder="t('lastName')"
              required
              v-bind="last_name"
              :class="{ 'is-invalid': errors.last_name }"
            />
            <div class="invalid-feedback">{{ errors.last_name }}</div>
          </SimpleInput>
        </div>
      </div>
      <div
        class="col-md-12 mt-2 passwordField"
        data-aos="zoom-in-up"
        data-aos-easing="linear"
        data-aos-duration="700"
      >
        <SimpleInput>
          <input
            type="email"
            id="email"
            name="email"
            :placeholder="t('Email')"
            required
            v-bind="email"
            :class="{ 'is-invalid': errors.email }"
          />
          <div class="invalid-feedback">{{ errors.email }}</div>
        </SimpleInput>
      </div>
      <div
        class="col-md-12 mt-2 passwordField"
        data-aos="zoom-in-up"
        data-aos-easing="linear"
        data-aos-duration="700"
      >
        <SimpleInput>
          <!-- <label>Email <span class="text-red">*</span> </label> -->

          <vue3-reactive-tel-input
            :rootStyle="{ backgroundColor: '#f9f9f9' }"
            :inputStyle="{ backgroundColor: '#f9f9f9' }"
            :listStyle="{ backgroundColor: '#f9f9f9' }"
            :dropdownStyle="{ backgroundColor: '#f9f9f9' }"
            :class="{ 'is-invalid': errors.phone }"
            v-bind="phone"
            :placeholder="t('phone_number')"
          />
          <div class="invalid-feedback">{{ errors.phone }}</div>
        </SimpleInput>
      </div>
      <div
        class="col-md-12 mt-3 passwordField"
        data-aos="zoom-in-up"
        data-aos-easing="linear"
        data-aos-duration="700"
      >
        <SimpleInput>
          <!-- <label>Email <span class="text-red">*</span> </label> -->
          <input
            :type="passwordFieldType"
            id="password"
            name="password"
            :placeholder="t('password')"
            required
            v-bind="password"
            :class="{ 'is-invalid': errors.password }"
          /><img
            src="@/assets/images/global/icons/global/eye-svgrepo.svg"
            @click="switchVisibility"
            class="pass_icon"
            v-if="passwordFieldType == 'password'"
          /><img
            src="@/assets/images/global/icons/global/eye-slash.svg"
            @click="switchVisibility"
            class="pass_icon"
            v-else
          />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </SimpleInput>
      </div>
      <div class="col-md-12 mt-3 passwordField">
        <SimpleInput>
          <!-- <label>Email <span class="text-red">*</span> </label> -->
          <input
            :type="password_confirmationFieldType"
            id="password"
            name="password"
            :placeholder="t('Rewrite_new_password')"
            required
            v-bind="password_confirmation"
            :class="{ 'is-invalid': errors.password_confirmation }"
          /><img
            src="@/assets/images/global/icons/global/eye-svgrepo.svg"
            @click="switchVisibility2"
            class="pass_icon"
            v-if="password_confirmationFieldType == 'password'"
          /><img
            src="@/assets/images/global/icons/global/eye-slash.svg"
            @click="switchVisibility2"
            class="pass_icon"
            v-else
          />
          <div class="invalid-feedback">{{ errors.password_confirmation }}</div>
        </SimpleInput>
      </div>
      <div class="col-md-12 mt-1 mb-4 forget_remember">
        <div class="d-flex align-items-center">
          <input type="checkbox" required v-model="terms_and_conditions" />
          <div class="invalid-feedback">{{ errors.terms_and_conditions }}</div>
          <label for="rememberMe" class="mx-2">
            {{ t("I_accept") }}
            <router-link to="/privacy-policy" class="color-main">{{
              t("Iaccept_conditions2")
            }}</router-link></label
          >
        </div>
      </div>
      <div class="col-12 mt-3">
        <SimpleButton type="send" class="register_lab">
          <button type="submit">
            {{ t("Continue") }}
          </button>
          <!-- <button type="submit" disabled v-else>
            {{ t("wait") }}
          </button> -->
        </SimpleButton>
        <div class="col-12 register mt-3">
          <p>{{ t("Have_an_account") }}</p>
          <router-link to="/login" class="new_lab px-2">
            {{ t("Login") }}
          </router-link>
        </div>
      </div>
    </div>
  </form>
</template>
<style lang="scss" scoped>
@import "../Login/AuthSyling.scss";
/* main-box */
a {
  cursor: pointer;
}
.nameInput {
  > div {
    margin: 0px;
    padding: 0px;
    &:first-child {
      padding-right: 10px;
    }
  }
}
.is-ar {
  .nameInput > div:first-child {
    padding-right: 0px;
    padding-left: 10px;
  }
}
</style>
