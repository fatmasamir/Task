<script setup>
import Layout from "@/components/Layout/index.vue";
import { onMounted } from "vue";
import { useLang } from "@/stores/lang";

//Language
const Language = useLang();
onMounted(() => {
  //onMounted
  Language.changeLayout();
});
</script>
<template><Layout /></template>
