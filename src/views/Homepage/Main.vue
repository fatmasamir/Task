<template>
  <h1 class="mt-5 px-5">{{ t("Homepage") }}</h1>
</template>

<script setup>
import Table from "@/components/pages/Products/Table.vue";
import { UseProducts } from "@/stores/Products/index.ts";
import DialogDelete from "@/components/global/Dialog/index.vue";
import ProductActions from "@/components/pages/Products/ProductActions.vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
// i18n
const { t } = useI18n();
</script>
