<template>
  <v-menu open-on-hover block>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-icon icon="mdi-translate" />
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title @click="changeLang('ar')"> عربى</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title @click="changeLang('en')">
          English</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { useLang } from "@/stores/lang";
import { ref } from "vue";
// Language
const Language = useLang();
const i18n = useI18n();
// handel lang
let lang = ref(
  localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
);
i18n.locale.value = localStorage.getItem("lang")
  ? localStorage.getItem("lang")
  : "ar";
let changeLang = (lang_targe) => {
  localStorage.setItem("lang", lang_targe);
  i18n.locale.value = lang_targe;
  lang.value = lang_targe;
  Language.changeLayout();
};
</script>
<style scoped lang="scss">
.v-btn.v-btn--density-default {
  margin-left: auto;
  display: block;
}
.is-ar {
  .v-btn.v-btn--density-default {
    margin-left: 0px;
    margin-right: auto;
  }
}
.v-list-item {
  cursor: pointer;
}
</style>
