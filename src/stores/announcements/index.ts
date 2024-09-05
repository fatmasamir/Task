import callServer from "@/assets/scripts/callServer/callServer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../auth/index";
const toast = useToast();
export const Useannouncements = defineStore("announcements", () => {
  const announcements = ref([]);
  // is_waiting
  const is_waiting = ref<Boolean>(false);
  const is_loading = ref<Boolean>(false);

  //Get new_username
  async function get_announcements() {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/announcements",
      auth: true,
    });
    if (response.ok) {
      await response.json().then(async (data: { token: string }) => {
        announcements.value = data.data.announcements;
        console.log("Useissues=", announcements.value);
      });
    } else {
      await response.json().then((data) => {
        toast.error(data.errors);
      });
      is_loading.value = false;
      is_waiting.value = false;
    }
  }
  return {
    announcements,
    get_announcements,
    is_loading,
  };
});
