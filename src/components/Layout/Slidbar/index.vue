<template>
  <v-navigation-drawer
    class="bg-deep-purple"
    :clipped="clipped"
    theme="dark"
    permanent
  >
    <v-list color="transparent">
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        :title="t('Homepage')"
        link
        exact
        @click="$router.push({ path: '/' })"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-box"
        :title="t('Products')"
        link
        @click="$router.push({ path: '/products' })"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main style="height: 400px"></v-main>
</template>
<script setup>
import { useI18n } from "vue-i18n";
// i18n
const { t } = useI18n();
</script>
<style scoped>
.v-btn.v-btn--density-default {
  width: 100%;
}
</style>
