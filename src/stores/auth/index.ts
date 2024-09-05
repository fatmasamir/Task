import { defineStore } from "pinia";
import type {
  Register,
  ResetPassword,
  VerifyRegister,
  LoginSocialMedia,
  RegisterSocialMedia,
} from "./interface";
import { ref } from "vue";
import callServer from "../../assets/scripts/callServer/callServer";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
const toast = useToast();
import { inject, toRefs } from "vue";

// Vue3GoogleOauth
const Vue3GoogleOauth = inject("Vue3GoogleOauth");

export const useAuthStore = defineStore("auth", () => {
  // properites

  // user
  let user = ref();

  // resetPassword
  const resetPassword = ref<ResetPassword>({
    login: "",
    otp: "",
    password: "",
    password_confirmation: "",
  });

  // verifyRegister
  const verifyRegister = ref<VerifyRegister>({
    login: "",
    otp: "",
  });

  // registertion
  const registertion = ref<Register>({
    name: "",
    email: "",
    password: "",
  });

  // loginSocialMedia
  const loginSocialMedia = ref<LoginSocialMedia>({
    access_token: "",
  });

  // registerSocialMedia
  const registerSocialMedia = ref<RegisterSocialMedia>({
    access_token: "",
    is_lender: 0,
  });

  // is_error
  const is_error = ref<Boolean>(false);

  // is_loading
  const is_loading = ref<Boolean>(false);

  // is_auth
  const is_auth = ref<Boolean>(false);

  // is_waiting
  const is_waiting = ref<Boolean>(false);

  // -- auth functions

  // register
  async function register(data: Register) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/auth/register",
      method: "POST",
      data,
    });
    if (!response.ok) {
      let errors = null;
      await response.json().then((data) => {
        toast.error(data.message);
      });
      is_error.value = true;
      is_loading.value = false;
      is_waiting.value = false;
      localStorage.removeItem("user");
      throw errors;
    } else {
      toast.success("Successfully Register ... ");
      is_auth.value = true;
      is_loading.value = false;
      localStorage.setItem("user", JSON.stringify(registertion.value));
    }
  }

  // Verify
  async function Verify(data: Register) {
    console.log("data", data);
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/auth/verify",
      method: "POST",
      data,
    });

    if (response.ok) {
      is_auth.value = true;
      response.json().then(async (data: { token: string }) => {
        localStorage.setItem("access_token", data.data.token);
        localStorage.setItem("user", data.data.user);
        user.value = data.data.user;
        localStorage.setItem("type", "account");
        toast.success("Successfully Login ... ");
      });
      is_auth.value = true;
      is_loading.value = false;
    } else {
      is_error.value = true;
      is_loading.value = false;
      is_waiting.value = false;
      toast.error("data is Not Correct. .... ");
      throw response.status;
    }
  }
  // login
  async function login(data) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/auth/login",
      method: "POST",
      data,
    });

    if (response.ok) {
      is_auth.value = true;
      await response.json().then(async (data: { token: string }) => {
        localStorage.setItem("access_token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        console.log("local ==", localStorage.getItem("access_token"));
        toast.success("Successfully Login ... ");
        is_auth.value = true;
        is_loading.value = false;
        this.router.push("/");
      });
    } else {
      is_error.value = true;
      is_loading.value = false;
      is_waiting.value = false;
      toast.error("data is Not Correct. .... ");
      throw response.status;
    }
  }

  // forgetPassword
  async function forgetPassword(data) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/auth/forget-password",
      method: "POST",
      data,
    });

    if (response.ok) {
      is_auth.value = true;
      response.json().then(async (data: { access_token: string }) => {
        toast.success("Check Your Email ");
      });
      is_auth.value = true;
      is_loading.value = false;
    } else {
      is_error.value = true;
      is_loading.value = false;
      is_waiting.value = false;
      toast.error("data is Not Correct. .... ");
      throw response.status;
    }
  }

  // reset_password
  async function PasswordReset(data) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/auth/reset-password",
      method: "POST",
      data,
    });

    if (response.ok) {
      is_auth.value = true;
      response.json().then(async (data: { access_token: string }) => {
        toast.success("Successfully   ... ");
      });
      is_auth.value = true;
      is_loading.value = false;
    } else {
      is_error.value = true;
      is_loading.value = false;
      is_waiting.value = false;
      toast.error("data is Not Correct. .... ");
      throw response.status;
    }
  }

  // logOut
  async function logOut() {
    const data = {
      login: JSON.parse(localStorage.getItem("user")).email,
    };
    console.log("data", data);
    const response = await callServer({
      url: "api/auth/logout",
      method: "POST",
      auth: true,
      data,
    });
    if (response.ok) {
      await localStorage.removeItem("access_token");
      await localStorage.removeItem("user");
      await toast.success("Successfully Logout ... ");
      await this.router.push("/login");
    } else {
      toast.error("data is Not Correct. .... ");
      throw response.status;
    }
  }

  // // registertionResetFun
  // async function registertionResetFun() {
  //   console.log("registertion.value.phone", registertion.value);
  // }
  return {
    // properites
    is_loading,
    is_auth,
    is_waiting,
    resetPassword,
    verifyRegister,
    registertion,
    user,
    loginSocialMedia,
    registerSocialMedia,

    // auth functions
    register,
    login,
    logOut,
    forgetPassword,
    PasswordReset,
    Verify,
  };
});
