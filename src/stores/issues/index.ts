import callServer from "@/assets/scripts/callServer/callServer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../auth/index";
const toast = useToast();
export const Useissues = defineStore("issues", () => {
  // is_waiting
  const is_waiting = ref<Boolean>(false);
  const is_loading = ref<Boolean>(false);

  //Get new_username
  async function make_issues(data) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/issues/upload",
      method: "POST",
      type: "",
      auth: true,
      data,
    });
    if (response.ok) {
      toast.success("Successfully Change Name Profile... ");
      is_loading.value = false;
      is_waiting.value = false;
      this.router.push("/history");
    } else {
      await response.json().then((data) => {
        toast.error(data.message);
      });
      is_loading.value = false;
      is_waiting.value = false;
    }
  }
  //Get change_password
  async function get_change_password(data) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/profile/change-password",
      method: "POST",
      auth: true,
      data,
    });
    if (response.ok) {
      console.log(JSON.parse(data));
      const Usernew = JSON.parse(localStorage.getItem("user"));
      toast.success("Successfully Change Password... ");
      is_loading.value = false;
      is_waiting.value = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.router.push("/login");
    } else {
      await response.json().then((data) => {
        toast.error(data.message);
      });
      is_loading.value = false;
      is_waiting.value = false;
    }
  }
  return {
    make_issues,
    is_loading,
    is_waiting,
  };
});
