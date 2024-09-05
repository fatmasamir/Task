<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import AOS from "aos";
import { UseProfile } from "@/stores/Profile/index";
import { useRouter } from "vue-router";

//router
let router = useRouter();

// i18n
const useProfile = UseProfile();

// i18n
const { t } = useI18n();

// formRef
const formRef = ref(null);

// meta
const { meta } = useForm();

// formLogin
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    old_password: Yup.string().required("Old Password is required"),
    new_password: Yup.string().min(6).required("New Password is required"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("new_password")], "Passwords do not match"),
  }),
});

//message ,name,phone
const old_password = defineInputBinds("old_password");
const confirm_password = defineInputBinds("confirm_password");
const new_password = defineInputBinds("new_password");
const error = ref(false);

// input password type
const passwordFieldType = ref<string>("password");
// input password type
const passwordFieldTypeComfirm = ref<string>("password");
// input password type
const passwordFieldTypeNew = ref<string>("password");
// show/hide new password
const switchVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

// show/hide new password
const switchVisibilityComfirm = () => {
  passwordFieldTypeComfirm.value =
    passwordFieldTypeComfirm.value === "password" ? "text" : "password";
};

// show/hide new password
const switchVisibilityNew = () => {
  passwordFieldTypeNew.value =
    passwordFieldTypeNew.value === "password" ? "text" : "password";
};
// handel submit
let onSubmit = handleSubmit((values: any) => {
  if (values) {
    const data = {
      old_password: values.old_password,
      confirm_password: values.confirm_password,
      new_password: values.new_password,
      login: JSON.parse(localStorage.getItem("user")).email,
    };
    try {
      useProfile.set_change_password(JSON.stringify(data));
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
      <h6>Edit profile</h6>
      <form @submit.prevent="onSubmit">
        <div class="row mt-4">
          <div class="col-md-12 passwordField">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                :type="passwordFieldType"
                id="old_password"
                name="old_password"
                v-bind="old_password"
                placeholder="Old Password"
                :class="{ 'is-invalid': errors.old_password }"
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

              <div class="invalid-feedback">{{ errors.old_password }}</div>
            </SimpleInput>
          </div>
          <div class="col-md-12 passwordField">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                :type="passwordFieldTypeNew"
                id="new_password"
                name="new_password"
                v-bind="new_password"
                placeholder="New Password"
                :class="{ 'is-invalid': errors.new_password }"
              />
              <img
                src="@/assets/images/eye-svgrepo.svg"
                @click="switchVisibilityNew"
                class="pass_icon"
                v-if="passwordFieldTypeNew == 'password'"
              /><img
                src="@/assets/images/eye-slash.svg"
                @click="switchVisibilityNew"
                class="pass_icon"
                v-else
              />

              <div class="invalid-feedback">
                {{ errors.new_password }}
              </div>
            </SimpleInput>
          </div>
          <div class="col-md-12 passwordField">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                :type="passwordFieldTypeComfirm"
                id="confirm_password"
                name="confirm_password"
                v-bind="confirm_password"
                placeholder="Rewrite New Password"
                :class="{ 'is-invalid': errors.confirm_password }"
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
                {{ errors.confirm_password }}
              </div>
            </SimpleInput>
          </div>
          <div class="col-12 mt-3">
            <SimpleButton type="send" class="register_lab">
              <button
                type="submit"
                v-if="!useProfile.is_loading_change_password"
              >
                {{ t("Save") }}
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

.card {
  width: 70%;
  margin-top: 30px;
}
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
.simple-button.send button {
  width: 100%;
}

@media screen and (max-width: 993px) {
  .card {
    width: 100%;
  }
}
</style>
