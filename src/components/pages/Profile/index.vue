<script setup lang="ts">
import { useI18n } from "vue-i18n";
import EditPassword from "./EditPassword.vue";
import Editprofile from "./Editprofile.vue";
// i18n
const { t } = useI18n();
</script>
<template>
  <div class="Profile">
    <Editprofile />
    <EditPassword />
  </div>
</template>
