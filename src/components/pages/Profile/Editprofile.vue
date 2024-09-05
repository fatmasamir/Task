<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import AOS from "aos";
import { UseProfile } from "@/stores/Profile/index";

// i18n
const { t } = useI18n();

// i18n
const useProfile = UseProfile();

// formRef
const formRef = ref(null);

// meta
const { meta } = useForm();
const user = ref();
// formLogin
const { errors, handleSubmit, resetForm, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    new_username: Yup.string().required("new username is required"),
  }),
});

//message ,name,phone
const new_username = defineInputBinds("new_username");
// handel submit
let onSubmit = handleSubmit((values: any) => {
  if (values) {
    console.log(values);
    try {
      useProfile.set_new_username(JSON.stringify(values));
    } catch (err) {
      console.log(err);
    }
  }
});

onMounted(() => {
  AOS.init();
  if (localStorage.getItem("user")) {
    resetForm({
      values: { new_username: JSON.parse(localStorage.getItem("user")).name },
    });
  }
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
          <div class="col-md-12">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                type="text"
                id="name"
                name="name"
                v-bind="new_username"
                placeholder="Name"
                :class="{
                  'is-invalid': errors.new_username,
                }"
              />

              <div class="invalid-feedback">{{ errors.new_username }}</div>
            </SimpleInput>
          </div>
          <div class="col-12 mt-3">
            <SimpleButton type="send" class="register_lab">
              <button type="submit" v-if="!useProfile.is_loading">
                {{ t("Save") }}
              </button>
              <button type="submit" disabled v-else>
                {{ t("wait") }} .....
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
  margin-top: 5%;
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
