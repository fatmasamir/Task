<script setup>
import Announcement from "@/components/pages/Announcement/index.vue";
import Slidebar from "@/components/global/Slidebar/index.vue";
import { Useannouncements } from "@/stores/announcements/index";
import { onMounted } from "vue";
let announcements = Useannouncements();

onMounted(() => {
  announcements.get_announcements();
});
</script>
<template>
  <div class="Pages">
    <div class="row p-0 m-0">
      <div class="col-md-2 col-0 p-0 m-0"><Slidebar /></div>
      <div class="col-md-10 col-12">
        <h2 class="logo-mobile">Logo</h2>
        <Announcement
          v-if="announcements.announcements"
          :announcements="announcements.announcements"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.body {
  background: #f0f0f0 !important;
}
</style>
