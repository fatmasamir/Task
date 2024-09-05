import callServer from "@/assets/scripts/callServer/callServer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../auth/index";
const toast = useToast();
export const UseProfile = defineStore("Profile", () => {
  const Profile = ref([]);
  const authStore = useAuthStore();
  // is_waiting
  const is_loading = ref<Boolean>(false);
  const is_loading_change_password = ref<Boolean>(false);

  //set new_username
  async function set_new_username(data) {
    is_loading.value = true;
    const response = await callServer({
      url: "api/profile/change-username",
      method: "POST",
      auth: true,
      data,
    });
    if (response.ok) {
      console.log(JSON.parse(data));
      const Usernew = JSON.parse(localStorage.getItem("user"));
      Usernew.name = JSON.parse(data).new_username;
      console.log("User =", Usernew);
      localStorage.setItem("user", JSON.stringify(Usernew));
      toast.success("Successfully Change Name Profile... ");
      is_loading.value = false;
    } else {
      await response.json().then((data) => {
        toast.error(data.message);
      });
      is_loading.value = false;
    }
  }
  //set change_password
  async function set_change_password(data) {
    is_loading_change_password.value = true;
    const response = await callServer({
      url: "api/profile/change-password",
      method: "POST",
      auth: true,
      data,
    });
    if (response.ok) {
      await toast.success("Successfully Change Password... ");
      is_loading_change_password.value = false;
      await authStore.logOut();
      this.router.push("/login");
    } else {
      await response.json().then((data) => {
        console.log(data.errors.error[0]);
        toast.error(data.errors.error[0]);
      });
      is_loading_change_password.value = false;
    }
  }
  return {
    set_new_username,
    set_change_password,
    is_loading,
    is_loading_change_password,
  };
});
