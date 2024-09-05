import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

//Hompage
import HomePage from "../views/Homepage/Main.vue";

//Profile
import Profile from "../views/profile/Main.vue";

//Createaccount
import Createaccount from "../views/Createaccount/Main.vue";

//Login
import Login from "../views/Login/Main.vue";

//Forgetpassword
import Forgetpassword from "../views/Forgetpassword/Main.vue";

//Resetpassword
import Resetpassword from "../views/Resetpassword/Main.vue";

//OTPverification
import OTPverification from "../views/OTPverification/Main.vue";

//ForgetPasswordOtp
import ForgetPasswordOtp from "../views/ForgetPasswordOtp/Main.vue";

//History
import History from "../views/History/Main.vue";

//Announcement
import Announcement from "../views/Announcement/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` مشكلة في التحميل
         - Graduation`;
      } else {
        document.title = "Upload problem page - Graduation";
      }
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` - Graduation`;
      } else {
        document.title = "Profile - Graduation";
      }
    },
  },
  {
    path: "/history",
    name: "History",
    component: History,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` - Graduation`;
      } else {
        document.title = "History - Graduation";
      }
    },
  },
  {
    path: "/announcement",
    name: "Announcement",
    component: Announcement,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` - Graduation`;
      } else {
        document.title = "Announcement - Graduation";
      }
    },
  },
  {
    path: "/create-account",
    name: "Createaccount",
    component: Createaccount,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` لعمل حساب - Graduation`;
      } else {
        document.title = "Create account page - Graduation";
      }
    },
  },
  {
    path: "/otp-verification",
    name: "OTPverification",
    component: OTPverification,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = `التحقق من OTP - Graduation`;
      } else {
        document.title = "OTP verification page - Graduation";
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` تسجيل الدخول - Graduation`;
      } else {
        document.title = "Login page - Graduation";
      }
    },
  },
  {
    path: "/forget-password",
    name: "Forgetpassword",
    component: Forgetpassword,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` نسيت كلمة المرور - Graduation`;
      } else {
        document.title = "Forget password page - Graduation";
      }
    },
  },
  {
    path: "/reset-password",
    name: "Resetpassword",
    component: Resetpassword,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = `إعادة تعيين كلمة المرور - Graduation`;
      } else {
        document.title = "Reset password page - Graduation";
      }
    },
  },
  {
    path: "/forget-password-otp",
    name: "ForgetPasswordOtp",
    component: ForgetPasswordOtp,
    beforeEnter(to, from) {
      if (localStorage.getItem("lang") == "ar") {
        document.title = ` نسيت كلمة المرور - Graduation`;
      } else {
        document.title = "Forget Password Otp page - Graduation";
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { left: 0, top: 0 };
    }
  },
});

export default router;
