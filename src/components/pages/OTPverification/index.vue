<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import AOS from "aos";
import VOtpInput from "vue3-otp-input";

// router
const router = useRouter();

// auth store
const authStore = useAuthStore();

// i18n
const { t } = useI18n();

// otpInput
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindModal = ref("");

// handleOnComplete
const handleOnComplete = (value: string) => {
  console.log("OTP completed: ", value);
};

// handel submit
const handelSubmit = async () => {
  try {
    authStore.verifyRegister.otp = bindModal.value;
    authStore.verifyRegister.login = JSON.parse(
      localStorage.getItem("user")
    ).email; //authStore.registertion.phone
    await authStore
      .Verify(JSON.stringify(authStore.verifyRegister))
      .then(() => {
        if (authStore.is_auth) {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          authStore.is_waiting = false;
        }
      });
  } catch (err) {
    console.log("Error Verify");
  }
};
onMounted(() => {
  AOS.init();
});
</script>
<template>
  <div
    class="card otp-form"
    data-aos="fade-in"
    data-aos-easing="linear"
    data-aos-duration="900"
  >
    <div class="card-body">
      <h6>OTP verification</h6>
      <div class="row mt-4 p-0 m-0">
        <form @submit.prevent="handelSubmit">
          <div class="style_otp">
            <v-otp-input
              ref="otpInput"
              class="otpInput"
              v-model:value="bindModal"
              input-classes="otp-input"
              separator=" "
              :num-inputs="6"
              :should-auto-focus="true"
              input-type="letter-numeric"
              :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
              :placeholder="['-', '-', '-', '-', '-', '-']"
              @on-complete="handleOnComplete"
            />
          </div>
          <div class="col-12 mt-3 p-0 m-0">
            <SimpleButton type="send" class="register_lab">
              <button type="submit" v-if="!authStore.is_loading">
                {{ t("Send") }}
              </button>
              <button type="submit" disabled v-else>
                {{ t("wait") }}
              </button>
            </SimpleButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./otpStyling.scss";
.simple-button.send button {
  width: 100%;
  background: rgba(0, 16, 99, 1) !important;
}
.card {
  margin: auto;
  width: 40%;
}
@media screen and (max-width: 991px) {
  .card {
    width: 95%;
  }
}
</style>
